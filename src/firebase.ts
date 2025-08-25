import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBXPhoIEo73-Q4eUAQ0Rx3VbrSMtLEd3w4",
  authDomain: "inkbound-society.firebaseapp.com",
  projectId: "inkbound-society",
  storageBucket: "inkbound-society.appspot.com",
  messagingSenderId: "850330029375",
  appId: "1:850330029375:web:27c1146d41c42a9fa4578a"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// 👇 pin the bucket explicitly
export const storage = getStorage(app, "gs://inkbound-society.firebasestorage.app");
export const auth = getAuth(app);