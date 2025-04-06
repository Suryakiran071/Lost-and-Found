import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { auth, provider, signInWithPopup } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // 🔐 Email + Password Signup
  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      const token = await user.getIdToken();
      localStorage.setItem("token", token);
  
      alert(`Welcome, ${user.email}`);
      window.location.href = "/";
    } catch (err) {
      console.error("Email signup error:", err);
      alert(err.message);
    }
  };
  
  

  // 🔐 Google Signup
  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const token = await user.getIdToken();
      localStorage.setItem("token", token);

      alert(`Welcome, ${user.displayName}`);
      window.location.href = "/";
    } catch (err) {
      console.error("Google Sign-up error", err);
      alert("Google Sign-up failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Sign Up</h2>

        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded bg-gray-700 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded bg-gray-700 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full p-3 rounded bg-gray-700 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-400 mt-4 text-sm">
          Already a user?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Click here to log in
          </Link>
        </p>

        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-600" />
          <span className="mx-3 text-gray-400 text-sm">or</span>
          <div className="flex-grow h-px bg-gray-600" />
        </div>

        <button
          onClick={handleGoogleSignup}
          className="w-full flex items-center justify-center space-x-3 border border-gray-500 py-3 rounded text-white hover:bg-gray-700 transition"
        >
          <FcGoogle className="text-xl" />
          <span>Sign up with Google</span>
        </button>
      </div>
    </div>
  );
};

export default Signup;
