import { useState } from 'react';
import RentModal from './RentModal';
import CarDetailsModal from './CarDetailsModal';
import { Button } from './ui/button';
import { Car as Fuel, Users } from 'lucide-react';
import { Car } from '@/data';

interface CarCardProps {
  car: Car;
  onSelect: () => void;
}

const CarCard = ({ car, onSelect }: CarCardProps) => {
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isRentModalOpen, setIsRentModalOpen] = useState(false);

  return (
    <>
      <div 
        className="group relative bg-card rounded-lg border border-border shadow-sm hover:shadow-lg transition-all overflow-hidden cursor-pointer"
        onClick={() => onSelect()}
      >
        <div className="aspect-[16/9] overflow-hidden">
          <img
            src={car.imageUrl}
            alt={car.name}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
        </div>

        <div className="p-4 space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-lg">{car.name}</h3>
              <p className="text-sm text-muted-foreground">{car.year} · {car.transmission}</p>
            </div>
            <p className="font-bold text-right">
              {car.specs.price}<span className="text-sm font-normal">/day</span>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-2">
              <Fuel className="h-4 w-4 text-primary" />
              <span>{car.specs.fuelType}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <span>{car.specs.seating} seats</span>
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
                setIsRentModalOpen(true);
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
          name: car.name,
          year: car.year,
          transmission: car.transmission,
          imageUrl: car.imageUrl,
          specs: car.specs
        }}
      />

      <RentModal
        isOpen={isRentModalOpen}
        onClose={() => setIsRentModalOpen(false)}
        carName={car.name}
      />
    </>
  );
};

export default CarCard; 