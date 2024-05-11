import React, { useRef, useState } from 'react';

import styles from './styles.module.css';
import { initialLanguage } from '../../MainApp';


const flags = {
  ru: {
    name: "ru",
  },
  en: {
    name: "en",
  },
  pt: {
    name: "pt",
  },
  fr: {
    name: "fr",
  },
};


const LanguagePicker = ({
  current = initialLanguage,
  available = [],
  direction = 'down',
  colDirection = ['up', 'down'].indexOf(direction) !== -1 ? 'right' : 'down',
  rows,
  onChange = () => {},
  onChangeEnd = () => {}
}) => {
  const pickerRef = useRef();
  const [language, setLanguage] = useState(current);

  const [style, setStyle] = useState({});

  const toggleLanguagePicker = () => {
    pickerRef.current.classList.toggle(styles.isActive);
    pickerRef.current.dataset.active = pickerRef.current.classList.contains(
      styles.isActive
    );
  };

  const handleChangeLanguage = (lang) => {
    onChange(lang);
    setLanguage(lang);
    setTimeout(() => {
      onChangeEnd(lang);
    }, 300);
  };

  const generateAvailableLanguages = () =>
    available
      // .filter((lang) => lang !== current)
      .map((lang) => (
        <div
          key={`lang-selector-${lang}`}
          className={`language-picker__container ${styles.container}`}
          style={{
            zIndex: language === lang ? 2 : ''
          }}
        >
          <div
            className={`language-picker__language ${styles.language}`}
            onClick={() => handleChangeLanguage(lang)}
          >
            <img src={`images/${flags[lang].name}.svg`} alt='' />
          </div>
        </div>
      ));

  return (
    <div
      style={{
        alignSelf: 'center'
      }}
      className={`language-picker ${styles.picker}`}
      data-direction={direction}
      data-col-direction={colDirection}
      onClick={toggleLanguagePicker}
      ref={pickerRef}
    >
      <div
        className={`language-picker__current ${styles.current} ${styles.language}`}
      >
        <img src={`images/${flags[language].name}.svg`} alt='' />
      </div>
      {available.length !== 0 && (
        <div
          className={`language-picker__selector ${styles.selector}`}
          style={style}
        >
          {generateAvailableLanguages()}
        </div>
      )}
    </div>
  );
};

export default LanguagePicker;
