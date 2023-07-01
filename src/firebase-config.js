import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCQgiaTpEuYrq-LK0ytlc15YIjSfO3uXJo',
  authDomain: 'sistema-de-compras-f1bb7.firebaseapp.com',
  projectId: 'sistema-de-compras-f1bb7',
  storageBucket: 'sistema-de-compras-f1bb7.appspot.com',
  messagingSenderId: '879792239573',
  appId: '1:879792239573:web:2da1285535ba5c6380c35c',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
