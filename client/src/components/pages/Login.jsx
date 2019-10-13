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
      <div className="Login">
        <h2>Login</h2>
        <form onSubmit={this.handleSubmit}>
          Username: <input type="text" name="username" onChange={this.handleChange} /> <br />
          Password: <input type="password" name="password" onChange={this.handleChange} />
          <br />
          <button>Login</button>
        </form>
        {this.state.message && <div className="info info-danger">{this.state.message}</div>}
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
