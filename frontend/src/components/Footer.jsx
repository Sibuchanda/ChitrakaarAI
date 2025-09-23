import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-200 mt-20">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 py-6 px-4">
        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-gray-900">
          Chitrakaar<span className="text-blue-600">AI</span>
        </h1>

        <p className="text-sm text-gray-500 order-last md:order-none text-center md:text-left">
          © {new Date().getFullYear()} ChitrakaarAI. All rights reserved.
        </p>

        {/* Social Icons */}
        <div className="flex gap-4">
          <a href="#" aria-label="Facebook">
            <img src={assets.facebook_icon} alt="Facebook" className="w-6 h-6 opacity-70 hover:opacity-100 transition" />
          </a>
          <a href="#" aria-label="Twitter">
            <img src={assets.twitter_icon} alt="Twitter" className="w-6 h-6 opacity-70 hover:opacity-100 transition" />
          </a>
          <a href="#" aria-label="Instagram">
            <img src={assets.instagram_icon} alt="Instagram" className="w-6 h-6 opacity-70 hover:opacity-100 transition" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
