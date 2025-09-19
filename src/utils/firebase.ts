import { auth, db } from '../config/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

interface UserProfile {
  displayName: string;
  email: string;
  phoneNumber: string;
}

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      return userDoc.data() as UserProfile;
    }
    return null;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
}

export async function updateUserProfile(userId: string, profile: UserProfile): Promise<void> {
  try {
    await updateDoc(doc(db, 'users', userId), profile);
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
} 