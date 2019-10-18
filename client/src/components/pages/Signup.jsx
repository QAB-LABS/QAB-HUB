import React from 'react'
import Alert from '../generic/Alert'
import { authActions } from '../../actions/auth'
import { connect } from 'react-redux'

class Signup extends React.Component {
  state = {
    username: '',
    name: '',
    email: '',
    password: ''
  }

  handleInputChange = (event) => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value,
    })
  }

  handleClick = (e) => {
    e.preventDefault()
    let data = {
      username: this.state.username,
      name: this.state.name,
      password: this.state.password,
      email: this.state.email,
    }
    this.props.register(data)
  }

  render() {
    const { message } = this.props.alert

    if (message && message.type === 'alert-success') this.props.history.push('/')

    return (
      <div className="container form">
        <div className="row">
          <div className="col-6 formInfo">
            <img src="/images/meeple_heart4.png" alt="" />
          </div>
          <div className="col-6 formEntry">
            <h2>Signup for a BGS account</h2>
            <form onSubmit={this.handleSubmit}>
              <label for="username">Username</label>
              <input type="text" value={this.state.username} name="username" onChange={this.handleInputChange} required />

              <label for="name">Name</label>
              <input type="text" value={this.state.name} name="name" onChange={this.handleInputChange} required />

              <label for="email">Email Address</label>
              <input type="text" value={this.state.email} name="email" onChange={this.handleInputChange} required />

              <label for="password">Password</label>
              <input type="password" value={this.state.password} name="password" onChange={this.handleInputChange} required />

              <button className="purple large submit button" onClick={e => this.handleClick(e)}>Signup</button>
            </form>
            <Alert />
            <div>
              Start your own board game silo. <a href='/login'>If you already have an account, log in.</a>
            </div>
            {this.state.message && <div className="info info-danger">{this.state.message}</div>}
          </div>
        </div>
      </div>
    )
  }
}

function mapState(state) {
  return { alert: state.alert };
}

export default connect(mapState, { register: authActions.register })(Signup)
