import React from "react";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold">Welcome to Lost & Found</h1>
      <p className="mt-2 text-gray-400">Helping people find their lost items easily.</p>
      <a href="/signup" className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
        Get Started
      </a>
    </div>
  );
};

export default Home;
