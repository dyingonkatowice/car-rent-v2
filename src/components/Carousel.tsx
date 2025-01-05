import { useState } from 'react';
import { ChevronLeft, ChevronRight, Info, Car } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import RentModal from "@/components/RentModal";

interface CarouselProps {
  cars: Array<{
    id: number;
    name: string;
    imageUrl: string;
    year: number;
    transmission: string;
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
  onCarSelect: (car: CarouselProps['cars'][0]) => void;
}

const Carousel = ({ cars, onCarSelect }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showRentModal, setShowRentModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState<CarouselProps['cars'][0] | null>(null);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? cars.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === cars.length - 1 ? 0 : prevIndex + 1));
  };

  const handleRentClick = (car: CarouselProps['cars'][0]) => {
    setSelectedCar(car);
    setShowRentModal(true);
  };

  return (
    <>
      <div className="relative w-full overflow-hidden rounded-xl">
        <div className="relative h-[600px]">
          <div
            className={cn(
              "flex transition-transform duration-500 ease-out h-full",
              isAnimating ? "pointer-events-none" : ""
            )}
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {cars.map((car) => (
              <div
                key={car.id}
                className="relative w-full flex-shrink-0 cursor-pointer h-full group"
                onClick={() => onCarSelect(car)}
              >
                <img
                  src={car.imageUrl}
                  alt={car.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* Car Info and Buttons */}
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <div className="flex justify-between items-end">
                    <h3 className="text-3xl font-bold">{car.name}</h3>
                    <div className="flex gap-3">
                      <Button 
                        variant="outline" 
                        className="bg-black hover:bg-zinc-800 text-white hover:text-white border-white text-sm px-4 py-2 h-auto transition-all"
                        onClick={(e) => {
                          e.stopPropagation();
                          onCarSelect(car);
                        }}
                      >
                        <Info className="h-4 w-4 mr-2" />
                        More Details
                      </Button>
                      <Button 
                        className="bg-primary hover:bg-primary/90 text-sm px-4 py-2 h-auto transition-all"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRentClick(car);
                        }}
                      >
                        <Car className="h-4 w-4 mr-2" />
                        Rent Now
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={handlePrevious}
            className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/20 hover:bg-black/40 transition-colors text-white"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/20 hover:bg-black/40 transition-colors text-white"
          >
            <ChevronRight className="h-8 w-8" />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {cars.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "w-2.5 h-2.5 rounded-full transition-colors",
                  currentIndex === index
                    ? "bg-white"
                    : "bg-white/50 hover:bg-white/75"
                )}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Rent Modal */}
      {selectedCar && (
        <RentModal
          isOpen={showRentModal}
          onClose={() => setShowRentModal(false)}
          carName={selectedCar.name}
        />
      )}
    </>
  );
};

export default Carousel; 