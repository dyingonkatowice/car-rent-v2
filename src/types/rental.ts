import { Car } from '../utils/firebase-admin';

export interface Rental {
  id: string;
  car: Car;
  userId: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'cancelled';
  totalPrice: number;
} 