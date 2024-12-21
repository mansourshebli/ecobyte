import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyD-Msi7l5x3p24Mp2jlYeinMbT4uE8qKbo",
  authDomain: "ecobyte-sign-in.firebaseapp.com",
  projectId: "ecobyte-sign-in",
  storageBucket: "ecobyte-sign-in.firebasestorage.app",
  messagingSenderId: "799776603306",
  appId: "1:799776603306:web:751fb9e66938a278dd64d3",
  measurementId: "G-RMDFRH33FX"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
auth.useDeviceLanguage();

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export const db = getFirestore(app);
export const storage = getStorage(app);