import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      welcome: "Welcome",
      // Add more translation keys and values here
    }
  },
  es: {
    translation: {
      welcome: "Bienvenido",
      // Add more translation keys and values here
    }
  },
  fr: {
    translation: {
      welcome: "Bienvenue",
      // Add more translation keys and values here
    }
  },
  de: {
    translation: {
      welcome: "Willkommen",
      // Add more translation keys and values here
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
