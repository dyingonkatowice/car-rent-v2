import { useState } from 'react';
import RentModal from './RentModal';
import CarDetailsModal from './CarDetailsModal';
import { Button } from './ui/button';
import { Car as CarIcon, Gauge, Fuel, Users } from 'lucide-react';

interface CarSpec {
  engine: string;
  power: string;
  acceleration: string;
  fuelType: string;
  seating: string;
  price: string;
  description: string;
}

interface CarCardProps {
  name: string;
  year: number;
  transmission: string;
  imageUrl: string;
  specs: CarSpec;
  onSelect: () => void;
}

const CarCard = ({ name, year, transmission, imageUrl, specs, onSelect }: CarCardProps) => {
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isRentModalOpen, setIsRentModalOpen] = useState(false);

  const handleDetailsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDetailsModalOpen(true);
  };

  const handleRentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsRentModalOpen(true);
  };

  return (
    <>
      <div 
        className="group relative bg-card rounded-lg border border-border shadow-sm hover:shadow-lg transition-all overflow-hidden cursor-pointer"
        onClick={() => onSelect()}
      >
        <div className="aspect-[16/9] overflow-hidden">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
        </div>

        <div className="p-4 space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-lg">{name}</h3>
              <p className="text-sm text-muted-foreground">{year} · {transmission}</p>
            </div>
            <p className="font-bold text-right">
              {specs.price}<span className="text-sm font-normal">/day</span>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-2">
              <Fuel className="h-4 w-4 text-primary" />
              <span>{specs.fuelType}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <span>{specs.seating} seats</span>
            </div>
          </div>

          <div className="flex gap-2 pt-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={(e) => {
                e.stopPropagation();
                onSelect();
              }}
            >
              Details
            </Button>
            <Button
              className="flex-1"
              onClick={(e) => {
                e.stopPropagation();
                onSelect();
              }}
            >
              Rent Now
            </Button>
          </div>
        </div>
      </div>

      <CarDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        car={{
          id: 0,
          name,
          year,
          transmission,
          imageUrl,
          specs
        }}
      />

      <RentModal
        isOpen={isRentModalOpen}
        onClose={() => setIsRentModalOpen(false)}
        carName={name}
      />
    </>
  );
};

export default CarCard; 