import React from 'react'
import Alert from '../generic/Alert'
import { authActions } from '../../actions/auth'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'


class Login extends React.Component {
  state = {
    username: '',
    password: '',
    submitted: false
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ submitted: true });
    const { username, password } = this.state;
    if (username && password) {
      this.props.login(username, password);
    }
  }

  render() {
    return (
      <div className="container form">
        <div className="row">
          <div className="col-6 formInfo">
            <img src="/images/meeple_heart4.png" alt="" />
          </div>
          <div className="col-6 formEntry">
            <h2>Login to your BGS</h2>
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="username">Username</label>
              <input type="text" name="username" onChange={this.handleChange} required />

              <label htmlFor="password">Password</label>
              <input type="password" name="password" onChange={this.handleChange} required />

              <button className="purple large submit button">Login</button>
            </form>
            <Alert />
            <div className="message">
              Start your own board game silo. <NavLink to='/signup'>Sign up</NavLink>
            </div>
            {this.state.message && <div className="info info-danger">{this.state.message}</div>}
          </div>
        </div>
      </div>
    )
  }
}


function mapState(state) {
  const { loggingIn } = state.authentication;
  return { loggingIn };
}

const actionCreators = {
  login: authActions.login,
  logout: authActions.logout
};

export default connect(mapState, actionCreators)(Login)
