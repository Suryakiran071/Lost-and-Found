// src/components/GoogleLogin.jsx
import React from "react";
import { auth, provider, signInWithPopup } from "../firebase";

const GoogleLogin = () => {
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Optional: Save token or user data
      const token = await user.getIdToken();
      localStorage.setItem("token", token);
      alert(`Welcome, ${user.displayName}`);
      window.location.href = "/";
    } catch (err) {
      console.error("Google sign-in error", err);
      alert("Google Sign-in failed.");
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="bg-white text-black px-6 py-2 rounded shadow hover:shadow-lg"
    >
      Continue with Google
    </button>
  );
};

export default GoogleLogin;
