import React from 'react'
import { authActions } from '../../actions/auth'
import { connect } from 'react-redux'

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
      <div class="container">
        <div class="row">
          <div class="col-6 loginInfo">
              <img src="/images/meeple_heart4.png" alt="" />
          </div>
          <div class="col-6">
            <h2>Login</h2>
            <form onSubmit={this.handleSubmit}>
                <label for="username">Username</label>
                <input type="text" name="username" onChange={this.handleChange} />

                <label for="password">Password</label>
                <input type="password" name="password" onChange={this.handleChange} />
                
                <button className="large submit button">Login</button>
            </form>
            <div className="ui message">
                New to us?
                <a href='/signup'>Sign Up</a>
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
