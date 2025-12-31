import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
} from "react";
import { FaTimes, FaStar, FaRegStar, FaDownload } from "react-icons/fa";

const STORAGE_KEY = "ppt_favorites";

// Google Ad Component
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

const PPTViewer = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [favorite, setFavorite] = useState(false);
  const [toast, setToast] = useState("");

  useImperativeHandle(ref, () => ({
    openViewer: (pptUrl, pptTitle = "PPT Viewer") => {
      setUrl(pptUrl);
      setTitle(pptTitle);
      setOpen(true);
      document.body.style.overflow = "hidden";
    },
  }));

  /* Load favorite state when viewer opens */
  useEffect(() => {
    if (!url) return;
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    setFavorite(stored.some((f) => f.link === url));
  }, [url]);

  const closeViewer = () => {
    setOpen(false);
    document.body.style.overflow = "auto";
  };

  /* Toggle favorite */
  const toggleFavorite = () => {
    let stored = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    let msg = "";

    if (favorite) {
      stored = stored.filter((f) => f.link !== url);
      msg = "❌ Removed from favorites";
    } else {
      stored.push({ title, link: url });
      msg = "⭐ Added to favorites";
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    setFavorite(!favorite);

    // Trigger header update
    window.dispatchEvent(new Event("favoritesUpdated"));

    setToast(msg);
    setTimeout(() => setToast(""), 2000);
  };

  /* ESC key support */
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") closeViewer();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex flex-col">

      {/* TOAST */}
      {toast && (
        <div className="absolute top-5 left-1/2 -translate-x-1/2 bg-black text-white text-sm px-4 py-2 rounded-full shadow z-50">
          {toast}
        </div>
      )}

      {/* HEADER */}
      <header className="bg-gray-900 text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={closeViewer} className="hover:text-red-400 transition">
            <FaTimes size={18} />
          </button>
          <span className="font-semibold">
            PPT <span className="text-purple-400">Viewer</span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* FAVORITE */}
          <button
            onClick={toggleFavorite}
            className="rounded-full w-9 h-9 flex items-center justify-center hover:bg-white/10 transition"
          >
            {favorite ? <FaStar className="text-yellow-400" /> : <FaRegStar className="text-gray-300" />}
          </button>

          {/* DOWNLOAD */}
          <a
            href={url}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="bg-violet-500 hover:bg-violet-700 text-white px-4 py-1.5 rounded-lg flex items-center gap-2 transition"
          >
            <FaDownload size={14} />
            Download
          </a>
        </div>
      </header>

      {/* GOOGLE AD AT TOP */}
      <div className="bg-white w-full px-2 py-2">
        <GoogleAd
          adClient="ca-pub-XXXXXXXXXXXXXX" // Replace with your AdSense client ID
          adSlot="YYYYYYYYYYYY"           // Replace with your Ad unit ID
        />
      </div>

      {/* BODY */}
      <div className="flex flex-1 overflow-hidden">
        {/* LEFT MINI SLIDE */}
        <div className="hidden md:block w-1/5 bg-gray-900 p-2">
          <div className="scale-[0.5] origin-top-left w-[200%] h-[200%]">
            <iframe
              title="Mini Slide"
              src={`https://docs.google.com/gview?url=${encodeURIComponent(url)}&embedded=true`}
              className="w-full h-full border-0"
            />
          </div>
        </div>

        {/* MAIN VIEWER */}
        <div className="flex-1 bg-white">
          <iframe
            title={title}
            src={`https://docs.google.com/gview?url=${encodeURIComponent(url)}&embedded=true`}
            className="w-full h-full border-0"
          />
        </div>
      </div>
    </div>
  );
});

export default PPTViewer;
