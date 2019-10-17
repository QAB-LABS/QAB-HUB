import React from 'react'
import { authActions } from '../../actions/auth'
import { NavLink } from 'react-router-dom'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import api from '../../apis/backend'



class MainNavbar extends React.Component {

  render() {
    return (
      <header className="topNav">
        <div className="container">
        <div className="row">
            <div className="col-9 primary">
              <div className="logo">
                <NavLink to="/">Board Game Silo</NavLink>
              </div>
              <div className="menu">
                <ul>
                  <li><NavLink className="item" to="/games">Board Games</NavLink></li>
                  <li><NavLink className="item" to="/games">Events</NavLink></li>
                  <li><NavLink className="item" to="/games">Groups</NavLink></li>
                </ul>
              </div>
            </div>
            <div className="col-3 secondary">
            <div className="dropdown">
                <div className="item">
                  <i className="user icon" />
                  Account
                </div>
                <ul className="menu">
                  {api.isLoggedIn() && (
                    <li className="item">
                      <NavLink className="item" to="/" onClick={this.props.logout}>Logout</NavLink>
                    </li>
                  )}

                  {api.isLoggedIn() && (
                    <li className="item">
                      <NavLink className="item" to="/profile">My Profile</NavLink>
                    </li>
                  )}
                  <li className="item">
                    <NavLink className="item" to="/login">Log In</NavLink>
                  </li>

                  <li className="item">
                    <NavLink className="item" to="/signup">Sign Up</NavLink>
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
