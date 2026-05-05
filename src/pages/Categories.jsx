import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import placeholder from "../assets/placeholder.png";
import generalThumb from "../assets/images/general.png";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const BaseUrl = "http://187.77.184.12:8000";
  console.log("Base URL:", BaseUrl);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${BaseUrl}/categories`)
      .then((res) => res.json())
      .then((data) => {
        const finalList = [];

        if (Array.isArray(data.categories)) {
          data.categories.forEach((cat) => {
            if (Array.isArray(cat.fields)) {
              cat.fields.forEach((field) => {
                finalList.push({
                  occupation: field.occupation,
                  thumb: field.thumb
                    ? `${BaseUrl}/static/${field.thumb}`
                    : placeholder,
                  keywords: field.keywords || [],
                });
              });
            }
          });
        }

        if (data.general && Array.isArray(data.general.keywords)) {
          finalList.push({
            occupation: "General",
            thumb: generalThumb,
            keywords: data.general.keywords,
          });
        }

        setCategories(finalList);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleClick = (occupation, keywords) => {
    navigate(
      `/search?occupation=${encodeURIComponent(
        occupation,
      )}&keywords=${encodeURIComponent(JSON.stringify(keywords))}`,
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <div className="bg-white py-14 shadow-sm border-b">
        <h1 className="text-center text-4xl font-extrabold text-gray-800 tracking-tight">
          Explore Categories
        </h1>
        <p className="text-center text-gray-500 mt-3 text-lg">
          Browse and select your preferred PPT category
        </p>
      </div>

      {/* CATEGORY GRID */}
      <div className="max-w-7xl mx-auto px-4 py-14">
        {loading ? (
          <div className="text-center text-gray-500 text-lg py-20">
            Loading categories...
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {categories.map((cat, idx) => (
              <div
                key={idx}
                onClick={() => handleClick(cat.occupation, cat.keywords)}
                className="bg-white border border-gray-100 rounded-2xl p-6 
                shadow-sm hover:shadow-lg hover:-translate-y-1 hover:scale-[1.03] 
                transition-all cursor-pointer flex flex-col items-center"
              >
                <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden shadow-inner">
                  <img
                    src={cat.thumb}
                    alt={cat.occupation}
                    className="w-14 h-14 object-contain opacity-90 group-hover:opacity-100 transition"
                    onError={(e) => (e.target.src = placeholder)}
                  />
                </div>

                <h3 className="mt-4 text-[15px] font-semibold text-gray-800 text-center leading-snug">
                  {cat.occupation}
                </h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
