
import React from 'react'
import { Switch, Route, Link } from "react-router-dom";
import Home from './pages/Home'
import About from './pages/About'
import Common from './pages/Common'

export default function App() {

  return (
    <>
      
      <Common />
      <Switch>
        
        <Route exact path='/' component={Home}/>
        <Route exact path='/about'><About /></Route>
      </Switch>
      <nav>
        <Link to='/'>HOME</Link> 
        <Link to='about'> ABOUT </Link> 
      </nav>
    </>
  )
}
