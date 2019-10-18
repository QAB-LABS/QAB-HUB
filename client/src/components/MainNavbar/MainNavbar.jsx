import React from 'react'
import { authActions } from '../../actions/auth'
import { NavLink } from 'react-router-dom'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import api from '../../apis/backend'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class MainNavbar extends React.Component {

  render() {
    return (
      <header className="topNav fixed">
        <div className="container">
          <div className="row">
            <div className="col-9 primary">
              <div className="logo">
                <NavLink to="/">
                  <img
                    src="/images/board-game-silo-logo.png"
                    alt="Board Game Silo Logo consisting of letters BGS and 3 silos"
                  />
                  <h1>Board Game Silo</h1>
                </NavLink>
              </div>
              <div className="menu">
                <ul>
                  <li>
                    <NavLink className="item" to="/games">
                      Board Games
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="item" to="/games">
                      Events
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="item" to="/games">
                      Groups
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-3 secondary">
              <div className="hasDropdown">
                <div className="mobileMenu">
                  Menu <FontAwesomeIcon icon="bars" />
                </div>
                <div>
                  <ul className="menu">
                    <li>
                      <NavLink className="item" id="login" to="/login">
                        Login
                      </NavLink>
                    </li>
                    <li>/</li>
                    <li>
                      <NavLink className="item" id="register" to="/signup">
                        Register
                      </NavLink>
                    </li>
                  </ul>
                </div>
                <ul className="menu dropdown">
                  {api.isLoggedIn() && (
                    <li className="item">
                      <NavLink
                        className="item"
                        to="/"
                        onClick={this.props.logout}
                      >
                        Logout
                      </NavLink>
                    </li>
                  )}

                  {api.isLoggedIn() && (
                    <li className="item">
                      <NavLink className="item" to="/profile">
                        My Profile
                      </NavLink>
                    </li>
                  )}
                  <li className="item">
                    <NavLink className="item" to="/login">
                      Log In
                    </NavLink>
                  </li>

                  <li className="item">
                    <NavLink className="item" to="/signup">
                      Sign Up
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>
    )
  }
}

const mapState = state => {
  return {
    currentUser: state.authentication.user,
  }
}

const actionCreators = {
  logout: authActions.logout,
}

export default connect(
  mapState,
  actionCreators
)(withRouter(MainNavbar))
