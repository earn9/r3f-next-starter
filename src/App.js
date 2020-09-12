
import React, { useRef, Component, useState } from 'react'
import { Switch, Route, Link } from "react-router-dom";
import Home from './components/Home'
import About from './components/About'
import Common from './Common'
import create from 'zustand/vanilla';

export default function App() {
  const [state, setState] = useState('/');

  return (
    <>
      <nav>
        <Link to='/'>HOME</Link> 
        <Link to='about'> ABOUT </Link> 
      </nav>
      <Common url={state} />
      <Switch>
        <Route exact path='/'><Home handler={setState} /></Route>
        <Route exact path='/about'><About handler={setState} /></Route>
      </Switch>
    </>
  )
}
