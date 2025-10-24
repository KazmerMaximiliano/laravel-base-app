import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import en from "./translations/en";
import es from "./translations/es";

const detectionOptions = {
  order: [
    'querystring',    // ?lng=en
    'cookie',         // Cookie
    'localStorage',   // localStorage
    'sessionStorage', // sessionStorage
    'navigator',      // Browser language
    'htmlTag',        // HTML lang attribute
    'path',          // Path segment (/en/page)
    'subdomain'      // Subdomain (en.example.com)
  ],

  lookupQuerystring: 'lng',
  lookupCookie: 'i18next',
  lookupLocalStorage: 'i18nextLng',
  lookupSessionStorage: 'i18nextLng',
  lookupFromPathIndex: 0,
  lookupFromSubdomainIndex: 0,

  caches: ['localStorage', 'cookie'],

  cookieMinutes: 10080,
  cookieDomain: 'myDomain',

  htmlTag: document.documentElement,

  checkWhitelist: true
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['en', 'es'],

    fallbackLng: "en",

    detection: detectionOptions,

    resources: {
      en: en,
      es: es
    },

    interpolation: {
      escapeValue: false
    },

    // React specific options
    react: {
      useSuspense: false
    }
  });

export default i18n;
