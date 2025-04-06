import React from "react";
import { Link } from "react-router-dom";
import ReportItem from "./ReportItem";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-t from-black to-transparent text-white p-8">
      <div className="max-w-5xl mx-auto text-center">
        {/* Hero Section */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4 mt-40 mb-11">
          Welcome to Amrita's Lost and Found Page
        </h1>
        <p className="text-lg text-gray-400 mb-10">
          Did you lose your valuables or want to report someone else's valuables? <br />
          We're here to help you connect with those items again!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row justify-center gap-6">
          <Link
            to="/report"
            className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-md font-semibold transition text-white"
          >
            Report Lost Item
          </Link>
          <Link
            to="/found"
            className="bg-green-600 hover:bg-green-700 px-8 py-4 rounded-md font-semibold transition text-white"
          >
            View Found Items
          </Link>
        </div>

        {/* Footer Text */}
        <div className="mt-12 text-sm text-gray-500">
          Found something that doesn't belong to you? Help return it to the right person.
        </div>
      </div>
    </div>
  );
};

export default Home;
