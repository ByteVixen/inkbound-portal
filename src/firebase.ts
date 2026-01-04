import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "inkbound-society.firebaseapp.com",
  projectId: "inkbound-society",
  storageBucket: "inkbound-society.appspot.com",
  messagingSenderId: "850330029375",
  appId: "1:850330029375:web:27c1146d41c42a9fa4578a",
};
console.log("🔥 Firebase key (first 8):", String(import.meta.env.VITE_FIREBASE_API_KEY || "").slice(0, 8));

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// 👇 pin the bucket explicitly
export const storage = getStorage(app, "gs://inkbound-society.firebasestorage.app");
export const auth = getAuth(app);