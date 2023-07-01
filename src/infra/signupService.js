import { auth } from '../firebase-config';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export const signUp = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};
