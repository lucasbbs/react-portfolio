import React, { useState, useEffect, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import FallbackSpinner from './components/FallbackSpinner';
import NavBarWithRouter from './components/NavBar';
import Home from './components/Home';
// import Page404 from './components/Page404';
import endpoints from './constants/endpoints';
import Project from './components/Project';
import Projects from './components/Projects';

export const initialLanguage = 'en'

function MainApp() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.routes, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return (
    <div className="MainApp">
      <main className="main">
        <Switch>
          <Suspense fallback={<FallbackSpinner />}>
            <NavBarWithRouter />
            <Route exact path="/" component={Home} />
            <Route path="/projects">
              <Route
                exact
                path="/projects"
              >
                <Projects />
              </Route>
              <Route
                path="/projects/:id"
                component={({ match }) => (
                  <Project header={match.params.id} />
                )}
              />
            </Route>
            {data
              && data.sections.map((route) => {
                const SectionComponent = React.lazy(() => import('./components/' + route.component));
                return (
                  <Route
                    key={route.headerTitle}
                    path={route.path}
                  >
                    <SectionComponent header={route.headerTitle} />
                  </Route>
                );
              })}
            {/* <Route
              path="/404"
            >
              <Page404 header="Not Found" />
            </Route>
            <Route
              exact
              path="*"
            >
              <Redirect to="/404" />
            </Route> */}
          </Suspense>
        </Switch>
      </main>
    </div>
  );
}

export default MainApp;
