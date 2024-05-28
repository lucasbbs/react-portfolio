import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import English from './translations/en.json';
import Russian from './translations/ru.json';
import { initialLanguage } from './MainApp';

const resources = {
  en: {
    translation: English,
  },
  ru: {
    translation: Russian,
  },
};

i18next.use(initReactI18next)
  .init({
    resources,
    lng: initialLanguage,
  });

export default i18next;
