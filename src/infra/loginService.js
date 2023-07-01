import { db } from '../firebase-config';
import { signIn } from './authService';
import { collection, query, addDoc, getDocs, where } from 'firebase/firestore';

export const login = (email, password) => {
  return signIn(email, password)
    .then(async (result) => {
      const userRef = query(
        collection(db, 'tipo-usuario'),
        where('id', '==', result.user.uid),
      );
      const snapshot = await getDocs(userRef);
      const dadosUser = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))[0];
      localStorage.setItem('isAuth', true);
      localStorage.setItem('user', dadosUser.userType);
      return true;
    })

    .catch((error) => {
      throw error;
    });
};
