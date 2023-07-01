import { auth } from '../firebase-config';
import { signOut } from 'firebase/auth';

export const logout = () => {
  return signOut(auth)
    .then(() => {
      localStorage.removeItem('isAuth');
      return true;
    })
    .catch((error) => {
      throw error;
    });
};
