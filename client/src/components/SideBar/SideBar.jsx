import React from 'react'
import { NavLink } from 'react-router-dom'
import { withRouter } from 'react-router'

class SideBar extends React.Component {
    render() {
        return (
            <div className="ui thin left vertical inverted sidebar menu visible ">

                <div className="item">
                    <i className="home icon"></i>
                    <NavLink to="/">Home</NavLink>
                </div>

                <div className="item">
                    <i className="gamepad icon"></i>
                    <NavLink to="/games">Games</NavLink>
                </div>

                <div className="item">
                    <i className="search icon"></i>
                    <NavLink to="/search">Search</NavLink>
                </div>

            </div >
        )
    }
}


export default withRouter(SideBar)