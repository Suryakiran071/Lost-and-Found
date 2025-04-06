import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { auth, provider, signInWithPopup } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Eye icons

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State for password visibility

  // 🔐 Email Login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const token = await user.getIdToken();
      localStorage.setItem("token", token);

      alert(`Welcome back, ${user.email}`);
      window.location.href = "/";
    } catch (err) {
      console.error("Login error:", err);
      alert("Invalid credentials or user not found. Please sign up first.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const token = await user.getIdToken();
      localStorage.setItem("token", token);

      alert(`Welcome, ${user.displayName}`);
      window.location.href = "/";
    } catch (err) {
      console.error("Google login error", err);
      alert("Google login failed.");
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-black to-transparent">
      <div className="flex w-full max-w-screen-xl mx-auto">
        {/* Left Side with Quote */}
        <div className="w-1/2 flex flex-col justify-center items-center text-white p-8">
          <h2 className="text-4xl font-bold text-center mb-6">
            "Help your friends get back their belongings."
          </h2>
          <p className="text-lg text-center">
            Lost and found items matter. Together, we can help people reunite with what they’ve lost.
          </p>
        </div>

        {/* Right Side with Login Box */}
        <div className="ml-40 w-1/3 bg-gray-800 p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center text-white">Login</h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded bg-gray-700 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="relative">
              <input
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Password"
                className="w-full p-3 rounded bg-gray-700 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {/* Eye icon to toggle password visibility */}
              <span
                className="absolute right-3 top-3 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {isPasswordVisible ? (
                  <FaEyeSlash className="text-gray-400 mt-1" />
                ) : (
                  <FaEye className="text-gray-400 mt-1" />
                )}
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded transition"
            >
              Login
            </button>
          </form>

          <p className="text-center text-gray-400 mt-4 text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-400 hover:underline">
              Click here to sign up
            </Link>
          </p>

          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-gray-600" />
            <span className="mx-3 text-gray-400 text-sm">or</span>
            <div className="flex-grow h-px bg-gray-600" />
          </div>

          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center space-x-3 border border-gray-500 py-3 rounded text-white hover:bg-gray-700 transition"
          >
            <FcGoogle className="text-xl" />
            <span>Continue with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
