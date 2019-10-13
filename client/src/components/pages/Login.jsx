import React from 'react'
import api from '../../apis/backend'
import { login, logout, loginSuccess } from '../../actions/users'
import { connect } from 'react-redux'

class Login extends React.Component {
  state = {
    message: null,
    username: '',
    password: '',
  }

  handleInputChange = (e) => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    api
      .login(this.state.username, this.state.password)
      .then(result => {
        this.loginSuccessUser(result.data)
        console.log('SUCCESS!')
        this.state.history.push('/') // Redirect to the home page
      })
      .catch(err => this.setState({ message: err.toString() }))
  }

  render() {
    return (
      <div className="Login">
        <h2>Login</h2>
        <form onSubmit={this.handleSubmit}>
          Username: <input type="text" name="username" onChange={this.handleInputChange} /> <br />
          Password: <input type="password" name="password" onChange={this.handleInputChange} />
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
  login,
  logout
};

export default connect(mapState, actionCreators)(Login)
