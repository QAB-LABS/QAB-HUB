import React from 'react';
import { connect } from 'react-redux'

class UserCard extends React.Component {
  render() {
    const { user } = this.props
    return (!user) ? null : <div className="header"> {user.name} </div>
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.users.find(user => user.id === ownProps.userId),
  }
}

export default connect(mapStateToProps)(UserCard);