import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

// 🔥 Use your existing firebase config here
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Test document path
const testDocRef = doc(db, "virtual_shelf_books", "test_rule_doc");

async function testPublicRead() {
  console.log("🟡 Testing public read (no auth)...");
  await signOut(auth); // force logout
  try {
    const snap = await getDoc(testDocRef);
    console.log("✅ Public read allowed:", snap.exists());
  } catch (err) {
    console.error("❌ Public read failed:", err);
  }
}

async function testPublicWrite() {
  console.log("🟡 Testing public write (no auth)...");
  await signOut(auth); // force logout
  try {
    await setDoc(testDocRef, { name: "Anon User", bookTitle: "Should Fail" });
    console.error("❌ Public write succeeded (NOT expected!)");
  } catch (err) {
    console.log("✅ Public write blocked as expected:", err);
  }
}

async function testAdminWrite() {
  console.log("🟡 Testing admin write (with Google login)...");
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  console.log("Signed in as:", result.user.uid);

  try {
    await setDoc(testDocRef, {
      name: "Admin User",
      bookTitle: "This should succeed",
      updatedAt: new Date(),
    });
    console.log("✅ Admin write succeeded");
  } catch (err) {
    console.error("❌ Admin write failed:", err);
  }
}

// Run tests in order
(async () => {
  await testPublicRead();
  await testPublicWrite();
  await testAdminWrite();
})();
