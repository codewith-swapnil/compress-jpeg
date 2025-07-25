import React, { useState } from 'react';
import i18n from 'i18next'; // You'll need i18n here too

function LanguageSelector() {
  const [lang, setLang] = useState(i18n.language || 'en');
  const languages = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' },
    { code: 'zh', label: '中文' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'ar', label: 'العربية' },
    { code: 'fr', label: 'Français' },
    { code: 'ru', label: 'Русский' },
    { code: 'pt', label: 'Português' },
    { code: 'de', label: 'Deutsch' },
    { code: 'ja', label: '日本語' }
  ];
  const handleChange = e => {
    const newLang = e.target.value;
    setLang(newLang);
    i18n.changeLanguage(newLang);
  };
  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        className="bg-white border border-indigo-200 rounded px-3 py-1 text-indigo-700 font-semibold shadow hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        onClick={() => {
          const select = document.getElementById('lang-select');
          if (select) select.focus();
        }}
        aria-label="Choose language"
      >
        🌐 {languages.find(l => l.code === lang)?.label}
      </button>
      <select
        id="lang-select"
        value={lang}
        onChange={handleChange}
        className="absolute top-full mt-2 right-0 bg-white border border-indigo-200 rounded px-3 py-1 text-indigo-700 font-semibold shadow focus:outline-none focus:ring-2 focus:ring-indigo-400"
        style={{ minWidth: 120, display: 'block' }}
        aria-label="Select language"
        tabIndex={0}
      >
        {languages.map(l => (
          <option key={l.code} value={l.code}>{l.label}</option>
        ))}
      </select>
    </div>
  );
}

export default LanguageSelector;