import { Navbar, Nav, Container } from 'react-bootstrap';
import React, { useEffect, useState, useContext } from 'react';
import { withRouter } from 'react-router';
import { NavLink, useLocation, Link } from 'react-router-dom';
import styled, { ThemeContext } from 'styled-components';
import endpoints from '../constants/endpoints';
import Logo from './Logo';
import h1Styles from './project.module.css';
import { useLanguageContext } from '../TranslateContext';
import LanguageSelector from './LanguageSelector';

const styles = {
  buttonStyle: {
    marginLeft: 20,
  },
};

const ExternalNavLink = styled.a`
  color: ${(props) => props.theme.navbarTheme.linkColor};
  &:hover {
    color: ${(props) => props.theme.navbarTheme.linkHoverColor};
  }
  &::after {
    background-color: ${(props) => props.theme.accentColor};
  }
`;

const InternalNavLink = styled(NavLink)`
  color: ${(props) => props.theme.navbarTheme.linkColor};
  &:hover {
    color: ${(props) => props.theme.navbarTheme.linkHoverColor};
  }
  &::after {
    background-color: ${(props) => props.theme.accentColor};
  }
  &.navbar__link--active {
    color: ${(props) => props.theme.navbarTheme.linkActiveColor};
  }
`;

const NavBar = () => {
  const { pathname } = useLocation();
  const theme = useContext(ThemeContext);
  const [data, setData] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [isProject, setIsProject] = useState(false);
  const [header, setHeader] = useState('');

  useEffect(() => {
    if (pathname.includes('/projects/')) {
      setIsProject(true);
    } else {
      setIsProject(false);
    }
  }, [pathname]);

  useEffect(() => {
    const location = pathname.split('/').slice(-1)[0];
    setHeader(location);
  }, [pathname]);

  useEffect(() => {
    fetch(endpoints.navbar, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, [pathname]);

  const { i18n, onClickLanguageChange } = useLanguageContext();

  return (
    <Navbar
      fixed="top"
      expand="md"
      bg="dark"
      variant="dark"
      className="navbar-custom"
      expanded={expanded}
    >
      { !isProject ? (
        <Container>
          {data?.logo && (
          <Logo data={data} />
          )}
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            onClick={() => setExpanded(!expanded)}
          />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto" />
            <Nav>
              {data
              && data.sections[i18n.language]?.map((section, index) => (section?.type === 'link' ? (
                <ExternalNavLink
                  key={section.title}
                  href={section.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setExpanded(false)}
                  className="navbar__link"
                  theme={theme}
                >
                  {section.title}
                </ExternalNavLink>
              ) : (
                <InternalNavLink
                  key={section.title}
                  onClick={() => setExpanded(false)}
                  exact={index === 0}
                  activeClassName="navbar__link--active"
                  className="navbar__link"
                  to={section.href}
                  theme={theme}
                >
                  {section.title}
                </InternalNavLink>
              )))}
              <LanguageSelector
                available={['en', 'ru'/*, 'fr', 'pt'*/]}
                onChangeEnd={(value) => onClickLanguageChange(value)}
              />
            </Nav>
          </Navbar.Collapse>
        </Container>
      )
        : (
          <Navbar
            fixed="top"
            bg="dark"
            className="navbar-custom"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Link
              variant={theme.bsPrimaryVariant}
              to="/projects"
              style={styles.buttonStyle}
            >
              <svg
                height="45.999px"
                id="Capa_1"
                style={{
                  filter: 'invert(1)',
                  enableBackground: 'new 0 0 26.002 45.999',
                }}
                version="1.1"
                viewBox="0 0 26.002 45.999"
                width="26.002px"
                xmlSpace="preserve"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <path d="M24.998,40.094c1.338,1.352,1.338,3.541,0,4.893c-1.338,1.35-3.506,1.352-4.846,0L1.004,25.447  c-1.338-1.352-1.338-3.543,0-4.895L20.152,1.014c1.34-1.352,3.506-1.352,4.846,0c1.338,1.352,1.338,3.541,0,4.893L9.295,23  L24.998,40.094z" />
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
              </svg>
            </Link>
            <div style={{ marginRight: 20 }}>
              <h1
                className={h1Styles.wrapper}
                style={{
                  fontSize: '3rem',
                  fontWeight: 'bold',
                }}
              >
                {header}
              </h1>
            </div>
          </Navbar>
        )}
    </Navbar>
  );
};

const NavBarWithRouter = withRouter(NavBar);
export default NavBarWithRouter;
