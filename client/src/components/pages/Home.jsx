import React from 'react'
import PostDetails from '../Post/PostDetails'
import ReviewDetails from '../Reviews/ReviewDetails'
import { connect } from 'react-redux'
import { getPosts } from '../../actions/posts'
import { getReviews } from '../../actions/reviews'

class Home extends React.Component {
  componentDidMount() {
    this.props.getPosts()
    this.props.getReviews()
  }

  getPosts = () => {
    return this.props.posts.slice(0, 4).map(post => (
      <PostDetails card="true" key={post._id} post={post} />
    ))
  }

  getEvents = () => {
    return this.props.posts.slice(0, 4).map(post => (
      <PostDetails card="true" key={post._id} post={post} />
    ))
  }

  getConventions = () => {
    return this.props.posts.slice(0, 4).map(post => (
      <PostDetails card="true" key={post._id} post={post} />
    ))
  }

  getReviews = () => {
    return this.props.reviews.slice(0, 4).map(review => (
      <ReviewDetails card="true" key={review._id} review={review} />
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
              <div className="four wide column">
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

              <div className="four wide column">
                <div className="segment">
                  <h2>Recent Reviews</h2>
                  <div className="ui one cards">
                    {this.getReviews()}
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
    reviews: state.reviews.all
  }
}

const actionCreators = {
  getPosts,
  getReviews
};

export default connect(mapState, actionCreators)(Home)