import React from 'react'
import UserCard from '../UserCard/UserCard'
import GamesList from '../GamesList/GamesList'
import { connect } from 'react-redux'

class UserProfile extends React.Component {
  render() {
    return (
      <div className="ui segments">
        <div className="ui segment">
          <p>Profile</p>
        </div>
        <div className="ui segments">
          <UserCard userId={(this.props.match.params) ? this.props.match.params.id : this.props.currentUserId} />
        </div>
        <div className="ui segment">
          <p>Middle</p>
        </div>
        <div className="ui horizontal segments">
          <div className="container ui grid">
            <div className="four wide column">
              <div className="ui segment">
                <p>Description</p>
                <p>
Sed euismod, erat quis varius facilisis, magna dui tempus nunc, at scelerisque ex massa id nisi.</p>
              </div>
              <div className="ui segment">
                <p>User Level</p>
                <p>Like totally 15 or something</p>
                <p>Some other info</p>
              </div>
              <div className="ui segment">
                <p>Avatars Unlocked</p>
                <p>I dunno...two?</p>
              </div>
            </div>

            <div className="twelve wide column">
              <div className="ui segment">
                <p>Posts</p>
              </div>
              <div className="ui segment">
                <p>Friends</p>
              </div>
            </div>
          </div>
        </div>
        <div className="ui segment">
          <p>Games List</p>
          <GamesList />
        </div>
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
