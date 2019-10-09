import React from 'react'
import { Route, Switch } from 'react-router-dom'
import MainNavbar from './MainNavbar/MainNavbar'
import Home from './Pages/Home'
import Games from './Pages/Games'
import Profile from './Pages/Profile'
import Login from './Pages/Login'
import Signup from './Pages/Signup'

export default function App() {
  return (
    <div className="App">
      <MainNavbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/games" component={Games} />
        <Route path="/profile" component={Profile} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route render={() => <h2>404</h2>} />
      </Switch>
    </div>
  )
}
