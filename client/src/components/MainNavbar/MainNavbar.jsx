import React from 'react'
import { NavLink } from 'react-router-dom'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import GoogleAuth from '../GoogleAuth/GoogleAuth'
import api from '../../apis/backend'
class MainNavbar extends React.Component {
  handleLogoutClick = () => {
    api.logout()
  }

  render() {
    return (
      <nav className="App-header">
        <div className="ui secondary pointing menu">
          <NavLink className="item" to="/" exact>
            Home
          </NavLink>
          <NavLink className="item" to="/games">
            Games
          </NavLink>

          <div className="right menu">
            <NavLink to="/profile">Profile</NavLink>
            {!api.isLoggedIn() && <NavLink to="/signup">Signup</NavLink>}
            {!api.isLoggedIn() && <NavLink to="/login">Login</NavLink>}
            {api.isLoggedIn() && (
              <NavLink to="/" onClick={this.handleLogoutClick}>
                Logout
              </NavLink>
            )}
            <GoogleAuth />
          </div>
        </div>
      </nav>
    )
  }
}

const mapStateToProps = state => {
  return { currentUserId: state.auth.userId }
}

export default connect(
  mapStateToProps,
  {}
)(withRouter(MainNavbar))
