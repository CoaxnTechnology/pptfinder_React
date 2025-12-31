import React from "react";
import { useNavigate } from "react-router-dom";

export default function CategoriesGrid({ categories = [] }) {
  const navigate = useNavigate();
  const BaseUrl = "http://127.0.0.1:8000/";

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {categories.map((item, index) => (
        <div
          key={index}
          onClick={() => {
            const keywords = encodeURIComponent(JSON.stringify(item.keywords || []));
            navigate(
              `/search?occupation=${encodeURIComponent(item.occupation)}&keywords=${keywords}`
            );
          }}
          className="bg-white shadow-sm rounded-2xl p-5 border border-gray-100
                     hover:shadow-xl hover:-translate-y-1 transition-transform duration-300
                     cursor-pointer flex flex-col items-center justify-center text-center"
        >
          {/* Thumbnail */}
          <div className="w-20 h-20 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center">
            <img
              src={item.thumb ? BaseUrl + item.thumb : BaseUrl + "default.png"}
              alt={item.occupation}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              onError={(e) => (e.target.src = BaseUrl + "default.png")}
            />
          </div>

          {/* Occupation Name */}
          <h3 className="mt-4 text-sm font-semibold text-gray-900 line-clamp-2">
            {item.occupation}
          </h3>

          {/* Optional: number of keywords */}
          {item.keywords && item.keywords.length > 0 && (
            <p className="mt-1 text-xs text-gray-500">{item.keywords.length} keywords</p>
          )}
        </div>
      ))}
    </div>
  );
}
