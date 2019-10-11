import React from 'react'
import { Route, Switch } from 'react-router-dom'
import MainNavbar from '../components/MainNavbar/MainNavbar'
import Home from './pages/Home'
import Games from './pages/Games'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Signup from './pages/Signup'

export default function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div class="col-2">Left</div>
          <div class="col-10">
            <MainNavbar />
            Right
          </div>
        </div>
      </div>
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
