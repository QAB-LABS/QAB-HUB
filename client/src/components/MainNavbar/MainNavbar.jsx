import React from 'react'
import { authActions } from '../../actions/auth'
import { NavLink } from 'react-router-dom'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const userMenu = (loggedIn, currentUser) => {
  console.log(loggedIn, currentUser)
  return (
    <ul className="menu">
      {loggedIn ? (
        <React.Fragment>
          <li className="item">
            <NavLink className="item" to={`/profile/${currentUser._id}`}>
              {currentUser.username}
            </NavLink>
          </li>
          <li className="item">
            <NavLink className="item" to="/" onClick={authActions.logout}>
              Logout
            </NavLink>
          </li>
        </React.Fragment>
      ) :
        <React.Fragment>
          <li className="item">
            <NavLink className="item" to="/login">
              Log In
            </NavLink>
          </li>
          <li>/</li>
          <li>
            <NavLink className="item" id="register" to="/signup">
              Register
            </NavLink>
          </li>
        </React.Fragment>
      }
    </ul>
  )
}
class MainNavbar extends React.Component {

  render() {
    const { loggedIn, currentUser } = this.props

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
                    <NavLink className="item" to="/reviews">
                      Reviews
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-3 secondary">
              <div className="hasDropdown">
                <div className="mobileMenu">
                  Menu <FontAwesomeIcon icon="bars" />
                  <ul className="menu dropdown">
                  <li className="item">
                      <NavLink to="/games">
                        Board Games
                      </NavLink>
                    </li>
                    <li className="item">
                      <NavLink to="/reviews">
                        Reviews
                      </NavLink>
                    </li>
                  {(!!loggedIn && !!currentUser) ? (
                    <li className="item">
                      <NavLink className="item" to="/" onClick={this.props.logout}>
                        Logout
                      </NavLink>
                    </li>) : null
                  }

                  {(!!loggedIn && !!currentUser) ? (
                    <li className="item">
                      <NavLink className="item" to="/profile">
                        My Profile
                      </NavLink>
                    </li>
                  ) : null}
                  {!loggedIn ? (
                    <li className="item">
                      <NavLink className="item" to="/login">
                        Log In
                    </NavLink>
                    </li>
                  ) : null}
                  
                  <li className="item">
                    <NavLink className="item" to="/signup">
                      Sign Up
                    </NavLink>
                  </li>
                </ul>
                </div>
                <div>
                  {userMenu(loggedIn, currentUser)}
                </div>
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
    loggedIn: state.authentication.loggedIn,
  }
}

const actionCreators = {
  logout: authActions.logout,
}

export default connect(
  mapState,
  actionCreators
)(withRouter(MainNavbar))
