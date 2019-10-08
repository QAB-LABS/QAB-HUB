import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { withRouter } from 'react-router'
import GoogleAuth from './GoogleAuth'
import api from '../apis/backend'

function MainNavbar(props) {

  function handleLogoutClick(e) {
    api.logout()
  }

  return (
    <nav className="App-header">
      <div className="ui secondary pointing menu">
        <NavLink className="item" to="/" exact>Home</NavLink>
        <NavLink className="item" to="/countries">Countries</NavLink>
        <NavLink className="item" to="/add-country">Add country</NavLink>

        <div className="right menu">
          {!api.isLoggedIn() && <NavLink to="/signup">Signup</NavLink>}
          {!api.isLoggedIn() && <NavLink to="/login">Login</NavLink>}
          {api.isLoggedIn() && (
            <Link to="/" onClick={handleLogoutClick}>
              Logout
            </Link>
          )}
          <GoogleAuth />
        </div>
      </div>
    </nav>
  )
}

export default withRouter(MainNavbar)
