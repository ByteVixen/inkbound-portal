// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBXPhoIEo73-Q4eUAQ0Rx3VbrSMtLEd3w4",
  authDomain: "inkbound-society.firebaseapp.com",
  projectId: "inkbound-society",
  storageBucket: "inkbound-society.firebasestorage.app",
  messagingSenderId: "850330029375",
  appId: "1:850330029375:web:27c1146d41c42a9fa4578a",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);