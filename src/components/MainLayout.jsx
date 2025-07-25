import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';

export default function MainLayout({ children }) {
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="relative">
        <nav className="w-full bg-gradient-to-r from-blue-800 via-indigo-700 to-purple-600 py-4 px-6 text-white text-center shadow-lg flex justify-between items-center sticky top-0 z-40 backdrop-blur-md bg-opacity-90">
          <Link to="/" className="font-extrabold tracking-wide text-2xl md:text-3xl flex items-center gap-2" onClick={closeMobileMenu}>
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

          {/* Desktop Navigation Links */}
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
            <div className="relative">
              <LanguageSelector />
            </div>
          </div>

          {/* Mobile Menu Button (Hamburger Icon) */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="text-white focus:outline-none focus:ring-2 focus:ring-white p-2 rounded-md"
              aria-label="Toggle navigation menu"
            >
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  ></path>
                )}
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 bg-black bg-opacity-70 z-30 flex justify-end" onClick={closeMobileMenu}>
            <div className="w-full max-w-xs bg-white text-slate-800 shadow-lg py-6 px-4 flex flex-col items-start gap-4 animate-slide-in-right relative" onClick={(e) => e.stopPropagation()}>
              {/* Close Button inside mobile menu */}
              <button
                onClick={closeMobileMenu}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 p-2 rounded-md"
                aria-label="Close navigation menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>

              {/* Mobile Menu Links */}
              <div className="mt-8 w-full"> {/* Added margin top to prevent overlap with close button */}
                <Link
                  to="/privacy-policy"
                  className="block w-full text-left py-3 px-4 rounded-lg hover:bg-indigo-100 transition-colors duration-200 text-lg font-medium"
                  onClick={closeMobileMenu}
                >
                  {t("privacy_policy", "Privacy")}
                </Link>
                <Link
                  to="/terms"
                  className="block w-full text-left py-3 px-4 rounded-lg hover:bg-indigo-100 transition-colors duration-200 text-lg font-medium"
                  onClick={closeMobileMenu}
                >
                  {t("terms", "Terms")}
                </Link>
                <Link
                  to="/contact"
                  className="block w-full text-left py-3 px-4 rounded-lg hover:bg-indigo-100 transition-colors duration-200 text-lg font-medium"
                  onClick={closeMobileMenu}
                >
                  {t("contact", "Contact")}
                </Link>
              </div>
              <div className="w-full mt-4">
                <LanguageSelector />
              </div>
            </div>
          </div>
        )}
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
