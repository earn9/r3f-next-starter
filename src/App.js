
import React from 'react'
import { Switch, Route, Link } from "react-router-dom";
import Home from './pages/Home'
import About from './pages/About'
import Common from './Common'

export default function App() {

  return (
    <>
      <nav>
        <Link to='/'>HOME</Link> 
        <Link to='about'> ABOUT </Link> 
      </nav>
      <Common />
      <Switch>
        <Route exact path='/'><Home /></Route>
        <Route exact path='/about'><About /></Route>
      </Switch>
    </>
  )
}
