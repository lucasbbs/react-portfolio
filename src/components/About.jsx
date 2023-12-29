import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import {
  Container, Col, Row,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import Fade from 'react-reveal';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';
import '../css/about.css';

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

function About(props) {
  const [animated, setAnimated] = useState(false);
  const { header } = props;
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

  return (
    <>
      <Helmet>
        <title>
          About | Lucas&apos; portfolio
        </title>
      </Helmet>
      <Header
        headerClassName="header"
        title={header}
      />
      <div className="section-content-container">
        <Container>
          {data
            ? (
              <Fade>
                <Row>{parseIntro(data.about)}</Row>
                <Row>
                  <Col className="no-padding no-margin" xs={12} lg={4} style={styles.introImageContainer}>
                    <Image animated={animated} className="avatar" src={data?.imageSource} alt="profile" />
                  </Col>
                  <Col xs={12} lg={7} style={styles.introTextContainer}>
                    <Div animated={animated} style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
                      <ul className="text-start">
                        <li className="list-group-item">
                          <strong>Name:</strong>
                          {' '}
                          Lucas Breno de Souza Noronha Braga
                        </li>
                        <li className="list-group-item">
                          <strong>Birthday:</strong>
                          {' '}
                          <a className="about-link" href="https://calendar.google.com/calendar/event?action=TEMPLATE&tmeid=NHAya21zY3ZzcjlyZXY1ODA5ZG1vYWxmOGUgYWMxMzJjMDE2OTg0YWRiOGQ5ZTExOGE5NmRjODJmNjc4M2IwOGI4MzA5ZGFmMDYzMTMxNjA0OGI0NTBmMzgyMUBn&tmsrc=ac132c016984adb8d9e118a96dc82f6783b08b8309daf0631316048b450f3821%40group.calendar.google.com">
                            November 7th, 1990
                          </a>
                        </li>
                        <li className="list-group-item">
                          <strong>Website:</strong>
                          {' '}
                          <a className="about-link" href="https://lucasbbs.live">
                            lucasbbs.live
                          </a>
                        </li>
                        <li className="list-group-item">
                          <strong>
                            Phone:
                          </strong>
                          {' '}
                          <a className="about-link" href="tel:+12267247739">
                            +1 (226) 274 7739
                          </a>
                        </li>
                        <li className="list-group-item">
                          <strong>
                            City:
                          </strong>
                          {' '}
                          <a className="about-link" href="https://maps.google.com/maps?daddr=Windsor,%20Canada" target="__blank">
                            Windsor/ON, CAN
                          </a>
                        </li>
                      </ul>
                      <ul className="text-start">
                        <li className="list-group-item">
                          <strong>
                            Specialty:
                          </strong>
                          {' '}
                          Cloud Full-Stack Development
                        </li>
                        <li className="list-group-item">
                          <strong>
                            Age:
                          </strong>
                          {' '}
                          33
                        </li>
                        <li className="list-group-item">
                          <strong>
                            Degree:
                          </strong>
                          {' '}
                          Master
                        </li>
                        <li className="list-group-item">
                          <strong>
                            email:
                          </strong>
                          {' '}
                          <a className="about-link" href="mailto:lucasbbs@live.fr?subject=Hello,%20Lucas&body=Hello,%20there!%0D%0A" target="_blank" rel="noreferrer">
                            lucasbbs@live.fr
                          </a>
                        </li>
                        <li className="list-group-item">
                          <strong>
                            Freelance:
                          </strong>
                          {' '}
                          Available
                        </li>
                      </ul>
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

About.propTypes = {
  header: PropTypes.string.isRequired,
};

export default About;
