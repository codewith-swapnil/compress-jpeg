import React from 'react'; // No need for useState here anymore
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import i18n from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';

// Import translations
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

// Import the LanguageSelector component
import LanguageSelector from './LanguageSelector'; // <--- NEW IMPORT

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

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <LanguageSelector />
      <App />
    </I18nextProvider>
  </React.StrictMode>
);