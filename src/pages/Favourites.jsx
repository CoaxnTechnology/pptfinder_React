import { useEffect, useState } from "react";
import {
  FaFilePowerpoint,
  FaEye,
  FaTrash,
  FaStar,
  FaTimes,
  FaDownload,
} from "react-icons/fa";

import playStoreBtn from "../assets/images/Google-PlayStore-Download-Button.png";

export default function Favourite() {
  const [favorites, setFavorites] = useState([]);
  const [viewer, setViewer] = useState(null);
  const [toast, setToast] = useState(null);

  /* ================= LOAD FAVORITES ================= */
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("ppt_favorites")) || [];
    const unique = Array.from(
      new Map(stored.map((ppt) => [ppt.link, ppt])).values()
    );
    setFavorites(unique);
  }, []);

  /* ================= REMOVE FAVORITE ================= */
  const removeFavourite = (link) => {
    const updated = favorites.filter((ppt) => ppt.link !== link);
    setFavorites(updated);
    localStorage.setItem("ppt_favorites", JSON.stringify(updated));

    // Notify Navbar about change
    window.dispatchEvent(new Event("favoritesUpdated"));

    // Toast message
    setToast("❌ Removed from favorites");
    setTimeout(() => setToast(null), 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">

      {/* ================= TOAST ================= */}
      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-2 rounded-full shadow z-50">
          {toast}
        </div>
      )}

      {/* ================= MAIN ================= */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 py-6">
        <h2 className="text-3xl font-bold mb-6 text-purple-600">
          Favorite Presentations
        </h2>

        {/* EMPTY STATE */}
        {favorites.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-24 text-gray-500">
            <FaStar className="text-5xl text-orange-400 mb-4" />
            <p className="text-lg">No Favorites Yet</p>
            <p className="text-sm mt-1">
              Start saving PPTs by clicking the star icon ⭐
            </p>
          </div>
        )}

        {/* FAVORITES GRID */}
        {favorites.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favorites.map((ppt, i) => (
              <div
                key={i}
                className="border rounded-xl shadow hover:shadow-lg overflow-hidden"
              >
                <div className="h-40 bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white">
                  <FaFilePowerpoint size={42} />
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-sm mb-3 line-clamp-2">
                    {ppt.title || "Untitled PPT"}
                  </h3>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setViewer(ppt)}
                      className="flex-1 flex items-center justify-center gap-1 bg-gray-100 rounded py-1 hover:bg-gray-200"
                    >
                      <FaEye /> View
                    </button>

                    <a
                      href={ppt.link}
                      download
                      className="flex-1 flex items-center justify-center gap-1 bg-purple-600 text-white rounded py-1 hover:bg-purple-700"
                    >
                      <FaDownload /> Download
                    </a>

                    <button
                      onClick={() => removeFavourite(ppt.link)}
                      className="px-3 border text-red-500 rounded hover:bg-red-50"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ================= APP PROMO ================= */}
        <a
          href="https://play.google.com/store/apps/details?id=com.ebook.ppt&pcampaignid=web_share"
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-14"
        >
          <div className="bg-gradient-to-r from-purple-600 to-indigo-500 rounded-xl text-white text-center p-6 hover:opacity-90 transition cursor-pointer">
            <h3 className="font-bold text-xl mb-2">Download Mobile App</h3>
            <p className="text-white/90 mb-4">
              Get android mobile app from Google PlayStore for free
            </p>
            <img
              src={playStoreBtn}
              alt="Google Play"
              className="w-48 mx-auto"
            />
          </div>
        </a>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="bg-gray-900 text-gray-400 text-sm py-6 text-center">
        © {new Date().getFullYear()} PPT Finder. All rights reserved.
      </footer>

      {/* ================= PPT VIEWER MODAL ================= */}
      {viewer && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col">
          <div className="flex items-center justify-between bg-gray-800 text-white px-4 py-3">
            <span className="font-bold">
              {viewer.title || "PPT Viewer"}
            </span>
            <button onClick={() => setViewer(null)}>
              <FaTimes />
            </button>
          </div>

          <iframe
            title="PPT Viewer"
            src={`https://docs.google.com/gview?url=${encodeURIComponent(
              viewer.link
            )}&embedded=true`}
            className="w-full h-full bg-white"
          />
        </div>
      )}
    </div>
  );
}
