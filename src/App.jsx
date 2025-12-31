import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

/* Pages */
import Home from "./pages/Home";
import Search from "./pages/Search";
import Categories from "./pages/Categories";
import Contact from "./pages/Contact";
import Favourites from "./pages/Favourites";
import PrivacyPolicy from "./pages/PrivacyPolicy";


function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Toast Notifications */}
      <Toaster position="top-center" reverseOrder={false} />

      {/* Global Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1">
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/favourites" element={<Favourites />} />

          {/* FALLBACK */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}

export default App;
