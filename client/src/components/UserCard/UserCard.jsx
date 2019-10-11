import React from 'react'
import { getUser } from '../../actions/users'
import { connect } from 'react-redux'

class UserCard extends React.Component {
  componentDidMount() {
    this.props.getUser(this.props.userId)
  }

  render() {
    const { user } = this.props
    return (!user) ? null : <div className="header"> <h1>{user.username}</h1> </div>
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.users.selectedUser,
  }
}

export default connect(mapStateToProps, { getUser })(UserCard);