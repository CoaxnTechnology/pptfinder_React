import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import PPTLogo from "../assets/images/PPT_Finder_Logo.webp";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 pt-16 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* Logo + Description */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <img
              src={PPTLogo}
              alt="PPT Finder Logo"
              className="w-12 h-12 rounded-lg border-2 border-indigo-500"
            />
            <span className="text-white font-bold text-xl">
              PPT<span className="text-indigo-500">Finder</span>
            </span>
          </div>

          <p className="text-sm leading-relaxed">
            Find and download high-quality presentation templates for business,
            education, medical, and professional use.
          </p>

          {/* Socials */}
          <div className="flex gap-4 mt-2">
            <SocialIcon icon={<FaFacebookF />} />
            <SocialIcon icon={<FaTwitter />} />
            <SocialIcon icon={<FaInstagram />} />
            <SocialIcon icon={<FaLinkedinIn />} />
          </div>
        </div>

        {/* Search */}
        <FooterColumn title="Search">
          <FooterLink to="/search?category=Business">Business Templates</FooterLink>
          <FooterLink to="/search?category=Education">Education Templates</FooterLink>
          <FooterLink to="/search?category=Medical">Medical Templates</FooterLink>
          <FooterLink to="/search?category=Engineering">Engineering Templates</FooterLink>
          <FooterLink to="/search?category=Marketing">Marketing Templates</FooterLink>
        </FooterColumn>

        {/* Links */}
        <FooterColumn title="Links">
          <FooterLink to="/">Home</FooterLink>
          <FooterLink to="/search">Search</FooterLink>
          <FooterLink to="/categories">Categories</FooterLink>
          <FooterLink to="/contact">Contact</FooterLink>
          <FooterLink to="/privacy-policy">Privacy Policy</FooterLink>
          <FooterLink to="/terms">Terms of Service</FooterLink>
        </FooterColumn>

        {/* Contact */}
        <FooterColumn title="Contact Us">
          <p className="text-sm">📧 info@coaxn.com</p>
          <p className="text-sm mt-1">📞 +91 90161 26810</p>
          <p className="text-sm mt-2 leading-relaxed">
            T62, Almukam Complex, Vishala Circle, <br />
            Near APMC Market, Ahmedabad – 380055, Gujarat, INDIA
          </p>
        </FooterColumn>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800 mt-12 py-6 px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between text-sm">
        <span>
          © {new Date().getFullYear()} PPT Finder. All rights reserved.
        </span>

        <div className="flex gap-6 mt-3 md:mt-0">
          <Link
            to="/privacy-policy"
            className="hover:text-white transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            to="/sitemap"
            className="hover:text-white transition-colors"
          >
            Sitemap
          </Link>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Reusable Components ---------- */

function FooterColumn({ title, children }) {
  return (
    <div>
      <h4 className="text-white font-semibold mb-4">{title}</h4>
      <ul className="flex flex-col gap-2">{children}</ul>
    </div>
  );
}

function FooterLink({ to, children }) {
  return (
    <li>
      <Link
        to={to}
        className="text-sm hover:text-indigo-400 transition-colors"
      >
        {children}
      </Link>
    </li>
  );
}

function SocialIcon({ icon }) {
  return (
    <a
      href="#"
      className="p-2 rounded-full bg-gray-900 hover:bg-indigo-500 hover:text-white transition-all"
    >
      {icon}
    </a>
  );
}
