
import React from 'react'
import { Switch, Route, Link, BrowserRouter as Router, useLocation } from "react-router-dom";
import Home from './pages/Home'
import About from './pages/About'
import Common from './pages/Common'
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const routes = [
  { path: '/', name: 'Home', Component: Home },
  { path: '/about', name: 'About', Component: About }
]

export default function App() {
  let location = useLocation();

  return (
    <>
      <Common />
      <TransitionGroup component={null}>
        <CSSTransition
          key={location.key}
          classNames="page"
          timeout={1500}
        >
          <div className="page">
            <Switch location={location}>
            {routes.map(({ path, Component }) => (
              <Route key={path} exact path={path} primary={false} component={Component} />
            ))}
            </Switch>
          </div>
        </CSSTransition>
      </TransitionGroup>
      <nav>
        {routes.map(route => (
          <Link
            key={route.path}
            to={route.path}
            exact="true"
          >
            {route.name}
          </Link>
        ))}
      </nav>
    </>
  )
}