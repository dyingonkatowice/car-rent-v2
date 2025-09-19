import { auth, db } from '../config/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
  AuthError
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  phoneNumber?: string;
  drivingLicense?: string;
  rentals?: string[];
  createdAt: Date;
  updatedAt: Date;
  role: string;
}

// Sign up
export const signUp = async (
  email: string,
  password: string,
  displayName: string,
  phoneNumber?: string,
  drivingLicense?: string
): Promise<UserProfile> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update display name
    await updateProfile(user, { displayName });

    // Create user profile in Firestore
    const userProfile: UserProfile = {
      id: user.uid,
      email,
      displayName,
      phoneNumber,
      drivingLicense,
      rentals: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      role: 'user'
    };

    await setDoc(doc(db, 'users', user.uid), userProfile);
    return userProfile;
  } catch (error) {
    const authError = error as AuthError;
    switch (authError.code) {
      case 'auth/email-already-in-use':
        throw new Error('This email is already registered. Please try signing in instead.');
      case 'auth/invalid-email':
        throw new Error('The email address is invalid.');
      case 'auth/operation-not-allowed':
        throw new Error('Email/password accounts are not enabled. Please contact support.');
      case 'auth/weak-password':
        throw new Error('The password is too weak. Please use a stronger password.');
      default:
        throw new Error('An error occurred during sign up. Please try again.');
    }
  }
};

// Sign in with enhanced error handling
export const signIn = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    const authError = error as AuthError;
    switch (authError.code) {
      case 'auth/invalid-credential':
        throw new Error('Invalid email or password. Please check your credentials and try again.');
      case 'auth/user-disabled':
        throw new Error('This account has been disabled. Please contact support.');
      case 'auth/user-not-found':
        throw new Error('No account found with this email. Please sign up first.');
      case 'auth/wrong-password':
        throw new Error('Incorrect password. Please try again.');
      case 'auth/too-many-requests':
        throw new Error('Too many failed login attempts. Please try again later.');
      case 'auth/invalid-email':
        throw new Error('The email address is invalid.');
      default:
        throw new Error('An error occurred during sign in. Please try again.');
    }
  }
};

// Sign out
export const signOutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

// Get user profile
export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      return userDoc.data() as UserProfile;
    }
    return null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }
};

// Update user profile
export const updateUserProfile = async (
  userId: string,
  updates: Partial<UserProfile>
): Promise<void> => {
  try {
    await setDoc(doc(db, 'users', userId), {
      ...updates,
      updatedAt: new Date()
    }, { merge: true });
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
}; 