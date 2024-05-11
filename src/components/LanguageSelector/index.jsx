import React, { useRef, useState } from 'react';

import { PropTypes } from 'prop-types';
import styles from './styles.module.css';
/* eslint-disable import/no-cycle */
import { initialLanguage } from '../../MainApp';

const flags = {
  ru: {
    name: 'ru',
  },
  en: {
    name: 'en',
  },
  pt: {
    name: 'pt',
  },
  fr: {
    name: 'fr',
  },
};

const LanguagePicker = ({
  current = initialLanguage,
  available = [],
  direction = 'down',
  colDirection = ['up', 'down'].indexOf(direction) !== -1 ? 'right' : 'down',
  onChange = () => { },
  onChangeEnd = () => { },
}) => {
  const pickerRef = useRef();
  const [language, setLanguage] = useState(current);
  const [style] = useState({});

  const toggleLanguagePicker = () => {
    pickerRef.current.classList.toggle(styles.isActive);
    pickerRef.current.dataset.active = pickerRef.current.classList.contains(
      styles.isActive,
    );
  };

  const handleChangeLanguage = (lang) => {
    onChange(lang);
    setLanguage(lang);
    setTimeout(() => {
      onChangeEnd(lang);
    }, 300);
  };

  const generateAvailableLanguages = () => available.map((lang) => (
    <div
      key={`lang-selector-${lang}`}
      className={`language-picker__container ${styles.container}`}
      style={{
        zIndex: language === lang ? 2 : '',
      }}
    >
      {/* eslint-disable max-len */}
      {/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <div
        className={`language-picker__language ${styles.language}`}
        onClick={() => handleChangeLanguage(lang)}
      >
        <img src={`images/${flags[lang].name}.svg`} alt="" />
      </div>
    </div>
  ));

  return (
    <div
      style={{
        alignSelf: 'center',
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
        <img src={`images/${flags[language].name}.svg`} alt="" />
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

LanguagePicker.propTypes = {
  current: PropTypes.string,
  available: PropTypes.arrayOf(PropTypes.string),
  direction: PropTypes.string,
  colDirection: PropTypes.string,
  onChange: PropTypes.func,
  onChangeEnd: PropTypes.func,
};

LanguagePicker.defaultProps = {
  current: 'en',
  available: [],
  direction: 'down',
  colDirection: 'right',
  onChange: () => {},
  onChangeEnd: () => {},
};

export default LanguagePicker;
