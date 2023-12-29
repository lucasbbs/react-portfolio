import './index.css';
import React, { useContext } from 'react';
import { Card, Badge, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import styled, { ThemeContext } from 'styled-components';
import { Link } from 'react-router-dom';
import ProjectCardHeader from './ProjectCardHeader';

const styles = {
  badgeStyle: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    margin: 5,
  },
  cardStyle: {
    borderRadius: 10,
  },
  cardTitleStyle: {
    fontSize: 24,
    fontWeight: 700,
    textShadow: '#000000 1px 0 10px',
  },
  cardTextStyle: {
    textAlign: 'center',
    textDecoration: 'none',
  },
  cardDescription: {
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 4,
    textShadow: '#000000 1px 0 10px',
  },
  linkStyle: {
    color: '#149ddd',
    textDecoration: 'none',
    padding: 10,
  },
  buttonStyle: {
    margin: 5,
  },
};

const StyledLink = styled.a`
    margin: 5px;
    padding: 0.375rem 0.75rem;
    border: 1px solid #149ddd;
    color: #149ddd;
    text-decoration: none;
    border-radius: 6px;
    &:hover,&:focus-within {
      color: #000000;
      background-color: #149ddd;
      border-color: #149ddd;
    }
`;

const ProjectCard = (props) => {
  const theme = useContext(ThemeContext);
  const parseBodyText = (text) => <span style={styles.cardDescription}>{text}</span>;
  const { project, devicons } = props;

  return (
    <Col>
      <Card
        style={{
          ...styles.cardStyle,
          background: project.image ? `url(${project?.image})` : theme.cardBackground,
          backgroundSize: 'cover',
          borderColor: theme.cardBorderColor,
        }}
        text={theme.bsSecondaryVariant}
      >
        <ProjectCardHeader topics={project.topics} devicons={devicons} />
        <Card.Body style={{ height: '200px' }}>
          <Link style={styles.linkStyle} to={`/projects/${project.name}`}>
            <Card.Title style={styles.cardTitleStyle}>{project.name}</Card.Title>
            <Card.Text style={styles.cardTextStyle}>
              {parseBodyText(project.description)}
            </Card.Text>
          </Link>
        </Card.Body>

        <Card.Body>
          {/* {project?.links?.map((link) => ( */}
          <StyledLink
            style={styles.buttonStyle}
            href={project.html_url}
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </StyledLink>
          {project.homepage && (
          <StyledLink
            href={project.homepage}
            target="_blank"
            rel="noreferrer"
          >
            Live Preview
          </StyledLink>
          )}
          {/* ))} */}
        </Card.Body>
        {project.tags && (
          <Card.Footer style={{ backgroundColor: theme.cardFooterBackground }}>
            {project.tags.map((tag) => (
              <span style={{ fontSize: 30 }}>
                <Badge
                  key={tag}
                  pill
                  bg={theme.yellow}
                  text={theme.bsPrimaryVariant}
                  style={styles.badgeStyle}
                >
                  <i className={`devicon-${tag}-plain`} />
                </Badge>
              </span>
            ))}
          </Card.Footer>
        )}
      </Card>
    </Col>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string,
    links: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    })),
    topics: PropTypes.arrayOf(PropTypes.string).isRequired,
    description: PropTypes.string,
    url: PropTypes.string.isRequired,
    html_url: PropTypes.string.isRequired,
    homepage: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  devicons: PropTypes.object.isRequired,
};

export default ProjectCard;
