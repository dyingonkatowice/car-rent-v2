import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import RentModal from "@/components/RentModal";
import { Car } from "@/data";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface CarouselProps {
  cars: Car[];
  onCarSelect: (car: Car) => void;
}

const Carousel = ({ cars, onCarSelect }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showRentModal, setShowRentModal] = useState(false);
  const [] = useState(false);
  const [selectedCar] = useState<Car | null>(null);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? 5 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 5 ? 0 : prevIndex + 1));
  };

  // only show 3 cars

  //Cars in carousell displayed based of if recommended or not

  const displayedCars = cars.filter((e) => e.specs.recomended === true);

  return (
    <>
      <div className="relative w-full overflow-hidden rounded-lg border border-border shadow-lg">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {displayedCars.map((car) => (
            <div
              key={car.id}
              className="w-full flex-shrink-0 cursor-pointer"
              onClick={() => onCarSelect(car)}
            >
              <div className="relative aspect-[16/9] md:aspect-[21/9]">
                <LazyLoadImage
                  src={car.imageUrl}
                  alt={car.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                  <h3 className="text-2xl md:text-3xl font-bold drop-shadow-lg">
                    {car.name}
                  </h3>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-lg opacity-90 drop-shadow-lg">
                      {car.specs.price}/day
                    </p>
                    <Button
                      className="bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onCarSelect(car);
                      }}
                    >
                      View Details
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
          className="absolute left-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/20 hover:bg-black/40 transition-colors"
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/20 hover:bg-black/40 transition-colors"
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {displayedCars.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
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
