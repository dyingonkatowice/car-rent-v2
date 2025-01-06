import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Fuel, Gauge, Power, Users, DollarSign, Cog } from "lucide-react";
import RentModal from "@/components/RentModal";
import { Car } from '@/data';

interface CarDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  car: Car;
}

const CarDetailsModal = ({ isOpen, onClose, car }: CarDetailsModalProps) => {
  const [showRentModal, setShowRentModal] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="w-full h-[100dvh] md:h-auto md:max-w-[600px] p-0 overflow-y-auto">
        <div className="relative h-[200px] md:h-[300px] w-full">
          <img
            src={car.imageUrl}
            alt={car.name}
            className="w-full h-full object-cover"
          />
          <DialogHeader className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <DialogTitle className="text-3xl font-bold">{car.name}</DialogTitle>
            <p className="text-lg opacity-90">{car.year} · {car.transmission}</p>
          </DialogHeader>
        </div>

        <div className="p-4 md:p-6 space-y-4 md:space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/50">
              <Cog className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Engine</p>
                <p className="font-medium">{car.specs.engine}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/50">
              <Power className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Power</p>
                <p className="font-medium">{car.specs.power}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/50">
              <Gauge className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">0-60 mph</p>
                <p className="font-medium">{car.specs.acceleration}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/50">
              <Fuel className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Fuel Type</p>
                <p className="font-medium">{car.specs.fuelType}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/50">
              <Users className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Seating</p>
                <p className="font-medium">{car.specs.seating}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/50">
              <DollarSign className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Price per day</p>
                <p className="font-medium">{car.specs.price}</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">About this car</h3>
            <p className="text-muted-foreground leading-relaxed">
              {car.specs.description}
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Key Features</h3>
            <ul className="grid grid-cols-2 gap-2 text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Premium Sound System
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Navigation System
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Leather Seats
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Parking Sensors
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Bluetooth
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Climate Control
              </li>
            </ul>
          </div>

          <div className="flex flex-col md:flex-row gap-3 pt-4 border-t mt-4">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="w-full md:w-auto"
            >
              Close
            </Button>
            <Button 
              onClick={() => setShowRentModal(true)}
              className="w-full md:w-auto gap-2"
            >
              Rent Now
            </Button>
          </div>
        </div>
      </DialogContent>

      <RentModal
        isOpen={showRentModal}
        onClose={() => setShowRentModal(false)}
        carName={car.name}
      />
    </Dialog>
  );
};

export default CarDetailsModal; 