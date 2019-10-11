import React from 'react'
import UserCard from '../UserCard/UserCard'
import GamesList from '../GamesList/GamesList'
import { connect } from 'react-redux'

class UserProfile extends React.Component {
  componentDidMount() { }

  render() {
    console.log(this.props.match.params)
    return (
      <div className="ui relaxed divided list">
        <UserCard userId={(this.props.match.params) ? this.props.match.params.id : this.props.currentUserId} />
        {/* <GamesList /> */}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { currentUserId: state.auth.userId }
}

export default connect(
  mapStateToProps,
  {}
)(UserProfile)
