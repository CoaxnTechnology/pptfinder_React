import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("ppt_favorites")) || [];
    setFavoriteCount(favs.length);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Categories", path: "/categories" },
    { name: "Search", path: "/search" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center">
            <img
              src="/images/PPT_Finder_Logo.webp"
              alt="PPT Finder Logo"
              className="w-10 h-10 mr-2 rounded-lg border-2 border-indigo-500"
            />
            <span className="text-gray-900 text-xl font-bold">
              PPT<span className="text-indigo-500">Finder</span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`font-medium px-2 py-1 border-b-2 transition-colors ${
                location.pathname === item.path
                  ? "border-indigo-500 text-gray-900"
                  : "border-transparent text-gray-700 hover:border-indigo-500 hover:text-gray-900"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Favorites + Mobile Menu Toggle */}
        <div className="flex items-center space-x-4">
          <Link to="/favorites" className="relative text-gray-700 hover:text-indigo-500">
            <FaHeart className="h-5 w-5" />
            {favoriteCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {favoriteCount > 99 ? "99+" : favoriteCount}
              </span>
            )}
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-700 hover:text-indigo-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-2 shadow-sm">
          <nav className="flex flex-col space-y-2 py-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`font-medium py-2 px-3 rounded-md transition-colors ${
                  location.pathname === item.path
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
