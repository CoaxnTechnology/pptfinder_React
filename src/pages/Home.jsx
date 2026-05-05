import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import PPTCard from "../components/PPTCard";
import placeholder from "../assets/placeholder.png";
import generalThumb from "../assets/images/general.png";

const samplePpts = [
  {
    id: "1",
    title: "Marketing Plan 2025",
    desc: "A modern marketing plan deck with data visualizations.",
    thumb: placeholder,
    premium: false,
  },
  {
    id: "2",
    title: "Investor Pitch",
    desc: "Startup pitch deck template.",
    thumb: placeholder,
    premium: true,
  },
  {
    id: "3",
    title: "Education Template",
    desc: "Lesson plan slides and handouts.",
    thumb: placeholder,
    premium: false,
  },
];

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const BaseUrl = "http://187.77.184.12:8000";
  console.log("Base URL:", BaseUrl);

  const flattenCategories = (data) => {
    if (!data) return [];
    const finalList = [];

    if (Array.isArray(data.categories)) {
      data.categories.forEach((cat) => {
        if (Array.isArray(cat.fields) && cat.fields.length > 0) {
          cat.fields.forEach((f) => {
            finalList.push({
              category: cat.category,
              occupation: f.occupation,
              keywords: f.keywords || [],
              thumb: f.thumb ? `${BaseUrl}/static/${f.thumb}` : placeholder,
            });
          });
        }
      });
    }

    if (data.general && Array.isArray(data.general.keywords)) {
      finalList.push({
        category: "General",
        occupation: "General",
        keywords: data.general.keywords,
        thumb: generalThumb,
      });
    }

    return finalList;
  };

  useEffect(() => {
    fetch(`${BaseUrl}/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(flattenCategories(data)))
      .catch((err) => console.error("Error loading categories:", err))
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
      {/* HERO SECTION */}
      <Hero />

      {/* ---- MATCHED UI LIKE CATEGORIES.JSX ---- */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Popular Categories
        </h2>

        {loading ? (
          <div className="text-center text-gray-500 py-20">
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
                {/* Icon Container */}
                <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden shadow-inner">
                  <img
                    src={cat.thumb}
                    alt={cat.occupation}
                    className="w-14 h-14 object-contain opacity-90 group-hover:opacity-100 transition"
                    onError={(e) => (e.target.src = placeholder)}
                  />
                </div>

                {/* Title */}
                <h3 className="mt-4 text-[15px] font-semibold text-gray-800 text-center leading-snug">
                  {cat.occupation}
                </h3>
              </div>
            ))}
          </div>
        )}
      </section>

      {/*  {/* TRENDING SECTION 
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Trending Presentations</h2>
          <a href="/search" className="text-sm text-blue-600 hover:underline">
            See all
          </a>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {samplePpts.map((p) => (
            <PPTCard key={p.id} item={p} />
          ))}
        </div>
      </section>
    */}
    </div>
  );
}
