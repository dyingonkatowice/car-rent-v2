import { db } from '../config/firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  getDoc, 
  Timestamp,
  query,
  where
} from 'firebase/firestore';

// Types
export interface CarSpecs {
  engine: string;
  power: string;
  acceleration: string;
  fuelType: string;
  seating: string;
  price: number;
  description: string;
}

export interface Car {
  id?: string;
  name: string;
  year: number;
  transmission: string;
  imageUrl: string;
  specs: CarSpecs;
  available?: boolean;
  featured?: boolean;
  category?: string;
}

export interface Rental {
  id?: string;
  carId: string;
  userId: string;
  startDate: Timestamp;
  endDate: Timestamp;
  totalPrice: number;
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'refunded';
}

export interface Review {
  id?: string;
  carId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface RentalWithDetails extends Rental {
  car: Car;
}

export interface UserProfile {
  displayName: string;
  email: string;
  phoneNumber: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Car Operations
export const addCarToFirestore = async (car: Omit<Car, 'id'>) => {
  try {
    const docRef = await addDoc(collection(db, 'cars'), {
      ...car,
      available: true,
      featured: false,
      category: 'standard'
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding car:', error);
    throw error;
  }
};

export const getCarsFromFirestore = async (): Promise<Car[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'cars'));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as Omit<Car, 'id'>)
    }));
  } catch (error) {
    console.error('Error getting cars:', error);
    throw error;
  }
};

export const updateCarInFirestore = async (carId: string, updates: Partial<Car>) => {
  try {
    const carRef = doc(db, 'cars', carId);
    await updateDoc(carRef, updates);
  } catch (error) {
    console.error('Error updating car:', error);
    throw error;
  }
};

export const deleteCarFromFirestore = async (carId: string) => {
  try {
    await deleteDoc(doc(db, 'cars', carId));
  } catch (error) {
    console.error('Error deleting car:', error);
    throw error;
  }
};

// Rental Operations
export const createRental = async (rental: Omit<Rental, 'id'>) => {
  try {
    const docRef = await addDoc(collection(db, 'rentals'), rental);
    // Update car availability
    await updateCarInFirestore(rental.carId, { available: false });
    return docRef.id;
  } catch (error) {
    console.error('Error creating rental:', error);
    throw error;
  }
};

export const getRentalsByUser = async (userId: string): Promise<Rental[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'rentals'));
    const rentals = querySnapshot.docs
      .map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<Rental, 'id'>)
      }))
      .filter(rental => rental.userId === userId);
    return rentals;
  } catch (error) {
    console.error('Error getting rentals:', error);
    throw error;
  }
};

// Review Operations
export const addReview = async (review: Omit<Review, 'id'>) => {
  try {
    const docRef = await addDoc(collection(db, 'reviews'), review);
    return docRef.id;
  } catch (error) {
    console.error('Error adding review:', error);
    throw error;
  }
};

export const getReviewsForCar = async (carId: string): Promise<Review[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'reviews'));
    const reviews = querySnapshot.docs
      .map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<Review, 'id'>)
      }))
      .filter(review => review.carId === carId);
    return reviews;
  } catch (error) {
    console.error('Error getting reviews:', error);
    throw error;
  }
};

// Category Operations
export const getCarsByCategory = async (category: string): Promise<Car[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'cars'));
    const cars = querySnapshot.docs
      .map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<Car, 'id'>)
      }))
      .filter(car => car.category === category);
    return cars;
  } catch (error) {
    console.error('Error getting cars by category:', error);
    throw error;
  }
};

export const getFeaturedCars = async (): Promise<Car[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'cars'));
    const cars = querySnapshot.docs
      .map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<Car, 'id'>)
      }))
      .filter(car => car.featured);
    return cars;
  } catch (error) {
    console.error('Error getting featured cars:', error);
    throw error;
  }
};

export async function getUserRentals(userId: string): Promise<RentalWithDetails[]> {
  try {
    const rentalsRef = collection(db, 'rentals');
    const q = query(rentalsRef, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    
    const rentals = await Promise.all(querySnapshot.docs.map(async (rentalDoc) => {
      const rentalData = rentalDoc.data();
      const rental = { 
        id: rentalDoc.id,
        carId: rentalData.carId,
        userId: rentalData.userId,
        startDate: rentalData.startDate.toDate(),
        endDate: rentalData.endDate.toDate(),
        totalPrice: rentalData.totalPrice,
        status: rentalData.status
      } as Rental;

      const carDocRef = doc(db, 'cars', rental.carId);
      const carDoc = await getDoc(carDocRef);
      const carData = carDoc.data();
      
      if (!carData) {
        throw new Error('Car not found');
      }

      const car = {
        id: carDoc.id,
        name: carData.name,
        year: carData.year,
        transmission: carData.transmission,
        imageUrl: carData.imageUrl,
        specs: carData.specs,
        category: carData.category,
        featured: carData.featured
      } as Car;
      
      return {
        ...rental,
        car
      };
    }));

    return rentals;
  } catch (error) {
    console.error('Error getting user rentals:', error);
    throw error;
  }
} 