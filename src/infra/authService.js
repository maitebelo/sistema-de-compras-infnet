import { auth } from '../firebase-config';
import { signInWithEmailAndPassword } from 'firebase/auth';

export const signIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};
