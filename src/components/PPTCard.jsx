import React, { useEffect, useState } from "react";
import { FaEye, FaDownload, FaStar, FaRegStar } from "react-icons/fa";

const STORAGE_KEY = "ppt_favorites";
const FALLBACK_IMG = "/src/assets/images/ppt-placeholder.png";

export default function PPTCard({ item, onView }) {
  const [favorite, setFavorite] = useState(false);

  const description =
    item.desc || item.description || item.snippet || "PowerPoint presentation";

  const previewUrl = `https://docs.google.com/gview?url=${encodeURIComponent(
    item.link
  )}&embedded=true`;

  /* ===== INIT FAVORITE ===== */
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    setFavorite(stored.some((f) => f.link === item.link));
  }, [item.link]);

  /* ===== TOGGLE FAVORITE ===== */
  const toggleFavorite = (e) => {
    e.stopPropagation();
    let stored = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    if (favorite) {
      stored = stored.filter((f) => f.link !== item.link);
    } else {
      stored.push({
        title: item.title,
        link: item.link,
        desc: description,
      });
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    setFavorite(!favorite);

    window.dispatchEvent(new Event("favoritesUpdated"));
  };

  return (
    <div
      onClick={onView}
      className="group bg-white rounded-2xl border shadow hover:shadow-xl transition cursor-pointer overflow-hidden flex flex-col"
    >
      {/* ================= IMAGE ================= */}
      <div className="relative aspect-[4/3] bg-gray-100">
        <iframe
          title={item.title}
          src={previewUrl}
          className="absolute inset-0 w-full h-full scale-[1.15]"
          style={{ pointerEvents: "none" }}
        />

        {/* ⭐ FAVORITE STAR */}
<button
  onClick={toggleFavorite}
  className="
    absolute top-3 right-3 z-10
    w-9 h-9 rounded-full
    bg-white
    border border-gray-300
    flex items-center justify-center
    shadow-sm
    hover:scale-110 hover:border-purple-500
    transition
  "
>
  {favorite ? (
    <FaStar className="text-purple-600 text-lg" />
  ) : (
    <FaRegStar className="text-gray-500 text-lg" />
  )}
</button>

      </div>

      {/* ================= CONTENT ================= */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-sm line-clamp-2">
          {item.title || "Untitled Presentation"}
        </h3>

        <p className="text-xs text-gray-500 mt-1 line-clamp-3">
          {description}
        </p>

        <div className="flex-1" />

        {/* ================= ACTIONS ================= */}
        <div className="flex gap-3 pt-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onView();
            }}
            className="flex-1 bg-purple-600 hover:bg-purple-700
                       text-white text-xs py-2 rounded-xl
                       flex items-center justify-center gap-2"
          >
            <FaEye size={13} /> View
          </button>

          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 border border-purple-600 text-purple-600
                       hover:bg-purple-50 text-xs py-2 rounded-xl
                       flex items-center justify-center gap-2"
          >
            <FaDownload size={13} /> Download
          </a>
        </div>
      </div>
    </div>
  );
}
