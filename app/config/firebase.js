import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD569pr6hcWzpmC7vB0g8fldJ8aRnv8FvI",
  authDomain: "refuelling-apps.firebaseapp.com",
  databaseURL: "https://refuelling-apps-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "refuelling-apps",
  storageBucket: "refuelling-apps.firebasestorage.app",
  messagingSenderId: "661881168868",
  appId: "1:661881168868:web:b51fd0d4c11914552bddf1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };