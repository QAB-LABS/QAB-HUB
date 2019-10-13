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
            <div className="ui middle aligned center aligned grid">
                <form className="ui large form">
                    <div className="ui stacked segment">
                        <div className="field">
                            <div clasSName="ui left icon input">
                                <i className="user icon" />
                                <input type="text" name="email" placeholder="E-mail address" />
                            </div>
                        </div>
                        <div className="field">
                            <div clasSName="ui left icon input">
                                <i className="lock icon" />
                                <input type="password" name="password" placeholder="Password" />
                            </div>
                        </div>
                        <div className="ui fluid large submit button">Login</div>
                    </div>
                </form>
                <div className="ui message">
                    New to us?
                    <a href='/signup'>Sign Up</a>
                </div>
                {api.isLoggedIn() && (<NavLink to="/" onClick={this.handleLogoutClick}>Logout</NavLink>)}
                <GoogleAuth />
            </div>
        )
    }
}


const mapStateToProps = state => {
    return { currentUserId: state.auth.userId }
}

export default connect(mapStateToProps, {})(Login)
