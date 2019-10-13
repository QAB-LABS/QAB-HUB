import React from 'react'
import PostCard from '../PostDetails/PostCard'
import { connect } from 'react-redux'
import { getPosts } from '../../actions/posts'

class Home extends React.Component {
  componentDidMount() {
    this.props.getPosts()
    console.log(this.props)
  }

  getPosts = () => {
    return this.props.posts.slice(0, 4).map(post => (
      <PostCard key={post._id} post={post} />
    ))
  }

  getEvents = () => {
    return this.props.posts.slice(0, 4).map(post => (
      <PostCard key={post._id} post={post} />
    ))
  }

  getConventions = () => {
    return this.props.posts.slice(0, 4).map(post => (
      <PostCard key={post._id} post={post} />
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
                  <div className="ui one cards">
                    {this.getConventions()}
                  </div>
                </div>
              </div>

              <div className="eight wide column">
                <div className="segment">
                  <h2>Events</h2>
                  <div className="ui one cards">
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
    posts: state.posts.all,
  }
}

const actionCreators = {
  getPosts
};

export default connect(mapState, actionCreators)(Home)