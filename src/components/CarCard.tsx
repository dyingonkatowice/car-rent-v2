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

const CarCard = ({ name, year, transmission, imageUrl, specs }: CarCardProps) => {
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
        className="bg-card rounded-lg overflow-hidden border border-border hover:border-primary/20 cursor-pointer group"
        onClick={() => setIsDetailsModalOpen(true)}
      >
        <div className="relative h-48">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full">
            <span className="text-foreground font-semibold">{specs.price}/day</span>
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold text-card-foreground">{name}</h3>
          <p className="text-muted-foreground">{year} · {transmission}</p>

          <div className="grid grid-cols-2 gap-4 mt-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CarIcon className="h-4 w-4" />
              <span>{specs.engine}</span>
            </div>
            <div className="flex items-center gap-2">
              <Gauge className="h-4 w-4" />
              <span>{specs.power}</span>
            </div>
            <div className="flex items-center gap-2">
              <Fuel className="h-4 w-4" />
              <span>{specs.fuelType}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>{specs.seating} seats</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <Button
              onClick={handleRentClick}
              className="w-full"
            >
              Rent
            </Button>
            <Button
              onClick={handleDetailsClick}
              variant="secondary"
              className="w-full"
            >
              More Details
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