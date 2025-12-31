import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaStar } from "react-icons/fa";

import logo from "../assets/images/PPT_Finder_Logo.webp";
import storeLogo from "../assets/images/logo.png";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [favCount, setFavCount] = useState(0);

  /* ================= NAV ITEMS ================= */
  const navItems = [
    { path: "/", label: "Home" },
    { path: "/search", label: "Search" },
    { path: "/categories", label: "Categories" },
    { path: "/contact", label: "Contact" },
    { path: "/privacy-policy", label: "Privacy Policy" }, 
  ];

  /* ================= LOAD FAVORITES ================= */
  const loadFavorites = () => {
    const favs = JSON.parse(localStorage.getItem("ppt_favorites")) || [];
    setFavCount(favs.length);
  };

  useEffect(() => {
    loadFavorites();

    window.addEventListener("storage", loadFavorites);
    window.addEventListener("favoritesUpdated", loadFavorites);

    return () => {
      window.removeEventListener("storage", loadFavorites);
      window.removeEventListener("favoritesUpdated", loadFavorites);
    };
  }, []);

  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="PPTFinder Logo"
              className="w-10 h-10 rounded-md object-cover"
            />
            <span className="font-semibold text-xl">
              <span className="text-primary">PPT</span>Finder
            </span>
          </Link>

          {/* NAV LINKS (DESKTOP) */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-primary font-medium"
                    : "text-gray-700 hover:text-primary"
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-4">
            {/* GOOGLE PLAY BUTTON */}
            <a
              href="https://play.google.com/store/apps/details?id=com.ebook.ppt"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 px-2 py-0.5 mr-2 rounded-lg border border-gray-300 hover:shadow-md transition"
            >
              <img src={storeLogo} alt="Google Play" className="w-6 h-6" />
              <div className="flex flex-col leading-tight">
                <span className="text-[10px] font-semibold text-gray-500">
                  GET IT ON
                </span>
                <span className="text-sm font-bold text-gray-600">
                  Google Play
                </span>
              </div>
            </a>

            {/* FAVORITES */}
            <Link
              to="/favourites"
              className="relative flex items-center text-gray-700 hover:text-primary"
            >
              <FaStar
                className={`text-xl ${favCount > 0 ? "text-red-500" : "text-gray-400"}`}
              />
              {favCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs px-1.5 rounded-full">
                  {favCount > 99 ? "99+" : favCount}
                </span>
              )}
            </Link>

            {/* MOBILE MENU BUTTON */}
            <button
              className="md:hidden p-2 text-gray-700 hover:text-primary"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="flex flex-col space-y-3 px-4 py-4">
            {/* GOOGLE PLAY (MOBILE) */}
            <a
              href="https://play.google.com/store/apps/details?id=com.ebook.ppt"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-2 py-1 rounded-lg border border-gray-300"
            >
              <img src={storeLogo} alt="Google Play" className="w-7 h-7" />
              <div className="flex flex-col">
                <span className="text-[11px] font-semibold text-gray-500">
                  GET IT ON
                </span>
                <span className="text-sm font-bold text-gray-600">
                  Google Play
                </span>
              </div>
            </a>

            {/* NAV LINKS */}
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className="text-gray-700 hover:text-primary text-base"
              >
                {item.label}
              </NavLink>
            ))}

            {/* FAVORITES */}
            <Link
              to="/favourites"
              onClick={() => setMobileOpen(false)}
              className="flex items-center text-gray-700 hover:text-primary gap-2"
            >
              <FaStar
                className={`text-xl ${favCount > 0 ? "text-red-500" : "text-gray-400"}`}
              />
              Favorites ({favCount})
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
