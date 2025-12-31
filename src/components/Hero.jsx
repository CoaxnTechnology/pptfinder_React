import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Hero() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <section className="bg-gradient-to-br from-blue-700 via-indigo-600 to-cyan-500 text-white py-20 relative overflow-hidden">

      {/* Soft Glow Background */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 blur-3xl rounded-full animate-pulse-slow" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-300/20 blur-3xl rounded-full animate-pulse-slow" />

      <div className="relative max-w-5xl mx-auto px-6 text-center md:text-left">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight drop-shadow-lg"
        >
          Download <span className="text-yellow-300">High-Quality PPTs</span> <br />
          in One Click
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="mt-6 text-lg md:text-xl text-white/90 max-w-2xl mx-auto md:mx-0"
        >
          PPTFinder provides instant access to thousands of professional presentation templates — business, education, marketing, project reports, creatives, and more.
        </motion.p>

        {/* Search Form */}
        <motion.form
          onSubmit={handleSearch}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mt-8 flex flex-col md:flex-row items-center gap-3 max-w-2xl mx-auto md:mx-0"
        >
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search templates — e.g. 'Business Pitch', 'AI Presentation'"
            className="flex-1 rounded-2xl px-6 py-4 text-gray-900 shadow-lg border border-white/30 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
          />
          <button
            type="submit"
            className="bg-yellow-400 text-black rounded-2xl px-8 py-4 font-semibold shadow-lg hover:bg-yellow-300 transition"
          >
            Search
          </button>
        </motion.form>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.7 }}
          className="mt-6 flex justify-center md:justify-start"
        >
          <Link
            to="/categories"
            className="px-8 py-3 border border-white/40 rounded-2xl font-semibold hover:bg-white/10 transition"
          >
            Browse Categories
          </Link>
        </motion.div>

        {/* Trust Badges */}
        <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-4 text-sm opacity-90">
          {["10,000+ Templates", "Daily Updated", "Free Access"].map((item) => (
            <span
              key={item}
              className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
