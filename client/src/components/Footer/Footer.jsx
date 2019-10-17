import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class Footer extends Component {
  render() {
    return (
      <footer className="siteFooter">
        <div className="container">
          <div className="row">
              <div className="col-2">
                BGS Logo
              </div>
              <div className="col-6">
                  BoardGames Events Groups
              </div>
              <div className="col-4">
                  Facebook Instagram Reddit Twitter
              </div>
          </div>
          <div className="row">
            <div className="col-12">
                &copy; Board Game Silo. All rights reserved. All trademarks are property of their respective owners in the US and other countries.
            </div>
            <div className="col-12">
                About Developer Terms of Service Privacy Policy Cookie Policy Contact
            </div> 
          </div>
        </div>
      </footer>
    )
  }
}
