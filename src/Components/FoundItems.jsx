import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const categories = ["Electronics", "Wallet", "ID Card", "Books", "Other"];

const FoundItems = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("none");
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      const querySnapshot = await getDocs(collection(db, "found_items"));
      const itemsList = querySnapshot.docs.map((doc) => doc.data());
      setItems(itemsList);
    };

    fetchItems();
  }, []);

  const handleCheckboxChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const filteredItems = items
    .filter((item) =>
      selectedCategories.length === 0 || selectedCategories.includes(item.category)
    )
    .filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "none") return 0;
      return sortOrder === "newest"
        ? new Date(b.date) - new Date(a.date)
        : new Date(a.date) - new Date(b.date);
    });

  const handleCardClick = (item) => {
    setSelectedItem(item);
  };

  const renderModal = () => {
    if (!selectedItem) return null;

    return (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg max-w-2xl w-full">
          <h2 className="text-2xl font-semibold text-white">{selectedItem.title}</h2>
          <p className="text-gray-400 mt-2">Found on: {selectedItem.date}</p>

          {/* New Fields: Location, Contact, Category */}
          <p className="text-gray-400 mt-4">Location: {selectedItem.location}</p>
          <p className="text-gray-400 mt-2">Contact: {selectedItem.contact}</p>
          <p className="text-gray-400 mt-2">Category: {selectedItem.category}</p>

          {/* Created At (timestamp conversion) */}
          <p className="text-gray-400 mt-2">
            Created At: {selectedItem.createdAt?.toDate().toLocaleString()}
          </p>

          {/* Image */}
          <div className="mt-4">
            <img
              src={selectedItem.imageUrl || "https://via.placeholder.com/150"}
              alt={selectedItem.title}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>

          {/* Description */}
          <p className="mt-4 text-white">{selectedItem.description}</p>

          <button
            onClick={() => setSelectedItem(null)}
            className="mt-4 px-4 py-2 bg-blue-500 rounded text-white"
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 md:flex">
      {/* Sidebar Filters */}
      <aside className="md:w-1/4 mb-6 md:mb-0 shadow border-r border-gray-700">
        <h2 className="text-xl font-semibold mb-4">Filter by Category</h2>
        <ul className="space-y-2">
          {categories.map((cat) => (
            <li key={cat} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={cat}
                checked={selectedCategories.includes(cat)}
                onChange={() => handleCheckboxChange(cat)}
                className="accent-blue-500"
              />
              <label htmlFor={cat} className="cursor-pointer">{cat}</label>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="md:w-3/4 md:pl-2">
        {/* Search and Sort */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          {/* Search */}
          <input
            type="text"
            placeholder="Search by title..."
            className="w-full sm:w-1/2 p-2 rounded bg-gray-700 text-white placeholder-gray-400 outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {/* Sort */}
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-full sm:w-1/3 p-2 rounded bg-gray-700 text-white"
          >
            <option value="none">Sort by: None</option>
            <option value="newest">Sort by: Newest First</option>
            <option value="oldest">Sort by: Oldest First</option>
          </select>
        </div>

        {/* Item Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg shadow-md overflow-hidden transition hover:scale-105 transform cursor-pointer"
              onClick={() => handleCardClick(item)} // On click, set the selectedItem
            >
              <img
                src={item.imageUrl || "https://via.placeholder.com/150"} // Fallback to placeholder if no image
                alt={item.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                <p className="text-gray-400 text-sm">Found on: {item.date}</p>
              </div>
            </div>
          ))}

          {filteredItems.length === 0 && (
            <p className="text-gray-400 col-span-full text-center mt-8">
              No items match your search and filter.
            </p>
          )}
        </div>
      </main>
      {renderModal()}
    </div>
  );
};

export default FoundItems;
