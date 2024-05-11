import React, { useState, useEffect } from 'react';
import Typewriter from 'typewriter-effect';
import Fade from 'react-reveal';
import { Helmet } from 'react-helmet';
import endpoints from '../constants/endpoints';
import Social from './Social';
import FallbackSpinner from './FallbackSpinner';
import { useLanguageContext } from '../TranslateContext';

const styles = {
  nameStyle: {
    fontSize: '5em',
  },
  inlineChild: {
    display: 'inline-block',
  },
  mainContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.home, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  const { t, i18n } = useLanguageContext();

  return data ? (
    <Fade>
      <Helmet>
        <title>
          {t('home.title') + ' | ' + t('home.name')}
        </title>
      </Helmet>
      <div style={styles.mainContainer}>
        <h1 style={styles.nameStyle}>{t('home.name')}</h1>
        <div style={{ flexDirection: 'row' }}>
          <h2 style={styles.inlineChild}>
            {t('home.heading')}
            &nbsp;
          </h2>
          <Typewriter
            wrapperClassName="h2"
            options={{
              loop: true,
              autoStart: true,
              strings: data?.roles[i18n.language],
            }}
          />
        </div>
        <Social />
      </div>
    </Fade>
  ) : <FallbackSpinner />;
}

export default Home;
