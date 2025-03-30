// Firebase configuration file
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Replace with your Firebase project configuration
const firebaseConfig ={
    apiKey: "AIzaSyDXwrR-0h6UFFZtM-bOsca9yPwMXc2yijw",
    authDomain: "buoyant-embassy-232509.firebaseapp.com",
    projectId: "buoyant-embassy-232509",
    storageBucket: "buoyant-embassy-232509.firebasestorage.app",
    messagingSenderId: "836857246766",
    appId: "1:836857246766:web:036418108d8c009156dbbf"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export default app;