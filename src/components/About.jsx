/* eslint-disable no-confusing-arrow, arrow-parens */
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import {
  Container, Col, Row,
} from 'react-bootstrap';
import Fade from 'react-reveal';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';
import '../css/about.css';
import { useLanguageContext } from '../TranslateContext';

const styles = {
  introTextContainer: {
    margin: 'auto',
    flexDirection: 'column',
    whiteSpace: 'pre-wrap',
    textAlign: 'left',
    fontSize: '1.2em',
    fontWeight: 500,
  },
  introImageContainer: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
};

const Image = styled.img`
  margin: auto !important;
  transform: ${(props) => (props.animated ? 'translateZ(0)' : 'translate3d(-100px,0,0)')};
  opacity: ${(props) => (props.animated ? 1 : 0)};
  transition-property: opacity,transform;
  transition-timing-function: ease-in-out;
  transition-duration: 1s;
`;

const Div = styled.div`
  transform: ${(props) => (props.animated ? 'translateZ(0)' : 'translate3d(100px,0,0)')};
  opacity: ${(props) => (props.animated ? 1 : 0)};
  transition-property: opacity,transform;
  transition-timing-function: ease-in-out;
  transition-duration: 1s;
`;

const Ul = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

function About() {
  const [animated, setAnimated] = useState(false);
  const [data, setData] = useState(null);

  const parseIntro = (text) => (
    <ReactMarkdown
      children={text}
    />
  );

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setAnimated(true);
    }, 100);
    return () => clearTimeout(timeOutId);
  }, []);

  useEffect(() => {
    fetch(endpoints.about, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  const { t } = useLanguageContext();

  return (
    <>
      <Helmet>
        <title>
          {t('about.title') + ' | ' + t('home.name')}
        </title>
      </Helmet>
      <Header
        headerClassName="header"
        title={t('about.title')}
      />
      <div className="section-content-container">
        <Container>
          {data
            ? (
              <Fade>
                <Row>{parseIntro(t('about.info'))}</Row>
                <Row>
                  <Col className="no-padding no-margin" xs={12} lg={4} style={styles.introImageContainer}>
                    <Image animated={animated} className="avatar" src={data?.imageSource} alt="profile" />
                  </Col>
                  <Col xs={12} lg={7} style={styles.introTextContainer}>
                    <Div animated={animated} style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
                      <Ul className="text-start two-columns-list">
                        {t('about.data', { returnObjects: true }).map(d => d.link
                          ? (
                            <li className="list-group-item">
                              <strong>
                                {d.key + ':'}
                              </strong>
                              {' '}
                              <a className="about-link" target="_blank" rel="noreferrer" href={d.address}>
                                {d.value}
                              </a>
                            </li>
                          )
                          : (
                            <li className="list-group-item">
                              <strong>
                                {d.key + ':'}
                              </strong>
                              {' ' + d.value}
                            </li>
                          ))}
                      </Ul>
                    </Div>
                  </Col>
                </Row>
              </Fade>
            )
            : <FallbackSpinner />}
        </Container>
      </div>
    </>
  );
}

export default About;
