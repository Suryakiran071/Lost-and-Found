import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase"; // Firebase auth instance
import { signOut } from "firebase/auth"; // Firebase sign-out method

const Navbar = () => {
  const [user, setUser] = useState(null); // State to track user authentication
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown toggle

  // Check user authentication status on component mount
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser); // Set user when logged in
      } else {
        setUser(null); // Reset when logged out
      }
    });

    return () => unsubscribe(); // Clean up subscription on unmount
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out using Firebase
      setUser(null); // Clear the user state
      localStorage.removeItem("token"); // Remove the token from localStorage
      window.location.reload(); // Optionally reload the page
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle the dropdown visibility
  };

  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          Lost & Found
        </Link>

        {/* Navigation Links */}
        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="hover:text-blue-400">Home</Link>
          </li>
          <li>
            <Link to="/report" className="hover:text-blue-400">Report Item</Link>
          </li>
          <li>
            <Link to="/found" className="hover:text-blue-400">Found Items</Link>
          </li>

          {!user ? (
            <li>
              <Link to="/login" className="hover:text-blue-400">Login</Link>
            </li>
          ) : (
            <li className="relative">
              {/* Profile Icon */}
              <div
                onClick={toggleDropdown}
                className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center cursor-pointer"
              >
                <span className="text-white text-lg">{user?.email?.charAt(0)}</span>
              </div>

              {/* Dropdown with User Info and Logout */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-auto bg-gray-500/25 text-white rounded-lg p-3 shadow-lg border-2 border-transparent backdrop-blur-sm">
                  <h6 className="mb-2 text-gray-100/75">User</h6>
                  <hr className="border-t-2 border-gray-400/50 mb-1" />
                  <p className="text-center mb-3 text-gray-100/75">{user?.email}</p>
                  <Link to="/my-items" className="w-full text-left hover:bg-gray-700/75 p-2 rounded">My Items</Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left hover:bg-red-700/75 p-2 rounded"
                  >
                    Logout
                  </button>
                </div>
              )}
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
