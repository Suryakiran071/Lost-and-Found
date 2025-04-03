// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

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
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
