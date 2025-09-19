import { db } from '../config/firebase';
import { collection, addDoc, getDocs, doc, updateDoc, getDoc, query, where, Timestamp } from 'firebase/firestore';
import { Rental, Car } from './firebase-admin';
import { updateUserProfile } from './auth';

export interface RentalRequest {
  carId: string;
  userId: string;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
}

export interface RentalWithDetails extends Rental {
  car: {
    name: string;
    imageUrl: string;
  };
}

// Calculate rental price
export const calculateRentalPrice = (pricePerDay: number, startDate: Date, endDate: Date): number => {
  const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  return days * pricePerDay;
};

// Check car availability
export const checkCarAvailability = async (
  carId: string,
  startDate: Date,
  endDate: Date
): Promise<boolean> => {
  try {
    const rentalsRef = collection(db, 'rentals');
    const q = query(
      rentalsRef,
      where('carId', '==', carId),
      where('status', 'in', ['pending', 'active'])
    );
    
    const querySnapshot = await getDocs(q);
    
    return !querySnapshot.docs.some(doc => {
      const rental = doc.data() as Rental;
      const rentalStart = (rental.startDate as unknown as Timestamp).toDate();
      const rentalEnd = (rental.endDate as unknown as Timestamp).toDate();
      
      return (
        (startDate >= rentalStart && startDate <= rentalEnd) ||
        (endDate >= rentalStart && endDate <= rentalEnd) ||
        (startDate <= rentalStart && endDate >= rentalEnd)
      );
    });
  } catch (error) {
    console.error('Error checking car availability:', error);
    throw error;
  }
};

// Create a new rental
export const createRentalBooking = async (rentalRequest: RentalRequest): Promise<string> => {
  try {
    // Check availability first
    const isAvailable = await checkCarAvailability(
      rentalRequest.carId,
      rentalRequest.startDate,
      rentalRequest.endDate
    );

    if (!isAvailable) {
      throw new Error('Car is not available for the selected dates');
    }

    // Create the rental
    const rental: Omit<Rental, 'id'> = {
      ...rentalRequest,
      startDate: Timestamp.fromDate(rentalRequest.startDate),
      endDate: Timestamp.fromDate(rentalRequest.endDate),
      status: 'pending',
      paymentStatus: 'pending'
    };

    const docRef = await addDoc(collection(db, 'rentals'), rental);

    // Update user's rentals array
    await updateUserProfile(rentalRequest.userId, {
      rentals: [docRef.id]
    });

    return docRef.id;
  } catch (error) {
    console.error('Error creating rental:', error);
    throw error;
  }
};

// Get rental details
export const getRentalDetails = async (rentalId: string): Promise<RentalWithDetails | null> => {
  try {
    const rentalDoc = await getDoc(doc(db, 'rentals', rentalId));
    
    if (!rentalDoc.exists()) {
      return null;
    }

    const rental = rentalDoc.data() as Rental;
    const carDoc = await getDoc(doc(db, 'cars', rental.carId));
    
    if (!carDoc.exists()) {
      throw new Error('Car not found');
    }

    const car = carDoc.data() as Car;

    return {
      ...rental,
      id: rentalDoc.id,
      car: {
        name: car.name,
        imageUrl: car.imageUrl
      }
    };
  } catch (error) {
    console.error('Error getting rental details:', error);
    throw error;
  }
};

// Update rental status
export const updateRentalStatus = async (
  rentalId: string,
  status: Rental['status'],
  paymentStatus: Rental['paymentStatus']
): Promise<void> => {
  try {
    await updateDoc(doc(db, 'rentals', rentalId), {
      status,
      paymentStatus
    });
  } catch (error) {
    console.error('Error updating rental status:', error);
    throw error;
  }
};

// Get user's rentals
export const getUserRentals = async (userId: string): Promise<RentalWithDetails[]> => {
  try {
    const rentalsRef = collection(db, 'rentals');
    const q = query(rentalsRef, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    
    const rentals = await Promise.all(
      querySnapshot.docs.map(async (rentalDoc) => {
        const rental = rentalDoc.data() as Rental;
        const carDoc = await getDoc(doc(db, 'cars', rental.carId));
        const car = carDoc.data() as Car;

        return {
          ...rental,
          id: rentalDoc.id,
          car: {
            name: car.name,
            imageUrl: car.imageUrl
          }
        };
      })
    );

    return rentals;
  } catch (error) {
    console.error('Error getting user rentals:', error);
    throw error;
  }
}; 