import React, { useState, useEffect } from "react";
import { db } from "../firebase"; // Firestore instance
import { collection, addDoc, Timestamp } from "firebase/firestore"; // Firestore methods
import { auth } from "../firebase"; // Import Firebase Auth
import { useNavigate } from "react-router-dom"; // For redirection
import axios from "axios"; // Axios for API requests

// Cloudinary API details
const CLOUD_NAME = "delj6jicg"; // Replace with your Cloudinary cloud name
const UPLOAD_PRESET = "my_upload_preset"; // Replace with your preset (you need to create one in Cloudinary)

// Function to upload the image to Cloudinary
const uploadImageToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET); // This must be created in Cloudinary

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      formData
    );
    return response.data.secure_url; // Return the URL of the uploaded image
  } catch (error) {
    console.error("Error uploading image to Cloudinary", error);
    throw new Error("Image upload failed");
  }
};

const ReportItem = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    date: "",
    location: "",
    contact: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // For navigation in React Router v6

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsUserLoggedIn(true);
        setUser(user); // Store user details
      } else {
        setIsUserLoggedIn(false);
      }
    });

    return () => unsubscribe(); // Cleanup the listener
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value, // Handle image file
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isUserLoggedIn) {
      alert("You need to log in to report an item.");
      navigate("/login"); // Redirect to the login page
      return;
    }

    setLoading(true);

    try {
      let imageUrl = "";

      // ✅ Upload image to Cloudinary (if selected)
      if (formData.image) {
        imageUrl = await uploadImageToCloudinary(formData.image);
      }

      // ✅ Store the item data in Firestore
      await addDoc(collection(db, "found_items"), {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        date: formData.date,
        location: formData.location,
        contact: formData.contact,
        imageUrl: imageUrl,  // Store the image URL in Firestore
        createdAt: Timestamp.now(),
        userId: user.uid, // Link the item to the user's ID
      });

      alert("Item reported successfully!");
      setFormData({
        title: "",
        description: "",
        category: "",
        date: "",
        location: "",
        contact: "",
        image: null,
      });
    } catch (err) {
      console.error("Error reporting item:", err);
      alert("Something went wrong. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex justify-center p-8">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center">Report Lost / Found Item</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="w-full p-3 rounded bg-gray-700 text-white outline-none"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            className="w-full p-3 rounded bg-gray-700 text-white outline-none"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <select
            name="category"
            className="w-full p-3 rounded bg-gray-700 text-white"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="Electronics">Electronics</option>
            <option value="ID Card">ID Card</option>
            <option value="Wallet">Wallet</option>
            <option value="Books">Books</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="date"
            name="date"
            className="w-full p-3 rounded bg-gray-700 text-white"
            value={formData.date}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location Found / Lost"
            className="w-full p-3 rounded bg-gray-700 text-white"
            value={formData.location}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="contact"
            placeholder="Your Contact Details"
            className="w-full p-3 rounded bg-gray-700 text-white"
            value={formData.contact}
            onChange={handleChange}
            required
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            className="w-full p-3 rounded bg-gray-700 text-white"
            onChange={handleChange}
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 py-3 font-semibold rounded transition"
          >
            {loading ? "Submitting..." : "Submit Report"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportItem;
