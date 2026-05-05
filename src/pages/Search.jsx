import React, { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import PPTCard from "../components/PPTCard";
import PPTViewer from "../components/PPTViewer";

const API_URL = "https://api.pptfinders.com";

/* ================= GOOGLE AD ================= */
function GoogleAd({ adClient, adSlot, className }) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <ins
      className={`adsbygoogle ${className || ""}`}
      style={{ display: "block" }}
      data-ad-client={adClient}
      data-ad-slot={adSlot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}

export default function Search() {
  const viewerRef = useRef(null);
  const [params, setParams] = useSearchParams();

  const [query, setQuery] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  /* ================= INIT ================= */
  useEffect(() => {
    const list = [
      "Leadership",
      "Time Management",
      "Communication Skills",
      "Teamwork",
      "Critical Thinking",
      "Project Management",
      "Problem Solving",
      "Creativity",
      "Innovation",
      "Negotiation",
    ];
    setKeywords(list);

    const urlKeyword = params.get("keyword") || "Health";
    setQuery(urlKeyword);
    handleSearch(urlKeyword);
  }, []);

  /* ================= SEARCH ================= */
  const autoSearch = (keyword) => {
    setQuery(keyword);
    setParams({ keyword });
    handleSearch(keyword);
  };

  const handleSearch = async (term = query) => {
    if (!term.trim()) return;

    setLoading(true);
    setErrorMsg("");
    setResults([]);

    try {
      const res = await fetch(
        `${API_URL}/check_keyword?keyword=${encodeURIComponent(term)}`,
      );
      if (!res.ok) throw new Error("API error");

      const data = await res.json();
      const items = data.object || [];

      setResults(
        items.map((item, i) => ({
          id: i,
          title: item.title || "Untitled PPT",
          desc: item.description || item.snippet,
          thumbnail: item.thumbnail || null,
          link: item.link,
        })),
      );
    } catch (err) {
      setErrorMsg("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  const openPPT = (item) => {
    viewerRef.current?.openViewer(item.link, item.title);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ================= PPT VIEWER ================= */}
      <PPTViewer ref={viewerRef} />

      {/* ================= HERO ================= */}
      <section
        className="relative border-b"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,.65), rgba(0,0,0,.65)), url('/src/assets/images/searchbg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <h1 className="font-extrabold text-4xl sm:text-5xl mb-4 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
            Discover & Download PPTs
          </h1>

          <p className="text-white text-base sm:text-xl mb-6">
            Find the perfect presentation from our extensive library
          </p>

          {/* ✅ KEYWORD TAGS (LIKE SCREENSHOT 2) */}
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto mb-8">
            {keywords.map((k) => (
              <button
                key={k}
                onClick={() => autoSearch(k)}
                className="
                  bg-purple-400 
                  hover:bg-purple-500 
                  text-white 
                  px-5 
                  py-2 
                  rounded-xl 
                  text-sm 
                  font-medium 
                  transition
                "
              >
                {k}
              </button>
            ))}
          </div>

          {/* SEARCH BAR */}
          <div className="max-w-3xl mx-auto">
            <div className="flex rounded-md overflow-hidden shadow-xl border border-white/20">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && autoSearch(query)}
                placeholder="Search for presentations..."
                className="flex-grow px-4 py-4 bg-black/40 text-white placeholder-gray-200 outline-none"
              />
              <button
                onClick={() => autoSearch(query)}
                className="bg-gradient-to-r from-purple-600 to-blue-500 px-6 py-4 text-white flex items-center gap-2 hover:opacity-90"
              >
                <FaSearch />
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= RESULTS ================= */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
          Popular Presentations
        </h2>

        {/* AD */}
        <div className="mb-6">
          <GoogleAd
            adClient="ca-pub-XXXXXXXXXXXX"
            adSlot="YYYYYYYYYYYY"
            className="w-full"
          />
        </div>

        {errorMsg && (
          <p className="text-red-600 mb-4 text-center">{errorMsg}</p>
        )}

        {loading && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-64 bg-gray-200 rounded-xl animate-pulse"
              />
            ))}
          </div>
        )}

        {!loading && results.length === 0 && (
          <p className="text-center text-gray-500">No presentations found.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {results.map((item) => (
            <PPTCard key={item.id} item={item} onView={() => openPPT(item)} />
          ))}
        </div>
      </section>
    </div>
  );
}
