import { useState, useMemo, useCallback } from 'react';
import { Search, ChevronUp, ChevronDown, X, Calendar, Cog } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { debounce } from 'lodash';

interface SearchBoxProps {
  cars: Array<{
    id: number;
    name: string;
    year: number;
    transmission: string;
    imageUrl: string;
    specs: {
      engine: string;
      power: string;
      acceleration: string;
      fuelType: string;
      seating: string;
      price: string;
      description: string;
    };
  }>;
  onCarSelect: (car: SearchBoxProps['cars'][0]) => void;
}

const SearchBox = ({ cars, onCarSelect }: SearchBoxProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [advancedSearchResults, setAdvancedSearchResults] = useState<SearchBoxProps['cars']>([]);

  // Advanced search states
  const [priceRange, setPriceRange] = useState([0, 3000]); // Max price from your data
  const [selectedTransmissions, setSelectedTransmissions] = useState<string[]>([]);
  const [selectedFuelTypes, setSelectedFuelTypes] = useState<string[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [minPower, setMinPower] = useState(0);
  const [maxAcceleration, setMaxAcceleration] = useState(10); // 0-60 time

  // Get unique values for filters
  const transmissions = Array.from(new Set(cars.map(car => car.transmission)));
  const fuelTypes = Array.from(new Set(cars.map(car => car.specs.fuelType)));
  const seatingOptions = Array.from(new Set(cars.map(car => car.specs.seating)));

  // Optimize edilmiş arama fonksiyonu
  const filteredCars = useMemo(() => {
    if (!searchQuery || searchQuery.length < 2) return [];
    
    const query = searchQuery.toLowerCase().trim();
    const results = cars.filter(car => {
      const carName = car.name.toLowerCase();
      return carName.includes(query);
    });

    return results.slice(0, 5);
  }, [searchQuery, cars]);

  // Debounce edilmiş arama input işleyicisi
  const debouncedSetSearchQuery = useCallback(
    debounce((value: string) => {
      setSearchQuery(value);
    }, 300),
    []
  );

  const handleAdvancedSearch = () => {
    let filtered = [...cars];

    // Price filter
    filtered = filtered.filter(car => {
      const price = parseInt(car.specs.price.replace(/\D/g, ''));
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Transmission filter
    if (selectedTransmissions.length > 0) {
      filtered = filtered.filter(car => selectedTransmissions.includes(car.transmission));
    }

    // Fuel type filter
    if (selectedFuelTypes.length > 0) {
      filtered = filtered.filter(car => selectedFuelTypes.includes(car.specs.fuelType));
    }

    // Seating filter
    if (selectedSeats.length > 0) {
      filtered = filtered.filter(car => selectedSeats.includes(car.specs.seating));
    }

    // Power filter
    filtered = filtered.filter(car => {
      const power = parseInt(car.specs.power.replace(/\D/g, ''));
      return power >= minPower;
    });

    // Acceleration filter
    filtered = filtered.filter(car => {
      const acceleration = parseFloat(car.specs.acceleration.match(/\d+\.\d+/)?.[0] || '0');
      return acceleration <= maxAcceleration;
    });

    // Sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'price':
          comparison = parseInt(a.specs.price.replace(/\D/g, '')) - parseInt(b.specs.price.replace(/\D/g, ''));
          break;
        case 'power':
          comparison = parseInt(a.specs.power.replace(/\D/g, '')) - parseInt(b.specs.power.replace(/\D/g, ''));
          break;
        case 'acceleration':
          const aAcc = parseFloat(a.specs.acceleration.match(/\d+\.\d+/)?.[0] || '0');
          const bAcc = parseFloat(b.specs.acceleration.match(/\d+\.\d+/)?.[0] || '0');
          comparison = aAcc - bAcc;
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    setAdvancedSearchResults(filtered);
    setShowSearchResults(true);
  };

  return (
    <div className="relative w-full">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search for cars..."
            defaultValue={searchQuery}
            onChange={(e) => {
              debouncedSetSearchQuery(e.target.value);
              setIsDropdownOpen(true);
            }}
            onFocus={() => {
              setIsDropdownOpen(true);
              setShowAdvanced(false);
            }}
            onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
            className="w-full h-10 px-4 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {isDropdownOpen && searchQuery && (
            <div 
              className="absolute top-full left-0 right-0 mt-1 max-h-[400px] overflow-auto rounded-lg border border-border bg-background shadow-lg z-50"
              onMouseDown={(e) => e.preventDefault()}
            >
              {filteredCars.length > 0 ? (
                filteredCars.map(car => (
                  <div
                    key={car.id}
                    className="p-3 hover:bg-accent cursor-pointer border-b border-border last:border-0"
                    onClick={() => {
                      onCarSelect(car);
                      setSearchQuery('');
                      setIsDropdownOpen(false);
                    }}
                  >
                    <div className="font-medium">{car.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {car.year} · {car.transmission} · {car.specs.engine} · {car.specs.power} · {car.specs.price}/day
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-3 text-muted-foreground">No cars found</div>
              )}
            </div>
          )}
        </div>
        <button 
          className="h-10 px-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
          onClick={() => setShowAdvanced(!showAdvanced)}
        >
          <Search className="h-4 w-4" />
          Advanced Search
          {showAdvanced ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
      </div>

      {/* Advanced Search Panel */}
      {showAdvanced && (
        <div className="absolute top-full left-0 right-0 mt-2 p-6 rounded-lg border border-border bg-card shadow-lg z-50">
          <div className="space-y-6">
            {/* Price Range */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Price Range (PLN/day)</label>
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                min={0}
                max={3000}
                step={50}
                className="w-full"
              />
              <div className="flex justify-between text-sm">
                <span>PLN {priceRange[0]}</span>
                <span>PLN {priceRange[1]}</span>
              </div>
            </div>

            {/* Power and Acceleration */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Minimum Power (HP)</label>
                <Slider
                  value={[minPower]}
                  onValueChange={([value]) => setMinPower(value)}
                  min={0}
                  max={1500}
                  step={50}
                  className="w-full"
                />
                <span className="text-sm">{minPower} HP</span>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Max 0-60 Time (seconds)</label>
                <Slider
                  value={[maxAcceleration]}
                  onValueChange={([value]) => setMaxAcceleration(value)}
                  min={2}
                  max={10}
                  step={0.1}
                  className="w-full"
                />
                <span className="text-sm">{maxAcceleration}s</span>
              </div>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-3 gap-4">
              {/* Transmission */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Transmission</label>
                <div className="space-y-2">
                  {transmissions.map(transmission => (
                    <div key={transmission} className="flex items-center">
                      <Checkbox
                        checked={selectedTransmissions.includes(transmission)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedTransmissions([...selectedTransmissions, transmission]);
                          } else {
                            setSelectedTransmissions(selectedTransmissions.filter(t => t !== transmission));
                          }
                        }}
                      />
                      <label className="ml-2 text-sm">{transmission}</label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fuel Type */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Fuel Type</label>
                <div className="space-y-2">
                  {fuelTypes.map(fuelType => (
                    <div key={fuelType} className="flex items-center">
                      <Checkbox
                        checked={selectedFuelTypes.includes(fuelType)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedFuelTypes([...selectedFuelTypes, fuelType]);
                          } else {
                            setSelectedFuelTypes(selectedFuelTypes.filter(f => f !== fuelType));
                          }
                        }}
                      />
                      <label className="ml-2 text-sm">{fuelType}</label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Seating */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Seating</label>
                <div className="space-y-2">
                  {seatingOptions.map(seating => (
                    <div key={seating} className="flex items-center">
                      <Checkbox
                        checked={selectedSeats.includes(seating)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedSeats([...selectedSeats, seating]);
                          } else {
                            setSelectedSeats(selectedSeats.filter(s => s !== seating));
                          }
                        }}
                      />
                      <label className="ml-2 text-sm">{seating} seats</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sorting */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Sort By</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="price">Price</SelectItem>
                    <SelectItem value="power">Power</SelectItem>
                    <SelectItem value="acceleration">Acceleration</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Order</label>
                <Select value={sortOrder} onValueChange={(value: 'asc' | 'desc') => setSortOrder(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asc">Ascending</SelectItem>
                    <SelectItem value="desc">Descending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-2 pt-4 border-t">
              <button
                className="px-4 py-2 text-sm rounded-md border border-input hover:bg-accent"
                onClick={() => {
                  setShowAdvanced(false);
                  setSearchQuery('');
                  setShowSearchResults(false);
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 flex items-center gap-2"
                onClick={handleAdvancedSearch}
              >
                <Search className="h-4 w-4" />
                Search
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Advanced Search Results Modal */}
      {showSearchResults && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="bg-card rounded-lg p-6 w-full max-w-6xl h-[90vh] overflow-y-auto relative border border-border">
            <button
              onClick={() => setShowSearchResults(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 transition-colors"
            >
              <X className="h-6 w-6 text-white" />
            </button>
            
            <h2 className="text-xl font-semibold mb-6">Search Results ({advancedSearchResults.length} cars found)</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {advancedSearchResults.map((car) => (
                <div
                  key={car.id}
                  className="bg-muted rounded-lg overflow-hidden cursor-pointer hover:bg-accent transition-colors"
                  onClick={() => {
                    onCarSelect(car);
                    setShowSearchResults(false);
                  }}
                >
                  <div className="aspect-[16/9] relative">
                    <img
                      src={car.imageUrl}
                      alt={car.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-lg font-semibold text-white">{car.name}</h3>
                      <p className="text-sm text-white/80">
                        {car.year} - {car.transmission}
                      </p>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{car.year}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Cog className="h-4 w-4" />
                        <span>{car.transmission}</span>
                      </div>
                    </div>
                    <p className="text-primary font-medium">
                      {car.specs.price}/day
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBox;