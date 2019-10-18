import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class Footer extends Component {
  render() {
    return (
      <footer className="siteFooter">
          <div className="container footer">
          <div className="row">
              <div className="col-3">
                <div className="logo">
                  <NavLink to="/">
                    <img src="/images/board-game-silo-logo-white.png" alt="Board Game Silo Logo consisting of letters BGS and 3 silos" />
                  </NavLink>
                </div>
                <NavLink to="/">
                    <h1>Board Game Silo</h1>
                  </NavLink>
              </div>
              <div className="col-3">
                  <ul className="menu">
                    <li className="title">Site</li>
                    <li><NavLink to="/games">Board Games</NavLink></li>
                    <li><NavLink to="/games">Events</NavLink></li>
                    <li><NavLink to="/games">Groups</NavLink></li>
                    <li><NavLink to="/">About</NavLink></li>
                  </ul>
              </div>
              <div className="col-3">
              <ul className="menu">
                  <li className="title">Misc</li>
                  <li><NavLink to="/">Developer</NavLink></li>
                  <li><NavLink to="/">Terms of Service</NavLink></li>
                  <li><NavLink to="/">Privacy Policy</NavLink></li>
                  <li><NavLink to="/">Contact</NavLink></li>
                </ul>
              </div>
              <div className="col-4 social">
                <ul className="menu">
                  <li><NavLink to="https://facebook.com/boardgamesilo" target="_blank"><FontAwesomeIcon icon={['fab', 'facebook']} /></NavLink></li>
                  <li><NavLink to="https://instagram.com/boardgamesilo" target="_blank"><FontAwesomeIcon icon={['fab', 'instagram']} /></NavLink></li>
                  <li><NavLink to="https://reddit.com/r/boardgamesilo" target="_blank"><FontAwesomeIcon icon={['fab', 'reddit']} /></NavLink></li>
                  <li><NavLink to="https://twitter.com/boardgamesilo" target="_blank"><FontAwesomeIcon icon={['fab', 'twitter']} /></NavLink></li>
                </ul>
                <div className="copy">
                  &copy; Board Game Silo. All rights reserved. All trademarks are property of their respective owners in the US and other countries.
                </div>
              </div>
          </div>
          </div>
      </footer>
    )
  }
}
