import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class Footer extends Component {
  render() {
    return (
      <footer className="siteFooter">
          <div className="container footer">
          <div className="row">
              <div className="col-2">
                BGS Logo
              </div>
              <div className="col-6">
                <ul>
                  <li><NavLink to="/games">Board Games</NavLink></li>
                  <li><NavLink to="/games">Events</NavLink></li>
                  <li><NavLink to="/games">Groups</NavLink></li>
                </ul>
              </div>
              <div className="col-4">
                <ul>
                  <li><NavLink to="/games">FB</NavLink></li>
                  <li><NavLink to="/games">Instagram</NavLink></li>
                  <li><NavLink to="/games">Reddit</NavLink></li>
                  <li><NavLink to="/games">Twitter</NavLink></li>
                </ul>
              </div>
          </div>
          <div className="row">
            <div className="col-12">
                <p>&copy; Board Game Silo. All rights reserved. All trademarks are property of their respective owners in the US and other countries.</p>
            </div>
            <div className="col-12">
                <ul>
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
