import React from 'react'
import PostDetails from '../PostDetails/PostDetails'
import { connect } from 'react-redux'
import { getPosts } from '../../actions/posts'

class Home extends React.Component {
  componentDidMount() {
    this.props.getPosts()
  }

  getPosts = () => {
    return this.props.posts.slice(0, 4).map(post => (
      <PostDetails key={post._id} post={post} />
    ))
  }

  getEvents = () => {
    return this.props.posts.slice(0, 4).map(post => (
      <PostDetails key={post._id} post={post} />
    ))
  }

  getConventions = () => {
    return this.props.posts.slice(0, 4).map(post => (
      <PostDetails key={post._id} post={post} />
    ))
  }

  render() {
    return (
      <div className="Home">
        <div className="ui segments">

          <div className="ui segment">
            <p>Profile</p>
          </div>

          <div className="ui link cards grid">
            {this.getPosts()}
          </div>

          <div className="container">
            <div className="ui grid">
              <div className="eight wide column">
                <div className="segment">
                  <h2>Conventions</h2>
                  <div class="ui one cards">
                    {this.getConventions()}
                  </div>
                </div>
              </div>

              <div className="eight wide column">
                <div className="segment">
                  <h2>Events</h2>
                  <div class="ui one cards">
                    {this.getConventions()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


function mapState(state) {
  return {
    posts: state.posts,
  }
}

const actionCreators = {
  getPosts
};

export default connect(mapState, actionCreators)(Home)