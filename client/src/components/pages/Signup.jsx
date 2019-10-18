import React from 'react'
import Alert from '../generic/Alert'
import { authActions } from '../../actions/auth'
import { connect } from 'react-redux'

class Signup extends React.Component {
  state = {
    username: '',
    name: '',
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
    }
    this.props.register(data)
  }

  render() {
    const { message } = this.props.alert

    if (message && message.type === 'alert-success') this.props.history.push('/')

    return (
      <div class="container form">
      <div class="row">
        <div class="col-6 formInfo">
          <img src="/images/meeple_heart4.png" alt="" />
        </div>
        <div class="col-6 formEntry">
          <h2>Signup for a BGS account</h2>
          <form onSubmit={this.handleSubmit}>
            <label for="username">Username</label>
            <input type="text" value={this.state.username} name="username" onChange={this.handleInputChange} required />

            <label for="name">Name</label>
            <input type="text" value={this.state.name} name="name" onChange={this.handleInputChange} required />

            <label for="email">Email Address</label>
            <input type="text" value={this.state.email} name="emaile" onChange={this.handleInputChange} required />
  
            <label for="password">Password</label>
            <input type="password" value={this.state.password} name="password" onChange={this.handleInputChange} required />
  
            <button className="purple large submit button" onClick={e => this.handleClick(e)}>Signup</button>
          <Alert />
          </form>
          <div className="message">
            Start your own board game silo. <a href='/signup'>Sign up</a>
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
