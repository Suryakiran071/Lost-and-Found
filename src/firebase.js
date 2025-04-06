import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyC6byww37PwwzssCT5usQeHve_0C-t1Utw",
  authDomain: "lost-and-found-778ae.firebaseapp.com",
  projectId: "lost-and-found-778ae",
  storageBucket: "lost-and-found-778ae.firebasestorage.app",
  messagingSenderId: "279697362838",
  appId: "1:279697362838:web:080bd131e048bcccc8d7b7",
  measurementId: "G-3ZK93Z2CNY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Firestore ✅
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, provider, signInWithPopup, db, storage };
