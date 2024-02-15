// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyB3gRcnJpqATtuccCw53p41mbXYUZsOb8s",
  authDomain: "mskart-b946c.firebaseapp.com",
  projectId: "mskart-b946c",
  storageBucket: "mskart-b946c.appspot.com",
  messagingSenderId: "979268102752",
  appId: "1:979268102752:web:268a10b68065c795123105"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { auth, db, storage}