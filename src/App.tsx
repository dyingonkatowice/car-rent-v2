import Header from './components/Header';
import CarCard from './components/CarCard';
import Carousel from './components/Carousel';
import { useState } from 'react';
import CarDetailsModal from './components/CarDetailsModal';

// Import all car images
import mercedesAmgGt from './assets/cars/mercedes-amg-gt.avif';
import bmwM4 from './assets/cars/bmw-m4.jpg';
import audiRs7 from './assets/cars/audi-rs7.webp';
import astonMartin from './assets/cars/aston-martin-vantage.webp';
import audiR8 from './assets/cars/audi-r8-v10.webp';
import bmwM8 from './assets/cars/bmw-m8.jpg';
import bugatti from './assets/cars/bugatti-chiron.jpg';
import ferrari from './assets/cars/ferrari-f8-tributo.jpeg';
import corvette from './assets/cars/chevrolet-corvette-c8.jpg';
import fordMustang from './assets/cars/ford-mustang-gt500.avif';
import jaguar from './assets/cars/jaguar-f-type-r.jpg';
import lamborghini from './assets/cars/lamborghini-huracan-evo.jpg';
import mazda from './assets/cars/mazda-mx5-miata.avif';
import mclaren from './assets/cars/mclaren-720s.webp';
import nissanGtr from './assets/cars/nissan-gt-r-nismo.jpg';
import porsche911 from './assets/cars/porsche-911.jpg';
import porscheTaycan from './assets/cars/porsche-taycan-turbo-s.jpg';
import subaru from './assets/cars/subaru-wrx-sti.jpg';
import toyota from './assets/cars/toyota-supra-gr.jpeg';
import volkswagenGolf from './assets/cars/volkswagen-golf-r.jpg';

// Car specifications type
interface CarSpec {
  engine: string;
  power: string;
  acceleration: string;
  fuelType: string;
  seating: string;
  price: string;
  description: string;
}

type CarSpecsType = {
  [key: string]: CarSpec;
};

// Car specifications data
const carSpecs: CarSpecsType = {
  'Mercedes AMG GT': {
    engine: '4.0L V8 Biturbo',
    power: '523 HP',
    acceleration: '0-60 mph in 3.7s',
    fuelType: 'Premium Gasoline',
    seating: '2',
    price: 'PLN 399',
    description: 'The Mercedes-AMG GT combines stunning design with breathtaking performance. Its handcrafted AMG engine delivers exceptional power and responsiveness.'
  },
  'BMW M4 Competition': {
    engine: '3.0L Twin-Turbo I6',
    power: '503 HP',
    acceleration: '0-60 mph in 3.4s',
    fuelType: 'Premium Gasoline',
    seating: '4',
    price: 'PLN 299',
    description: 'The BMW M4 Competition delivers track-ready performance with everyday usability. Its powerful engine and refined chassis make every drive exciting.'
  },
  'Audi RS7 Sportback': {
    engine: '4.0L Twin-Turbo V8',
    power: '591 HP',
    acceleration: '0-60 mph in 3.5s',
    fuelType: 'Premium Gasoline',
    seating: '5',
    price: 'PLN 349',
    description: 'The Audi RS7 combines luxury with supercar performance. Its sophisticated all-wheel drive system ensures maximum grip and stability.'
  },
  'Aston Martin Vantage': {
    engine: '4.0L Twin-Turbo V8',
    power: '503 HP',
    acceleration: '0-60 mph in 3.5s',
    fuelType: 'Premium Gasoline',
    seating: '2',
    price: 'PLN 599',
    description: 'The Aston Martin Vantage delivers pure sports car thrills with British luxury and style. Its aggressive design is matched by exceptional performance.'
  },
  'Audi R8 V10': {
    engine: '5.2L V10',
    power: '602 HP',
    acceleration: '0-60 mph in 3.1s',
    fuelType: 'Premium Gasoline',
    seating: '2',
    price: 'PLN 699',
    description: 'The Audi R8 V10 offers supercar performance with everyday usability. Its naturally aspirated V10 engine provides an unforgettable driving experience.'
  },
  'BMW M8': {
    engine: '4.4L Twin-Turbo V8',
    power: '617 HP',
    acceleration: '0-60 mph in 3.0s',
    fuelType: 'Premium Gasoline',
    seating: '4',
    price: 'PLN 499',
    description: 'The BMW M8 combines luxury grand touring with supercar performance. Its sophisticated all-wheel drive system ensures maximum traction.'
  },
  'Bugatti Chiron': {
    engine: '8.0L Quad-Turbo W16',
    power: '1479 HP',
    acceleration: '0-60 mph in 2.4s',
    fuelType: 'Premium Gasoline',
    seating: '2',
    price: 'PLN 2,999',
    description: 'The Bugatti Chiron represents the pinnacle of automotive engineering. Its incredible power and luxury make it a true hypercar.'
  },
  'Ferrari F8 Tributo': {
    engine: '3.9L Twin-Turbo V8',
    power: '710 HP',
    acceleration: '0-60 mph in 2.9s',
    fuelType: 'Premium Gasoline',
    seating: '2',
    price: 'PLN 1,299',
    description: 'The Ferrari F8 Tributo delivers pure Italian performance. Its twin-turbocharged engine and advanced aerodynamics create an exceptional driving experience.'
  },
  'Chevrolet Corvette C8': {
    engine: '6.2L V8',
    power: '495 HP',
    acceleration: '0-60 mph in 2.9s',
    fuelType: 'Premium Gasoline',
    seating: '2',
    price: 'PLN 299',
    description: 'The C8 Corvette represents a revolution in American performance. Its mid-engine design and powerful V8 deliver supercar performance.'
  },
  'Ford Mustang GT500': {
    engine: '5.2L Supercharged V8',
    power: '760 HP',
    acceleration: '0-60 mph in 3.3s',
    fuelType: 'Premium Gasoline',
    seating: '4',
    price: 'PLN 349',
    description: 'The Mustang Shelby GT500 is the most powerful street-legal Ford ever. Its supercharged engine delivers incredible performance.'
  },
  'Jaguar F-Type R': {
    engine: '5.0L Supercharged V8',
    power: '575 HP',
    acceleration: '0-60 mph in 3.5s',
    fuelType: 'Premium Gasoline',
    seating: '2',
    price: 'PLN 399',
    description: 'The Jaguar F-Type R combines British elegance with raw power. Its supercharged V8 produces an intoxicating soundtrack.'
  },
  'Lamborghini Huracán EVO': {
    engine: '5.2L V10',
    power: '631 HP',
    acceleration: '0-60 mph in 2.9s',
    fuelType: 'Premium Gasoline',
    seating: '2',
    price: 'PLN 1,499',
    description: "The Huracán EVO represents Lamborghini's pursuit of perfection. Its naturally aspirated V10 and advanced aerodynamics deliver incredible performance."
  },
  'Mazda MX-5 Miata': {
    engine: '2.0L I4',
    power: '181 HP',
    acceleration: '0-60 mph in 5.7s',
    fuelType: 'Premium Gasoline',
    seating: '2',
    price: 'PLN 149',
    description: 'The Mazda MX-5 Miata offers pure driving pleasure. Its lightweight design and perfect balance make it a joy to drive.'
  },
  'McLaren 720S': {
    engine: '4.0L Twin-Turbo V8',
    power: '710 HP',
    acceleration: '0-60 mph in 2.8s',
    fuelType: 'Premium Gasoline',
    seating: '2',
    price: 'PLN 1,599',
    description: 'The McLaren 720S delivers otherworldly performance. Its innovative design and powerful engine create a true supercar experience.'
  },
  'Nissan GT-R NISMO': {
    engine: '3.8L Twin-Turbo V6',
    power: '600 HP',
    acceleration: '0-60 mph in 2.9s',
    fuelType: 'Premium Gasoline',
    seating: '4',
    price: 'PLN 499',
    description: 'The GT-R NISMO represents the pinnacle of Japanese performance. Its advanced technology and powerful engine deliver incredible capabilities.'
  },
  'Porsche 911': {
    engine: '3.0L Twin-Turbo Flat-6',
    power: '443 HP',
    acceleration: '0-60 mph in 3.5s',
    fuelType: 'Premium Gasoline',
    seating: '4',
    price: 'PLN 399',
    description: 'The Porsche 911 is the definition of sports car excellence. Its rear-engine design and precise handling create an unmatched driving experience.'
  },
  'Porsche Taycan Turbo S': {
    engine: 'Dual Electric Motors',
    power: '750 HP',
    acceleration: '0-60 mph in 2.6s',
    fuelType: 'Electric',
    seating: '4',
    price: 'PLN 599',
    description: 'The Taycan Turbo S represents the future of performance. Its electric powertrain delivers instant acceleration and zero emissions.'
  },
  'Subaru WRX STI': {
    engine: '2.5L Turbo Flat-4',
    power: '310 HP',
    acceleration: '0-60 mph in 4.9s',
    fuelType: 'Premium Gasoline',
    seating: '5',
    price: 'PLN 199',
    description: 'The WRX STI delivers rally-bred performance. Its symmetrical all-wheel drive and turbocharged engine provide exceptional capability.'
  },
  'Toyota Supra GR': {
    engine: '3.0L Twin-Turbo I6',
    power: '382 HP',
    acceleration: '0-60 mph in 3.9s',
    fuelType: 'Premium Gasoline',
    seating: '2',
    price: 'PLN 249',
    description: 'The GR Supra continues a legendary legacy. Its powerful engine and balanced chassis deliver pure sports car thrills.'
  },
  'Volkswagen Golf R': {
    engine: '2.0L Turbo I4',
    power: '315 HP',
    acceleration: '0-60 mph in 4.7s',
    fuelType: 'Premium Gasoline',
    seating: '5',
    price: 'PLN 179',
    description: 'The Golf R combines everyday practicality with serious performance. Its turbocharged engine and all-wheel drive system provide year-round excitement.'
  }
};

// Featured cars for carousel
const featuredCars = [
  {
    id: 1,
    name: 'Mercedes AMG GT',
    imageUrl: mercedesAmgGt,
    specs: carSpecs['Mercedes AMG GT']
  },
  {
    id: 2,
    name: 'BMW M4 Competition',
    imageUrl: bmwM4,
    specs: carSpecs['BMW M4 Competition']
  },
  {
    id: 3,
    name: 'Audi RS7 Sportback',
    imageUrl: audiRs7,
    specs: carSpecs['Audi RS7 Sportback']
  }
];

// All cars for search and recommended sections
const allCars = [
  {
    id: 1,
    name: 'Mercedes AMG GT',
    year: 2023,
    transmission: 'Automatic',
    imageUrl: mercedesAmgGt,
    specs: carSpecs['Mercedes AMG GT']
  },
  {
    id: 2,
    name: 'BMW M4 Competition',
    year: 2023,
    transmission: 'Manual',
    imageUrl: bmwM4,
    specs: carSpecs['BMW M4 Competition']
  },
  {
    id: 3,
    name: 'Audi RS7 Sportback',
    year: 2023,
    transmission: 'Automatic',
    imageUrl: audiRs7,
    specs: carSpecs['Audi RS7 Sportback']
  },
  {
    id: 4,
    name: 'Aston Martin Vantage',
    year: 2023,
    transmission: 'Automatic',
    imageUrl: astonMartin,
    specs: carSpecs['Aston Martin Vantage']
  },
  {
    id: 5,
    name: 'Audi R8 V10',
    year: 2023,
    transmission: 'Automatic',
    imageUrl: audiR8,
    specs: carSpecs['Audi R8 V10']
  },
  {
    id: 6,
    name: 'BMW M8',
    year: 2023,
    transmission: 'Automatic',
    imageUrl: bmwM8,
    specs: carSpecs['BMW M8']
  },
  {
    id: 7,
    name: 'Bugatti Chiron',
    year: 2022,
    transmission: 'Automatic',
    imageUrl: bugatti,
    specs: carSpecs['Bugatti Chiron']
  },
  {
    id: 8,
    name: 'Ferrari F8 Tributo',
    year: 2023,
    transmission: 'Automatic',
    imageUrl: ferrari,
    specs: carSpecs['Ferrari F8 Tributo']
  },
  {
    id: 9,
    name: 'Chevrolet Corvette C8',
    year: 2023,
    transmission: 'Automatic',
    imageUrl: corvette,
    specs: carSpecs['Chevrolet Corvette C8']
  },
  {
    id: 10,
    name: 'Ford Mustang GT500',
    year: 2023,
    transmission: 'Manual',
    imageUrl: fordMustang,
    specs: carSpecs['Ford Mustang GT500']
  },
  {
    id: 11,
    name: 'Jaguar F-Type R',
    year: 2023,
    transmission: 'Automatic',
    imageUrl: jaguar,
    specs: carSpecs['Jaguar F-Type R']
  },
  {
    id: 12,
    name: 'Lamborghini Huracán EVO',
    year: 2023,
    transmission: 'Automatic',
    imageUrl: lamborghini,
    specs: carSpecs['Lamborghini Huracán EVO']
  },
  {
    id: 13,
    name: 'Mazda MX-5 Miata',
    year: 2023,
    transmission: 'Manual',
    imageUrl: mazda,
    specs: carSpecs['Mazda MX-5 Miata']
  },
  {
    id: 14,
    name: 'McLaren 720S',
    year: 2023,
    transmission: 'Automatic',
    imageUrl: mclaren,
    specs: carSpecs['McLaren 720S']
  },
  {
    id: 15,
    name: 'Nissan GT-R NISMO',
    year: 2023,
    transmission: 'Automatic',
    imageUrl: nissanGtr,
    specs: carSpecs['Nissan GT-R NISMO']
  },
  {
    id: 16,
    name: 'Porsche 911',
    year: 2023,
    transmission: 'Automatic',
    imageUrl: porsche911,
    specs: carSpecs['Porsche 911']
  },
  {
    id: 17,
    name: 'Porsche Taycan Turbo S',
    year: 2023,
    transmission: 'Automatic',
    imageUrl: porscheTaycan,
    specs: carSpecs['Porsche Taycan Turbo S']
  },
  {
    id: 18,
    name: 'Subaru WRX STI',
    year: 2023,
    transmission: 'Manual',
    imageUrl: subaru,
    specs: carSpecs['Subaru WRX STI']
  },
  {
    id: 19,
    name: 'Toyota Supra GR',
    year: 2023,
    transmission: 'Automatic',
    imageUrl: toyota,
    specs: carSpecs['Toyota Supra GR']
  },
  {
    id: 20,
    name: 'Volkswagen Golf R',
    year: 2023,
    transmission: 'Manual',
    imageUrl: volkswagenGolf,
    specs: carSpecs['Volkswagen Golf R']
  }
];

// Combine featured cars with all cars for search functionality 
const searchableCars = [
  ...featuredCars.map(car => ({
    ...car,
    year: 2024,
    transmission: 'automatic'
  })),
  ...allCars
];

function App() {
  const [selectedCar, setSelectedCar] = useState<(typeof allCars)[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (car: (typeof allCars)[0]) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header allCars={searchableCars} onCarSelect={handleOpenModal} />
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-12">
        {/* Carousel Section */}
        <section>
          <h2 className="text-3xl font-bold text-foreground mb-6">Most Rented Cars</h2>
          <Carousel cars={searchableCars} onCarSelect={handleOpenModal} />
        </section>

        {/* Recommended Cars Section */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Recommended Cars</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 focus:outline-1">
            {allCars.map((car) => (
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
      </main>

      {/* Car Details Modal */}
      {selectedCar && (
        <CarDetailsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          car={selectedCar}
        />
      )}
      </div>
  );
}

export default App;
