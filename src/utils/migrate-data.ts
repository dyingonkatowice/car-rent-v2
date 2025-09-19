import { collection, doc, setDoc, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Car } from './firebase-admin';

// Car data to migrate
const carsToMigrate: Omit<Car, 'id'>[] = [
  {
    name: "Mercedes AMG GT",
    year: 2023,
    transmission: "Automatic",
    imageUrl: "/cars/mercedes-amg-gt.avif",
    category: "luxury",
    featured: true,
    specs: {
      engine: "4.0L V8 Biturbo",
      power: "523 HP",
      acceleration: "0-60 mph in 3.7s",
      fuelType: "Premium Gasoline",
      seating: "2",
      price: 399,
      description: "The Mercedes-AMG GT combines stunning design with breathtaking performance. Its handcrafted AMG engine delivers exceptional power and responsiveness."
    }
  },
  {
    name: "BMW M4 Competition",
    year: 2023,
    transmission: "Manual",
    imageUrl: "/cars/bmw-m4.jpg",
    category: "sports",
    featured: true,
    specs: {
      engine: "3.0L Twin-Turbo I6",
      power: "503 HP",
      acceleration: "0-60 mph in 3.4s",
      fuelType: "Premium Gasoline",
      seating: "4",
      price: 299,
      description: "The BMW M4 Competition delivers track-ready performance with everyday usability. Its powerful engine and refined chassis make every drive exciting."
    }
  },
  {
    name: "Audi RS7 Sportback",
    year: 2023,
    transmission: "Automatic",
    imageUrl: "/cars/audi-rs7.webp",
    category: "luxury",
    featured: false,
    specs: {
      engine: "4.0L Twin-Turbo V8",
      power: "591 HP",
      acceleration: "0-60 mph in 3.5s",
      fuelType: "Premium Gasoline",
      seating: "5",
      price: 349,
      description: "The Audi RS7 combines luxury with supercar performance. Its sophisticated all-wheel drive system ensures maximum grip and stability."
    }
  },
  {
    name: "Porsche 911",
    year: 2023,
    transmission: "Automatic",
    imageUrl: "/cars/porsche-911.jpg",
    category: "sports",
    featured: true,
    specs: {
      engine: "3.0L Twin-Turbo Flat-6",
      power: "443 HP",
      acceleration: "0-60 mph in 3.5s",
      fuelType: "Premium Gasoline",
      seating: "4",
      price: 399,
      description: "The Porsche 911 is the definition of sports car excellence. Its rear-engine design and precise handling create an unmatched driving experience."
    }
  },
  {
    name: "Lamborghini Huracán EVO",
    year: 2023,
    transmission: "Automatic",
    imageUrl: "/cars/lamborghini-huracan-evo.jpg",
    category: "supercar",
    featured: true,
    specs: {
      engine: "5.2L V10",
      power: "631 HP",
      acceleration: "0-60 mph in 2.9s",
      fuelType: "Premium Gasoline",
      seating: "2",
      price: 1499,
      description: "The Huracán EVO represents Lamborghini's pursuit of perfection. Its naturally aspirated V10 and advanced aerodynamics deliver incredible performance."
    }
  },
  {
    name: "Porsche 911 GT3",
    year: 2023,
    transmission: "Manual",
    imageUrl: "/cars/porsche-911-gt3.jpg",
    category: "sports",
    featured: true,
    specs: {
      engine: "4.0L Flat-6",
      power: "502 HP",
      acceleration: "3.2s 0-60 mph",
      fuelType: "Petrol",
      seating: "2",
      price: 399,
      description: "Track-focused sports car delivering pure driving excitement."
    }
  }
];

// Categories data
export const categories = [
  {
    id: "luxury",
    name: "Luxury",
    description: "Premium vehicles offering the highest level of comfort and sophistication"
  },
  {
    id: "sports",
    name: "Sports",
    description: "High-performance vehicles designed for speed and handling"
  },
  {
    id: "supercar",
    name: "Supercar",
    description: "Ultra-high-performance exotic vehicles"
  }
];

export const migrateCarsToFirestore = async () => {
  try {
    // Add categories first
    const categoriesCollection = collection(db, 'categories');
    for (const category of categories) {
      await setDoc(doc(categoriesCollection, category.id), category);
      console.log(`Added category: ${category.name}`);
    }

    // Add cars
    const carsCollection = collection(db, 'cars');
    for (const car of carsToMigrate) {
      await addDoc(carsCollection, {
        ...car,
        available: true
      });
      console.log(`Successfully added ${car.name} to Firestore`);
    }
    
    console.log('Migration completed successfully');
  } catch (error) {
    console.error('Error during migration:', error);
    throw error;
  }
}; 