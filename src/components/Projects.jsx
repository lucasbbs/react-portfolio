import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Fade from 'react-reveal/Fade';
import axios from 'axios';
import qs from 'query-string';
import { Helmet } from 'react-helmet';
import useSearchParams from '../hooks/useSearchParams';
import Header from './Header';
import ProjectCard from './projects/ProjectCard';
import FallbackSpinner from './FallbackSpinner';
import '../App.css';
import ScrollButton from './ScrollTopButton';
import Pagination from './Pagination';

const styles = {
  containerStyle: {
    marginBottom: 25,
  },
  showMoreStyle: {
    margin: 25,
  },
};

const Projects = (props) => {
  const [repositories, setRepositories] = useState([]);
  const [devicons, setDevicons] = useState({});
  const [urls, setUrls] = useState({});
  const page = useSearchParams();

  console.log(page);

  useEffect(() => {
    const fetchDevIconsInfo = async () => {
      const { data } = await axios.get('https://raw.githubusercontent.com/devicons/devicon/master/devicon.json');
      const resultDict = data.reduce((acc, item) => {
        // eslint-disable-next-line prefer-destructuring
        acc[item.name] = item.versions.font[0];
        return acc;
      }, {});

      setDevicons(resultDict);
    };

    fetchDevIconsInfo();
  }, []);

  const fetchGithubProjects = async () => {
    const response = await axios.get(`https://api.github.com/users/lucasbbs/repos?page=${page}`);
    const links = response.headers.link.split(', ');
    setRepositories(response.data);
    const linkDict = {};
    links.forEach((link) => {
      const [url, rel] = link.split('; ');
      const parsedUrl = `?page=${[Object.values(qs.parse(url.slice(1, -1)))]}`;
      linkDict[rel.slice(5, -1)] = parsedUrl;
    });
    setUrls(linkDict);
  };

  useEffect(() => {
    fetchGithubProjects();
  }, [page]);
  const { header } = props;
  const numberOfItems = repositories.length;

  return (
    <>
      <Helmet>
        <title>Projects | Lucas&apos; Portfolio</title>
      </Helmet>
      <Header
        headerClassName="header"
        title={header}
      />
      <Pagination urls={urls} />
      {repositories
        ? (
          <div className="section-content-container">
            <Container style={styles.containerStyle}>
              <Row xs={1} sm={1} md={2} lg={3} className="g-4">
                {repositories?.slice(0, numberOfItems).map((project) => (
                  <Fade key={project.id}>
                    <ProjectCard project={project} devicons={devicons} />
                  </Fade>
                ))}
              </Row>
            </Container>
          </div>
        ) : <FallbackSpinner /> }
      <ScrollButton />
    </>
  );
};

Projects.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Projects;
