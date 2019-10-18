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
                  <li className="title">Authors</li>
                  <li>Kiwi Lin <NavLink to="https://github.com/Kiwi-x-Kiwi" target="_blank"><FontAwesomeIcon icon={['fab', 'github']} /></NavLink> <NavLink to="https://www.linkedin.com/in/kiwilin/" target="_blank"><FontAwesomeIcon icon={['fab', 'linkedin']} /></NavLink></li>
                  <li>Andres Weber <NavLink to="https://github.com/AndresMWeber" target="_blank"><FontAwesomeIcon icon={['fab', 'github']} /></NavLink> <NavLink to="https://www.linkedin.com/in/andresweber/" target="_blank"><FontAwesomeIcon icon={['fab', 'linkedin']} /></NavLink></li>
                  <li>Bobby Wang <NavLink to="https://github.com/bobbypwang" target="_blank"><FontAwesomeIcon icon={['fab', 'github']} /></NavLink> <NavLink to="https://www.linkedin.com/in/bobbypwang/" target="_blank"><FontAwesomeIcon icon={['fab', 'linkedin']} /></NavLink></li>
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
