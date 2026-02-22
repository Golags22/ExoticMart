// src/database/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration - direct values
const firebaseConfig = {
  apiKey: "AIzaSyBdCN3v5UALE2Lz41tuKrpNTjquarYQYMw",
  authDomain: "exoticmart-cf592.firebaseapp.com",
  projectId: "exoticmart-cf592",
  storageBucket: "exoticmart-cf592.firebasestorage.app",
  messagingSenderId: "351876976129",
  appId: "1:351876976129:web:9c2506ad252513b6b0fa00"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;