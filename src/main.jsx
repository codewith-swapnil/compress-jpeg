import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import i18n from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';

// Import translations (example for 5 languages, add more as needed)
import en from './locales/en.json';
import es from './locales/es.json';
import zh from './locales/zh.json';
import hi from './locales/hi.json';
import ar from './locales/ar.json';
import fr from './locales/fr.json';
import ru from './locales/ru.json';
import pt from './locales/pt.json';
import de from './locales/de.json';
import ja from './locales/ja.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
      zh: { translation: zh },
      hi: { translation: hi },
      ar: { translation: ar },
      fr: { translation: fr },
      ru: { translation: ru },
      pt: { translation: pt },
      de: { translation: de },
      ja: { translation: ja }
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

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

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <LanguageSelector />
      <App />
    </I18nextProvider>
  </React.StrictMode>
);
