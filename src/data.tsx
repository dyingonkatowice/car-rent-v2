// Import car images
import volkswagenGolfR from "./assets/cars/volkswagen-golf-r.jpg";
import toyotaSupra from "./assets/cars/toyota-supra-gr.jpeg";
import subaruWrx from "./assets/cars/subaru-wrx-sti.jpg";
import porscheTaycan from "./assets/cars/porsche-taycan-turbo-s.jpg";
import porsche911 from "./assets/cars/porsche-911.jpg";
import mercedesAmgGt from "./assets/cars/mercedes-amg-gt.avif";
import nissanGtr from "./assets/cars/nissan-gt-r-nismo.jpg";
import mclaren720s from "./assets/cars/mclaren-720s.webp";
import mazdaMx5 from "./assets/cars/mazda-mx5-miata.avif";
import lamborghiniHuracan from "./assets/cars/lamborghini-huracan-evo.jpg";
import jaguarFType from "./assets/cars/jaguar-f-type-r.jpg";
import fordMustang from "./assets/cars/ford-mustang-gt500.avif";
import chevroletCorvette from "./assets/cars/chevrolet-corvette-c8.jpg";
import ferrariF8 from "./assets/cars/ferrari-f8-tributo.jpeg";
import bugattiChiron from "./assets/cars/bugatti-chiron.jpg";
import bmwM8 from "./assets/cars/bmw-m8.jpg";
import bmwM4 from "./assets/cars/bmw-m4.jpg";
import astonMartin from "./assets/cars/aston-martin-vantage.webp";
import audiR8 from "./assets/cars/audi-r8-v10.webp";
import audiRs7 from "./assets/cars/audi-rs7.webp";

export interface UserData {
  fullName: string;
  name: string;
  code: number;
  tries: number;
}

export const User: UserData = {
  fullName: "John Smith",
  name: "test",
  code: 1111,
  tries: 5,
};

// Types
export interface CarSpec {
  engine: string;
  power: number;
  acceleration: number;
  fuelType: string;
  seating: number;
  price: number;
  description: string;
  recomended: boolean;
}

export interface Car {
  id: number;
  name: string;
  imageUrl: string;
  year: number;

  transmission: string;
  specs: CarSpec;
}

export type SortType = "price" | "power" | "none";

// Data
export const allCars: Car[] = [
  {
    id: 1,
    name: "Bugatti Chiron",
    imageUrl: bugattiChiron,
    year: 2023,
    transmission: "Automatic",
    specs: {
      engine: "8.0L W16 Quad-Turbo",
      power: 1500,
      acceleration: 2.4,
      recomended: false,
      fuelType: "Premium Gasoline",
      seating: 2,
      price: 3500,
      description:
        "The Bugatti Chiron is the ultimate hypercar, combining unmatched performance with luxury...",
    },
  },
  {
    id: 2,
    name: "McLaren 720S",
    imageUrl: mclaren720s,
    year: 2023,
    transmission: "Automatic",
    specs: {
      engine: "4.0L V8 Twin-Turbo",
      power: 710,
      acceleration: 2.8,
      recomended: false,
      fuelType: "Premium Gasoline",
      seating: 2,
      price: 2500,
      description:
        "The McLaren 720S delivers breathtaking performance and cutting-edge technology...",
    },
  },
  {
    id: 3,
    name: "Ferrari F8 Tributo",
    imageUrl: ferrariF8,
    year: 2023,
    transmission: "Automatic",
    specs: {
      engine: "3.9L V8 Twin-Turbo",
      power: 710,
      acceleration: 2.9,
      recomended: true,
      fuelType: "Premium Gasoline",
      seating: 2,
      price: 2800,
      description:
        "The Ferrari F8 Tributo represents the highest expression of Ferrari's classic two-seater berlinetta...",
    },
  },
  {
    id: 4,
    name: "Lamborghini Huracan EVO",
    imageUrl: lamborghiniHuracan,
    year: 2023,
    transmission: "Automatic",
    specs: {
      engine: "5.2L V10",
      power: 640,
      acceleration: 2.9,
      recomended: false,
      fuelType: "Premium Gasoline",
      seating: 2,
      price: 2600,
      description:
        "The Lamborghini Huracan EVO is the evolution of the most successful V10-powered Lamborghini ever...",
    },
  },
  {
    id: 5,
    name: "Porsche Taycan Turbo S",
    imageUrl: porscheTaycan,
    year: 2023,
    transmission: "Automatic",
    specs: {
      engine: "Electric",
      power: 750,
      acceleration: 2.8,
      recomended: false,
      fuelType: "Electric",
      seating: 4,
      price: 750,
      description:
        "The Porsche Taycan Turbo S represents the pinnacle of electric performance...",
    },
  },
  {
    id: 6,
    name: "Subaru WRX STI",
    imageUrl: subaruWrx,
    year: 2023,
    transmission: "Manual",
    specs: {
      engine: "2.5L Turbocharged Boxer-4",
      power: 310,
      acceleration: 4.6,
      recomended: false,
      fuelType: "Premium Gasoline",
      seating: 5,
      price: 450,
      description:
        "The Subaru WRX STI delivers rally-bred performance with all-wheel drive capability...",
    },
  },
  {
    id: 7,
    name: "Toyota Supra GR",
    imageUrl: toyotaSupra,
    year: 2023,
    transmission: "Automatic",
    specs: {
      engine: "3.0L Turbocharged I6",
      power: 382,
      acceleration: 3.9,
      recomended: true,
      fuelType: "Premium Gasoline",
      seating: 2,
      price: 380,
      description:
        "The Toyota Supra GR continues the legacy of Toyota's iconic sports car...",
    },
  },
  {
    id: 8,
    name: "Volkswagen Golf R",
    imageUrl: volkswagenGolfR,
    year: 2023,
    transmission: "Automatic",
    specs: {
      engine: "2.0L Turbocharged I4",
      power: 315,
      acceleration: 4.8,
      recomended: false,
      fuelType: "Premium Gasoline",
      seating: 5,
      price: 350,
      description:
        "The Volkswagen Golf R is a hot hatchback that delivers performance and fun...",
    },
  },
  {
    id: 9,
    name: "Nissan GTR Nismo",
    imageUrl: nissanGtr,
    year: 2023,
    transmission: "Automatic",
    specs: {
      engine: "3.8L Twin-Turbo I6",
      power: 600,
      acceleration: 2.7,
      recomended: false,
      fuelType: "Premium Gasoline",
      seating: 2,
      price: 1200,
      description:
        "The Nissan GTR Nismo is a track-focused version of the Nissan GTR...",
    },
  },
  {
    id: 10,
    name: "Mclaren 720S",
    imageUrl: mclaren720s,
    year: 2023,
    transmission: "Automatic",
    specs: {
      engine: "4.0L V8 Twin-Turbo",
      power: 710,
      acceleration: 2.8,
      recomended: false,
      fuelType: "Premium Gasoline",
      seating: 2,
      price: 2500,
      description:
        "The McLaren 720S delivers breathtaking performance and cutting-edge technology...",
    },
  },
  {
    id: 11,
    name: "Mazda MX5 Miata",
    imageUrl: mazdaMx5,
    year: 2023,
    transmission: "Manual",
    specs: {
      engine: "1.5L NA I4",
      power: 181,
      acceleration: 7.3,
      recomended: false,
      fuelType: "Regular Gasoline",
      seating: 2,
      price: 300,
      description:
        "The Mazda MX5 Miata is a lightweight, rear-wheel drive sports car that's fun to drive...",
    },
  },
  {
    id: 12,
    name: "Jaguar F-Type R",
    imageUrl: jaguarFType,
    year: 2023,
    transmission: "Automatic",
    specs: {
      engine: "3.0L Turbocharged I4",
      power: 400,
      acceleration: 4.5,
      recomended: false,
      fuelType: "Premium Gasoline",
      seating: 2,
      price: 700,
      description:
        "The Jaguar F-Type R is a luxury sports car that combines performance and style...",
    },
  },
  {
    id: 13,
    name: "Ford Mustang GT500",
    imageUrl: fordMustang,
    year: 2023,
    transmission: "Automatic",
    specs: {
      engine: "5.0L Supercharged V8",
      power: 760,
      acceleration: 4.0,
      recomended: false,
      fuelType: "Regular Gasoline",
      seating: 2,
      price: 1000,
      description:
        "The Ford Mustang GT500 is a high-performance muscle car that delivers raw power...",
    },
  },
  {
    id: 14,
    name: "Chevrolet Corvette C8",
    imageUrl: chevroletCorvette,
    year: 2023,
    transmission: "Automatic",
    specs: {
      engine: "6.2L LT2 V8",
      power: 495,
      acceleration: 3.0,
      recomended: false,
      fuelType: "Regular Gasoline",
      seating: 2,
      price: 800,
      description:
        "The Chevrolet Corvette C8 is a mid-engine sports car that's known for its exceptional handling...",
    },
  },
  {
    id: 15,
    name: "Aston Martin Vantage",
    imageUrl: astonMartin,
    year: 2023,
    transmission: "Automatic",
    specs: {
      engine: "4.0L Twin-Turbo V8",
      power: 503,
      acceleration: 3.6,
      recomended: false,
      fuelType: "Premium Gasoline",
      seating: 2,
      price: 1500,
      description:
        "The Aston Martin Vantage is a luxury sports car that combines performance and style...",
    },
  },
  {
    id: 16,
    name: "Audi R8 V10",
    imageUrl: audiR8,
    year: 2023,
    transmission: "Automatic",
    specs: {
      engine: "5.2L V10",
      power: 610,
      acceleration: 3.1,
      recomended: false,
      fuelType: "Premium Gasoline",
      seating: 2,
      price: 1800,
      description:
        "The Audi R8 V10 is a high-performance sports car that delivers exceptional performance...",
    },
  },
  {
    id: 17,
    name: "Audi RS7",
    imageUrl: audiRs7,
    year: 2023,
    transmission: "Automatic",
    specs: {
      engine: "4.0L V8 TFSI",
      power: 591,
      acceleration: 3.5,
      recomended: false,
      fuelType: "Premium Gasoline",
      seating: 5,
      price: 599,
      description:
        "The Audi RS7 combines luxury and performance in a stunning package...",
    },
  },
  {
    id: 18,
    name: "BMW M8",
    imageUrl: bmwM8,
    year: 2023,
    transmission: "Automatic",
    specs: {
      engine: "4.4L Twin-Turbo V8",
      power: 625,
      acceleration: 3.2,
      recomended: false,
      fuelType: "Premium Gasoline",
      seating: 2,
      price: 2000,
      description:
        "The BMW M8 is a high-performance luxury sedan that delivers exceptional performance...",
    },
  },
  {
    id: 19,
    name: "BMW M4 Competition",
    imageUrl: bmwM4,
    year: 2023,
    transmission: "Manual",
    specs: {
      engine: "3.0L Twin-Turbo I6",
      power: 503,
      acceleration: 3.4,
      recomended: true,
      fuelType: "Premium Gasoline",
      seating: 4,
      price: 299,
      description: "The BMW M4 Competition delivers track-ready performance...",
    },
  },
  {
    id: 20,
    name: "Porsche 911",
    imageUrl: porsche911,
    year: 2023,
    transmission: "Automatic",
    specs: {
      engine: "3.0L Turbocharged I6",
      power: 443,
      acceleration: 3.8,
      recomended: false,
      fuelType: "Premium Gasoline",
      seating: 2,
      price: 1000,
      description:
        "The Porsche 911 is a classic sports car that's known for its exceptional handling...",
    },
  },
  {
    id: 21,
    name: "Lamborghini Huracan EVO",
    imageUrl: lamborghiniHuracan,
    year: 2023,
    transmission: "Automatic",
    specs: {
      engine: "5.2L V10",
      power: 640,
      acceleration: 2.9,
      recomended: false,
      fuelType: "Premium Gasoline",
      seating: 2,
      price: 2600,
      description:
        "The Lamborghini Huracan EVO represents the perfect fusion of technology and design, with aerodynamic solutions oriented towards maximum performance.",
    },
  },
  {
    id: 22,
    name: "Aston Martin Vantage",
    imageUrl: astonMartin,
    year: 2023,
    transmission: "Automatic",
    specs: {
      engine: "4.0L V8 Twin-Turbo",
      power: 503,
      acceleration: 3.5,
      recomended: false,
      fuelType: "Premium Gasoline",
      seating: 2,
      price: 1800,
      description:
        "The Aston Martin Vantage combines beautiful design with agile performance and dedicated craftsmanship.",
    },
  },
  {
    id: 23,
    name: "Audi R8 V10",
    imageUrl: audiR8,
    year: 2023,
    transmission: "Automatic",
    specs: {
      engine: "5.2L V10",
      power: 602,
      acceleration: 3.1,
      recomended: false,
      fuelType: "Premium Gasoline",
      seating: 2,
      price: 2200,
      description:
        "The Audi R8 V10 delivers breathtaking performance with its naturally aspirated V10 engine and quattro all-wheel drive.",
    },
  },
  {
    id: 24,
    name: "BMW M8",
    imageUrl: bmwM8,
    year: 2023,
    transmission: "Automatic",
    specs: {
      engine: "4.4L V8 Twin-Turbo",
      power: 617,
      acceleration: 3.0,
      recomended: false,
      fuelType: "Premium Gasoline",
      seating: 4,
      price: 1500,
      description:
        "The BMW M8 combines luxury grand touring with M division performance capabilities.",
    },
  },
  {
    id: 25,
    name: "Chevrolet Corvette C8",
    imageUrl: chevroletCorvette,
    year: 2023,
    transmission: "Automatic",
    specs: {
      engine: "6.2L V8",
      power: 495,
      acceleration: 2.9,
      recomended: false,
      fuelType: "Premium Gasoline",
      seating: 2,
      price: 1200,
      description:
        "The mid-engine Chevrolet Corvette C8 redefines American sports car performance.",
    },
  },
  {
    id: 26,
    name: "Ford Mustang GT500",
    imageUrl: fordMustang,
    year: 2023,
    transmission: "Manual",
    specs: {
      engine: "5.2L Supercharged V8",
      power: 760,
      acceleration: 3.3,
      recomended: false,
      fuelType: "Premium Gasoline",
      seating: 4,
      price: 950,
      description:
        "The most powerful street-legal Ford ever, the Mustang GT500 combines raw power with precision handling.",
    },
  },
  {
    id: 27,
    name: "Jaguar F-Type R",
    imageUrl: jaguarFType,
    year: 2023,
    transmission: "Automatic",
    specs: {
      engine: "5.0L Supercharged V8",
      power: 575,
      acceleration: 3.5,
      recomended: false,
      fuelType: "Premium Gasoline",
      seating: 2,
      price: 1300,
      description:
        "The Jaguar F-Type R combines British luxury with explosive performance and stunning design.",
    },
  },
  {
    id: 28,
    name: "Mazda MX-5 Miata",
    imageUrl: mazdaMx5,
    year: 2023,
    transmission: "Manual",
    specs: {
      engine: "2.0L I4",
      power: 181,
      acceleration: 5.7,
      recomended: false,
      fuelType: "Premium Gasoline",
      seating: 2,
      price: 250,
      description:
        "The Mazda MX-5 Miata continues to deliver pure driving pleasure with its perfect balance and lightweight design.",
    },
  },
  {
    id: 29,
    name: "Nissan GT-R Nismo",
    imageUrl: nissanGtr,
    year: 2023,
    transmission: "Automatic",
    specs: {
      engine: "3.8L V6 Twin-Turbo",
      power: 600,
      acceleration: 2.8,
      recomended: false,
      fuelType: "Premium Gasoline",
      seating: 4,
      price: 1800,
      description:
        "The Nissan GT-R NISMO represents the ultimate expression of Nissan's performance engineering.",
    },
  },
  {
    id: 30,
    name: "Porsche 911",
    imageUrl: porsche911,
    year: 2023,
    transmission: "Automatic",
    specs: {
      engine: "3.0L Twin-Turbo Flat-6",
      power: 443,
      acceleration: 3.4,
      recomended: false,
      fuelType: "Premium Gasoline",
      seating: 4,
      price: 1600,
      description:
        "The Porsche 911 continues to set the standard for sports car excellence and everyday usability.",
    },
  },
  {
    id: 31,
    name: "Mercedes-AMG GT",
    imageUrl: mercedesAmgGt,
    year: 2023,
    transmission: "Automatic",
    specs: {
      engine: "4.0L V8 Biturbo",
      power: 523,
      acceleration: 3.7,
      recomended: false,
      fuelType: "Premium Gasoline",
      seating: 2,
      price: 1900,
      description:
        "The Mercedes-AMG GT combines stunning design with breathtaking performance and luxury.",
    },
  },
  {
    id: 32,
    name: "Volkswagen Golf R",
    imageUrl: volkswagenGolfR,
    year: 2023,
    transmission: "Automatic",
    specs: {
      engine: "2.0L Turbocharged I4",
      power: 315,
      acceleration: 4.7,
      recomended: false,
      fuelType: "Premium Gasoline",
      seating: 5,
      price: 350,
      description:
        "The Volkswagen Golf R delivers exceptional performance in a practical hot hatch package.",
    },
  },
  {
    id: 33,
    name: "BMW M4 Competition",
    imageUrl: bmwM4,
    year: 2023,
    transmission: "Manual",
    specs: {
      engine: "3.0L Twin-Turbo I6",
      power: 503,
      acceleration: 3.4,
      recomended: false,
      fuelType: "Premium Gasoline",
      seating: 4,
      price: 1100,
      description:
        "The BMW M4 Competition delivers track-ready performance with everyday usability.",
    },
  },
  {
    id: 34,
    name: "Audi RS7",
    imageUrl: audiRs7,
    year: 2023,
    transmission: "Automatic",
    specs: {
      engine: "4.0L V8 Twin-Turbo",
      power: 591,
      acceleration: 3.5,
      recomended: false,
      fuelType: "Premium Gasoline",
      seating: 5,
      price: 1400,
      description:
        "The Audi RS7 combines stunning design with incredible performance in a practical fastback package.",
    },
  },
];

// // Helper functions
// export const filterLuxuryCars = (cars: Car[]): Car[] => {
//   return cars.filter(
//     (car) => parseInt(car.specs.price.replace("PLN ", "")) > 500
//   );
// };

// export const filterManualCars = (cars: Car[]): Car[] => {
//   return cars.filter((car) => car.transmission === "Manual");
// };

// export const filterFastCars = (cars: Car[]): Car[] => {
//   return cars.filter((car) => car.specs.acceleration < 3.5
// };

// export const sortByPrice = (cars: Car[]): Car[] => {
//   return [...cars].sort((a, b) => {
//     const priceA = parseInt(a.specs.price.replace("PLN ", ""));
//     const priceB = parseInt(b.specs.price.replace("PLN ", ""));
//     return priceA - priceB;
//   });
// };

// export const sortByPower = (cars: Car[]): Car[] => {
//   return [...cars].sort((a, b) => b.specs.power - a.specs.power);
// };
