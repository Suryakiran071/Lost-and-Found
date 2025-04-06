import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import ReportItem from "./components/ReportItem";
import FoundItems from "./components/FoundItems";
import MyItems from "./components/MyItems";

function App() {
  return (
    <Router>
      <div className="bg-gray-900 text-white min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/report" element={<ReportItem />} />
          <Route path="/found" element={<FoundItems />} />
          <Route path="/my-items" element={<MyItems />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
