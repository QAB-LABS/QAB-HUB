import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import GoogleAuth from '../GoogleAuth/GoogleAuth'
import api from '../../apis/backend'

class Login extends React.Component {
    handleLogoutClick = () => {
        api.logout()
    }

    render() {
        return (
            <div class="container">
                <div class="row">
                    <div class="col-4">
                        <img src="/images/meeple_heart4.png" alt="" />
                    </div>
                    <div class="col-8">
                    <form className="ui large form">
                        <label for="email">Email Address</label>
                        <input type="text" name="email" placeholder="E-mail address" />

                        <label for="password">Password</label>
                        <input type="password" name="password" placeholder="Password" />
                        
                        <div className="large submit button">Login</div>
                    </form>
                    <div className="ui message">
                        New to us?
                        <a href='/signup'>Sign Up</a>
                    </div>
                    {api.isLoggedIn() && (<NavLink to="/" onClick={this.handleLogoutClick}>Logout</NavLink>)}
                    <GoogleAuth />
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return { currentUserId: state.auth.userId }
}

export default connect(mapStateToProps, {})(Login)
