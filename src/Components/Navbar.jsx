import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const isAuthenticated = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <nav className="bg-gray-800 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left Side - Logo */}
        <Link to="/" className="text-xl font-bold">Lost & Found</Link>

        {/* Right Side - Authentication Links */}
        <div className="ml-auto flex items-center space-x-6">
          {isAuthenticated ? (
            <button 
              onClick={handleLogout} 
              className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-600">
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-400">Login</Link>
              <Link to="/signup" className="hover:text-blue-400">Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
