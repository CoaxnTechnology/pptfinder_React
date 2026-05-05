import React, { useEffect, useState } from "react";
import Card from "./PPTCard";
import { analytics } from "../firebase";
import { logEvent } from "firebase/analytics";

const BaseUrl = "http://187.77.184.12:8000";

const CardGrid = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch data on mount
  useEffect(() => {
    fetch(`${BaseUrl}/categories`)
      .then((res) => res.json())
      .then((data) => {
        const categoryData = [];

        for (const key in data) {
          if (key === "categories") {
            data.categories.forEach((category) => {
              category.fields.forEach((field) => {
                categoryData.push({
                  title: field.occupation,
                  icon: BaseUrl + field.thumb,
                  keywords: field.keywords,
                });
              });
            });
          } else {
            const keywordsGroup = data[key];
            if (keywordsGroup?.keywords) {
              categoryData.push({
                title: key.charAt(0).toUpperCase() + key.slice(1),
                icon: "./images/general.png",
                keywords: keywordsGroup.keywords,
              });
            }
          }
        }

        setCategories(categoryData);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  // Handle card click
  const handleClick = (title, keywords) => {
    logEvent(analytics, "occupation_selected", { occupation_name: title });
    const encodedKeywords = encodeURIComponent(JSON.stringify(keywords));
    const encodedTitle = encodeURIComponent(title);
    window.location.href = `search.html?occupation=${encodedTitle}&keywords=${encodedKeywords}`;
  };

  // Filtered cards based on search input
  const filteredCategories = categories.filter((cat) =>
    cat.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      {/* Search Box */}
      <div className="mb-6 text-center">
        <input
          type="text"
          placeholder="Search occupation..."
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-primary"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((cat, idx) => (
            <Card
              key={idx}
              iconSrc={cat.icon}
              title={cat.title}
              keywords={cat.keywords}
              onClick={() => handleClick(cat.title, cat.keywords)}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No occupations found.
          </p>
        )}
      </div>
    </div>
  );
};

export default CardGrid;
