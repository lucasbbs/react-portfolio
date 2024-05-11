/* eslint-disable react/prop-types */
import React, {
  createContext,
  useContext,
} from 'react';
import { useTranslation } from 'react-i18next';

export const LanguageContext = createContext(undefined);

export const LanguageContextProvider = ({ children }) => {
  const languages = {
    en: { nativeName: 'English' },
    ru: { nativeName: 'Russian' },
  };

  const { t, i18n } = useTranslation();

  const onClickLanguageChange = (value) => {
    i18n.changeLanguage(value);
  };

  return (
    <LanguageContext.Provider
      value={{
        t, i18n, onClickLanguageChange, languages,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguageContext = () => useContext(LanguageContext);
