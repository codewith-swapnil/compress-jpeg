import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';

export default function MainLayout({ children }) {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="relative"> {/* Added relative positioning */}
        <nav className="w-full bg-gradient-to-r from-blue-800 via-indigo-700 to-purple-600 py-4 px-6 text-white text-center shadow-lg flex justify-between items-center sticky top-0 z-40 backdrop-blur-md bg-opacity-90">
          <Link to="/" className="font-extrabold tracking-wide text-2xl md:text-3xl flex items-center gap-2">
            <svg
              className="w-8 h-8 md:w-9 md:h-9 text-purple-200 inline-block drop-shadow-md"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M12 20h9"></path>
              <path d="M12 4v16m0 0H3m9 0a9 9 0 1 0 0-18 9 9 0 0 0 0 18z"></path>
            </svg>
            {t("title", { defaultValue: "SwiftCompress" })}
          </Link>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-4">
              <Link 
                to="/privacy-policy" 
                className="text-white hover:bg-white/20 font-semibold px-3 py-1 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white text-sm"
              >
                {t("privacy_policy", "Privacy")}
              </Link>
              <Link 
                to="/terms" 
                className="text-white hover:bg-white/20 font-semibold px-3 py-1 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white text-sm"
              >
                {t("terms", "Terms")}
              </Link>
              <Link 
                to="/contact" 
                className="text-white hover:bg-white/20 font-semibold px-3 py-1 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white text-sm"
              >
                {t("contact", "Contact")}
              </Link>
            </div>
            <div className="relative">
              <LanguageSelector />
            </div>
          </div>
        </nav>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="w-full text-center text-sm text-gray-500 pb-8 mt-12 border-t border-gray-200 pt-6">
        &copy; {new Date().getFullYear()} SwiftCompress. {t("all_rights_reserved", "All rights reserved.")} |{" "}
        <Link to="/privacy-policy" className="text-indigo-600 hover:underline">
          {t("privacy_policy", "Privacy Policy")}
        </Link> |{" "}
        <Link to="/terms" className="text-indigo-600 hover:underline">
          {t("terms_of_service", "Terms of Service")}
        </Link> |{" "}
        <Link to="/contact" className="text-indigo-600 hover:underline">
          {t("contact_us", "Contact Us")}
        </Link>
      </footer>
    </div>
  );
}