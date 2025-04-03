import React, { useState } from "react";


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

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, log form data
    console.log("Form submitted:", formData);
    alert("Item submitted successfully!");
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
            className="w-full bg-blue-600 hover:bg-blue-700 py-3 font-semibold rounded transition"
          >
            Submit Report
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportItem;
