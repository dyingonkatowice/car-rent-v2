<<<<<<< Updated upstream
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Fuel, Gauge, Power, Users, DollarSign, Cog } from "lucide-react";
import RentModal from "@/components/RentModal";
import { Car } from "@/data";
import { LazyLoadImage } from "react-lazy-load-image-component";
=======
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Car } from "../utils/firebase-admin";
>>>>>>> Stashed changes

interface CarDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  car: Car;
}

const CarDetailsModal = ({ isOpen, onClose, car }: CarDetailsModalProps) => {
  return (
<<<<<<< Updated upstream
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="w-full h-[100dvh] md:h-auto md:max-w-[600px] p-0 overflow-y-auto">
        <div className="relative h-[200px] md:h-[300px] w-full">
          <LazyLoadImage
            src={car.imageUrl}
            alt={car.name}
            className="w-full h-full object-cover"
          />
          <DialogHeader className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <DialogTitle className="text-3xl font-bold">{car.name}</DialogTitle>
            <p className="text-lg opacity-90">
              {car.year} · {car.transmission}
            </p>
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
=======
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Car Image */}
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
            <img
              src={car.imageUrl}
              alt={car.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
>>>>>>> Stashed changes
          </div>

          {/* Car Details */}
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold">{car.name}</h2>
              <p className="text-muted-foreground">
                {car.year} · {car.transmission}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Engine</span>
                <span className="font-medium">{car.specs.engine}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Power</span>
                <span className="font-medium">{car.specs.power}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Acceleration</span>
                <span className="font-medium">{car.specs.acceleration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Fuel Type</span>
                <span className="font-medium">{car.specs.fuelType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Seating</span>
                <span className="font-medium">{car.specs.seating} seats</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Price per day</span>
                <span className="font-medium">{car.specs.price}</span>
              </div>
            </div>

<<<<<<< Updated upstream
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
=======
            <p className="text-muted-foreground">{car.specs.description}</p>
>>>>>>> Stashed changes
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CarDetailsModal;
