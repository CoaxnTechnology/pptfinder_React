import { useEffect, useState } from "react";

export default function PrivacyPolicy() {
  const [favoriteCount, setFavoriteCount] = useState(0);

  useEffect(() => {
    // Favorite badge logic (if needed elsewhere)
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavoriteCount(favorites.length);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* MAIN CONTENT */}
      <main className="flex-1 container mx-auto px-6 py-16 max-w-4xl">
        {/* PAGE HEADER */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-3">
            Privacy <span className="text-purple-600">Policy</span>
          </h1>
          <p className="text-gray-500 text-lg">
            Last updated: March 28, 2025
          </p>
        </div>

        {/* PRIVACY SECTIONS */}
        <Section title="Introduction">
          Welcome to the privacy policy for the <strong>PPT Finder</strong>{" "}
          mobile application, developed by CoAxn Technology. We value your
          privacy and aim to be transparent about how your data is used.
        </Section>

        <Section title="Information We Collect">
          We may collect device identifiers, approximate location (via ads),
          app activity, and search queries stored locally on your device. This
          information helps us improve the app and deliver relevant content.
        </Section>

        <Section title="How We Use Information">
          Information is used for app functionality, advertising, analytics,
          and personalization via third-party ad partners. We never sell your
          personal data to external parties.
        </Section>

        <Section title="Data Security">
          Data transmitted off-device is encrypted using industry-standard
          protocols. Search history and preferences remain locally on your
          device to ensure privacy.
        </Section>

        <Section title="Contact Us">
          If you have questions or concerns about this Privacy Policy, please
          contact us at{" "}
          <a
            href="mailto:coaxntechnology@gmail.com"
            className="text-purple-600 font-medium hover:underline"
          >
            coaxntechnology@gmail.com
          </a>
          .
        </Section>

        {/* THANK YOU NOTE */}
        <div className="text-center mt-16">
          <p className="text-gray-700 font-semibold mb-2">Thank you for using</p>
          <h2 className="text-2xl font-bold text-gray-900">
            PPT<span className="text-purple-600">Finder</span>
          </h2>
        </div>
      </main>

     
    </div>
  );
}

/* Reusable Section Component */
function Section({ title, children }) {
  return (
    <section className="mb-10">
      <h2 className="text-2xl font-semibold text-gray-900 mb-3">{title}</h2>
      <p className="text-gray-600 leading-relaxed">{children}</p>
    </section>
  );
}
