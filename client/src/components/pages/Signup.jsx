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
      <div className="Signup" >
        <h2>Signup</h2>
        <form>
          Username:{' '}
          <input type="text" value={this.state.username} name="username" onChange={this.handleInputChange} />{' '}
          <br />
          Name:{' '}
          <input type="text" value={this.state.name} name="name" onChange={this.handleInputChange} />{' '}
          <br />
          Password:{' '}
          <input type="password" value={this.state.password} name="password" onChange={this.handleInputChange} />{' '}
          <br />
          <button onClick={e => this.handleClick(e)}>Signup</button>
        </form>
        <Alert />
      </div >
    )
  }
}

function mapState(state) {
  return { alert: state.alert };
}

export default connect(mapState, { register: authActions.register })(Signup)
