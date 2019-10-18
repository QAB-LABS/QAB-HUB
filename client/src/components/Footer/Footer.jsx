import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class Footer extends Component {
  render() {
    return (
      <footer className="siteFooter">
          <div className="container footer">
          <div className="row">
              <div className="col-2">
              <div className="logo">
                <NavLink to="/">
                  <img src="/images/board-game-silo-logo-white.png" alt="Board Game Silo Logo consisting of letters BGS and 3 silos" />
                  <h1>Board Game Silo</h1>
                  </NavLink>
                  
              </div>
              </div>
              <div className="col-6">

              </div>
              <div className="col-4 social">
                <ul className="menu">
                  <li><NavLink to="/games"><FontAwesomeIcon icon={['fab', 'facebook']} /></NavLink></li>
                  <li><NavLink to="/games"><FontAwesomeIcon icon={['fab', 'instagram']} /></NavLink></li>
                  <li><NavLink to="/games"><FontAwesomeIcon icon={['fab', 'reddit']} /></NavLink></li>
                  <li><NavLink to="/games"><FontAwesomeIcon icon={['fab', 'twitter']} /></NavLink></li>
                </ul>
              </div>
          </div>
          <div className="row">
            <div className="col-12">
                <p>&copy; Board Game Silo. All rights reserved. All trademarks are property of their respective owners in the US and other countries.</p>
            </div>
            <div className="col-12">
                <ul className="menu">
                  <li><NavLink to="/">About</NavLink></li>
                  <li><NavLink to="/">Developer</NavLink></li>
                  <li><NavLink to="/">Terms of Service</NavLink></li>
                  <li><NavLink to="/">Privacy Policy</NavLink></li>
                  <li><NavLink to="/">Cookie Policy</NavLink></li>
                  <li><NavLink to="/">Contact</NavLink></li>
                </ul>
            </div> 
          </div>
          </div>
      </footer>
    )
  }
}
