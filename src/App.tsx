import { useState, useEffect } from 'react';
import Header from './components/Header';
import CarCard from './components/CarCard';
import Carousel from './components/Carousel';
import CarDetailsModal from './components/CarDetailsModal';
import { 
  Car, 
  allCars} from './data';

const App: React.FC = () => {
  const [, setCars] = useState<Car[]>([]);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);

  useEffect(() => {
    setCars(allCars);
    setFilteredCars(allCars);
  }, []);

  const handleOpenModal = (car: Car): void => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header allCars={filteredCars} onCarSelect={handleOpenModal} />
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-12">
        {/* Carousel Section */}
        <section>
          <h2 className="text-3xl font-bold text-foreground mb-6">Most Rented Cars</h2>
          <Carousel cars={filteredCars} onCarSelect={handleOpenModal} />
        </section>
        <h2 className="text-2xl font-bold text-foreground mb-6">Recommended Cars</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              onSelect={() => handleOpenModal(car)}
            />
          ))}
        </div>
      </main>

      {selectedCar && (
        <CarDetailsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          car={selectedCar}
        />
      )}
    </div>
  );
};

export default App;
