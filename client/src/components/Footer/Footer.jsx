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
              <div className="col-2">
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
                  <li>Kiwi Lin <a href="https://github.com/Kiwi-x-Kiwi" target="_blank" rel="noopener noreferrer" ><FontAwesomeIcon icon={['fab', 'github']} /></a> <a href="https://www.linkedin.com/in/kiwilin/" target="_blank" rel="noopener noreferrer" ><FontAwesomeIcon icon={['fab', 'linkedin']} /></a></li>
                  <li>Andres Weber <a href="https://github.com/AndresMWeber" target="_blank" rel="noopener noreferrer" ><FontAwesomeIcon icon={['fab', 'github']} /></a> <a href="https://www.linkedin.com/in/andresweber/" target="_blank" rel="noopener noreferrer" ><FontAwesomeIcon icon={['fab', 'linkedin']} /></a></li>
                  <li>Bobby Wang <a href="https://github.com/bobbypwang" target="_blank" rel="noopener noreferrer" ><FontAwesomeIcon icon={['fab', 'github']} /></a> <a href="https://www.linkedin.com/in/bobbypwang/" target="_blank" rel="noopener noreferrer" ><FontAwesomeIcon icon={['fab', 'linkedin']} /></a></li>
                </ul>
              </div>
              <div className="col-4 social">
                <ul className="menu">
                  <li><a href="https://facebook.com/boardgamesilo" target="_blank" rel="noopener noreferrer" ><FontAwesomeIcon icon={['fab', 'facebook']} /></a></li>
                  <li><a href="https://instagram.com/boardgamesilo" target="_blank" rel="noopener noreferrer" ><FontAwesomeIcon icon={['fab', 'instagram']} /></a></li>
                  <li><a href="https://reddit.com/r/boardgamesilo" target="_blank" rel="noopener noreferrer" ><FontAwesomeIcon icon={['fab', 'reddit']} /></a></li>
                  <li><a href="https://twitter.com/boardgamesilo" target="_blank" rel="noopener noreferrer" ><FontAwesomeIcon icon={['fab', 'twitter']} /></a></li>
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
