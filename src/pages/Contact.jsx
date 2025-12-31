import React from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-3xl mx-auto flex flex-col gap-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center">Contact Us</h2>
        <p className="text-gray-600 text-center">
          Have a question or want to work with us? Reach out using the contact information below.
        </p>

        <div className="flex flex-col gap-6 text-gray-700 text-lg">
          <div className="flex items-start gap-3">
            <FaMapMarkerAlt className="text-indigo-500 mt-1" />
            <span>
              T62, Almukam Complex, Vishala Circle, Ahmedabad – 380055, Gujarat, INDIA
            </span>
          </div>
          <div className="flex items-center gap-3">
            <FaPhoneAlt className="text-indigo-500" />
            <span>+91 90161 26810</span>
          </div>
          <div className="flex items-center gap-3">
            <FaEnvelope className="text-indigo-500" />
            <span>info@coaxn.com</span>
          </div>
        </div>
      </div>
    </div>
  );
}
