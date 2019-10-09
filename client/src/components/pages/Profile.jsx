import React from 'react';
import UserCard from '../UserCard'
import GamesList from '../GamesList'
import { connect } from 'react-redux'

class UserProfile extends React.Component {
  componentDidMount() {
  }

  render() {
    return (
      <div className="ui relaxed divided list">
        <UserCard userId={this.props.currentUserId} />
        <GamesList />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { currentUserId: state.auth.userId }
}

export default connect(mapStateToProps, {})(UserProfile);