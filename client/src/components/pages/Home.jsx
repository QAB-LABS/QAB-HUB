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

      <section className="Home">

        <section className="userPosts container">
          <h2>User Posts</h2>
          
          {this.getPosts()}
        </section>

        <section className="Conventions">
        <h2>Conventions</h2>
        {this.getConventions()}
        </section>

        <section className="events">
          <h2>Events</h2>
          {this.getConventions()}
        </section>

        <section className="recentReviews">
          <h2>Recent Reviews</h2>
          {this.getReviews()}
        </section>

      </section>
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
