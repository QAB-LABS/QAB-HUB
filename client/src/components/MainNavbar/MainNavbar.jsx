import React from 'react'
import { authActions } from '../../actions/auth'
import { NavLink } from 'react-router-dom'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import api from '../../apis/backend'
class MainNavbar extends React.Component {
  render() {
    return (
      <nav className="App-header">
        <div className="ui secondary pointing menu">
          <NavLink className="item" to="/" exact>Home</NavLink>
          <NavLink className="item" to="/games">Games</NavLink>
          <div className="right menu">
            <div className="ui simple dropdown">
              <i className="user icon" />
              <div className="text">Account</div>
              <div className="menu">

                {api.isLoggedIn() && (
                  <div className="item">
                    <NavLink className="item" to="/" onClick={this.props.logout}>Logout</NavLink>
                  </div>)}

                {api.isLoggedIn() && (
                  <div className="item">
                    <NavLink className="item" to="/profile">My Profile</NavLink>
                  </div>
                )}
                <div className="item">
                  <NavLink className="item" to="/login">Log In</NavLink>
                </div>

                <div className="item">
                  <NavLink className="item" to="/signup">Sign Up</NavLink>
                </div>

              </div>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

const mapState = state => {
  return {
    currentUser: state.authentication.user
  }
}

const actionCreators = {
  logout: authActions.logout
};

export default connect(mapState, actionCreators)(withRouter(MainNavbar))
