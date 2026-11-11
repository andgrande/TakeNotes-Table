import {
  onAuthStateChanged, signInWithEmailAndPassword, signOut, User,
} from 'firebase/auth';
import { getAuthInstance } from '../firebase/config';

export const signIn = (email: string, password: string) =>
  signInWithEmailAndPassword(getAuthInstance(), email, password);

export const logOut = () => signOut(getAuthInstance());

export const subscribeToAuth = (callback: (user: User | null) => void) =>
  onAuthStateChanged(getAuthInstance(), callback);
