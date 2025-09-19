import { useState, useEffect } from 'react';
import CarCard from '../components/CarCard';
import Carousel from '../components/Carousel';
import CarDetailsModal from '../components/CarDetailsModal';
import { Car, getCarsFromFirestore } from '../utils/firebase-admin';

const HomePage = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  useEffect(() => {
    const fetchCars = async () => {
      const fetchedCars = await getCarsFromFirestore();
      setCars(fetchedCars);
    };

    fetchCars();
  }, []);

  const handleOpenModal = (car: Car) => {
    setSelectedCar(car);
  };

  const handleCloseModal = () => {
    setSelectedCar(null);
  };

  return (
    <main className="max-w-7xl mx-auto px-6 py-8 space-y-12">
      {/* Carousel Section */}
      <section>
        <h2 className="text-3xl font-bold text-foreground mb-6">
          Most Rented Cars
        </h2>
        <Carousel cars={cars} onCarSelect={handleOpenModal} />
      </section>

      {/* All Cars Section */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Available Cars
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 focus:outline-1">
          {cars.map((car) => (
            <CarCard
              key={car.id}
              name={car.name}
              year={car.year}
              transmission={car.transmission}
              imageUrl={car.imageUrl}
              specs={car.specs}
              onSelect={() => handleOpenModal(car)}
            />
          ))}
        </div>
      </section>

      {/* Car Details Modal */}
      {selectedCar && (
        <CarDetailsModal
          car={selectedCar}
          isOpen={!!selectedCar}
          onClose={handleCloseModal}
        />
      )}
    </main>
  );
};

export default HomePage; 