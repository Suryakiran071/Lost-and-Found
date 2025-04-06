import React, { useState, useEffect } from "react";
import { db } from "../firebase"; // Firestore instance
import { collection, query, where, getDocs } from "firebase/firestore"; // Firestore query methods
import { auth } from "../firebase"; // Firebase Auth

const MyItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null); // State for selected item

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user); // Store the user if logged in
        fetchUserItems(user.uid); // Fetch items for the logged-in user
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe(); // Cleanup the listener
  }, []);

  const fetchUserItems = async (uid) => {
    try {
      const q = query(collection(db, "found_items"), where("userId", "==", uid));
      const querySnapshot = await getDocs(q);
      const userItems = querySnapshot.docs.map((doc) => doc.data());
      setItems(userItems); // Set the items fetched from Firestore
    } catch (err) {
      console.error("Error fetching user items:", err);
    }
    setLoading(false);
  };

  const handleCardClick = (item) => {
    setSelectedItem(item); // Set the selected item when a card is clicked
  };

  const renderModal = () => {
    if (!selectedItem) return null;

    return (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg max-w-2xl w-full">
          <h2 className="text-2xl font-semibold text-white">{selectedItem.title}</h2>
          <p className="text-gray-400 mt-2">Found on: {selectedItem.date}</p>
          <p className="text-gray-400 mt-4">Location: {selectedItem.location}</p>
          <p className="text-gray-400 mt-2">Contact: {selectedItem.contact}</p>
          <p className="text-gray-400 mt-2">Category: {selectedItem.category}</p>
          <div className="mt-4">
            <img
              src={selectedItem.imageUrl || "https://via.placeholder.com/150"}
              alt={selectedItem.title}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
          <p className="mt-4 text-white">{selectedItem.description}</p>
          <button
            onClick={() => setSelectedItem(null)} // Close the modal
            className="mt-4 px-4 py-2 bg-blue-500 rounded text-white"
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>You must be logged in to view your items.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h2 className="text-3xl font-bold mb-6 text-center">My Reported Items</h2>
      {items.length === 0 ? (
        <p className="text-center">You have not reported any items yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg shadow-md overflow-hidden transition hover:scale-105 transform cursor-pointer"
              onClick={() => handleCardClick(item)} // On card click, set the selected item
            >
              <img
                src={item.imageUrl || "https://via.placeholder.com/150"}
                alt={item.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                <p className="text-gray-400 text-sm">Found on: {item.date}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {renderModal()} {/* Render the modal when an item is clicked */}
    </div>
  );
};

export default MyItems;
