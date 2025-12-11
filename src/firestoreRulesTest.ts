// src/lib/firebase.ts  (or src/firebase.ts – match your existing path)

import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// 🔥 Use your existing firebase config here
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Avoid re-initialising in dev with hot reload
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// ✅ This is what you need in InkboundSanta
export const db = getFirestore(app);

// Optional: keep these for your admin dashboard / auth features
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
