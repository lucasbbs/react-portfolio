/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
// import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import {
  Col, Container, ProgressBar, Row,
} from 'react-bootstrap';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';
import '../css/skill.css';
import { useLanguageContext } from '../TranslateContext';

// const styles = {
//   iconStyle: {
//     height: 75,
//     width: 75,
//     margin: 10,
//     marginBottom: 0,
//   },
//   introTextContainer: {
//     whiteSpace: 'pre-wrap',
//   },
// };

const Skill = ({ skill, levelSkill }) => (
  <>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <span>{skill}</span>
      <span>
        {levelSkill}
        %
      </span>
    </div>
    <ProgressBar color="#040b14" now={levelSkill} label={`${levelSkill}%`} animated />
  </>
);

Skill.propTypes = {
  skill: PropTypes.string.isRequired,
  levelSkill: PropTypes.number.isRequired,
};

const ProgressBarContainer = styled.div`
    opacity:  ${(prop) => (prop.addClass ? 1 : 0)};
    transition-timing-function: ease-in-out;
    transition-duration: 1s;
    transition-property: opacity,transform;
    transform: ${(prop) => (prop.addClass ? 'translateZ(0)' : 'translate3d(0, 100px, 0)')};
  `;

function Skills() {
  const [addClass1, setAddClass1] = useState(false);
  const [addClass2, setAddClass2] = useState(false);

  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.skills, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  useEffect(() => {
    const timeoutId1 = setTimeout(() => {
      setAddClass1(true);
    }, 100);

    const timeoutId2 = setTimeout(() => {
      setAddClass2(true);
    }, 200);

    return () => {
      clearTimeout(timeoutId2);
      clearTimeout(timeoutId1);
    };
  }, []);

  const { t } = useLanguageContext();

  return (
    <>
      <Helmet>
        <title>
          {t('skills.title') + ' | ' + t('home.name')}
        </title>
      </Helmet>
      <Header
        headerClassName="header"
        title={t('skills.title')}
      />
      {data ? (

        <div className="section-content-container" style={{ width: '100vw' }}>
          <Container>
            <Row>
              <Col>
                <ProgressBarContainer addClass={addClass1} className={`skill-column${addClass1 ? 'animate' : ''}`}>
                  <Skill skill="HTML" levelSkill={95} />
                  <Skill skill="CSS" levelSkill={85} />
                  <Skill skill="PHP" levelSkill={72.5} />
                  <Skill skill="Laravel" levelSkill={77.5} />
                  <Skill skill="Bootstrap" levelSkill={76.7} />
                  <Skill skill="JavaScript" levelSkill={86.7} />
                </ProgressBarContainer>
              </Col>
              <Col>
                <ProgressBarContainer addClass={addClass2} className={`skill-column${addClass2 ? 'animate' : ''}`}>
                  <Skill skill="Typescript" levelSkill={90} />
                  <Skill skill="ReactJS" levelSkill={85} />
                  <Skill skill="Latex" levelSkill={50} />
                  <Skill skill="Docker" levelSkill={60} />
                  <Skill skill="Material UI" levelSkill={75} />
                  <Skill skill="NodeJS" levelSkill={79.4} />
                </ProgressBarContainer>
              </Col>
            </Row>
          </Container>
        </div>
      ) : <FallbackSpinner /> }
    </>
  );
}

export default Skills;
