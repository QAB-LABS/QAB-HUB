import React from 'react'
import PostDetails from '../Post/PostDetails'
import ReviewDetails from '../Reviews/ReviewDetails'
import { connect } from 'react-redux'
import { getPosts } from '../../actions/posts'
import { getReviews } from '../../actions/reviews'
import { getGames } from '../../actions/games'
import GameDetails from '../Games/GameDetails'

class Home extends React.Component {
  componentDidMount() {
    this.props.getPosts()
    this.props.getReviews()
    this.props.getGames(0, 6, 'ratings,categories,likes')
  }

  getPosts = () => {
    return this.props.posts.slice(0, 4).map(post => (
      <PostDetails card='true' key={post._id} post={post} />
    ))
  }

  getReviews = () => {
    return this.props.reviews.slice(0, 4).map(review => (
      <ReviewDetails card='true' key={review._id} review={review} />
    ))
  }

  renderTrendingGames = () => {
    return (
      <>
        <div className='row'>
        {this.props.games.slice(0, 3).map(game => (<GameDetails key={game._id} game={game} />))}
        </div>
        <div className = 'row'>
        {this.props.games.slice(3, 6).map(game => (<GameDetails key={game._id} game={game} />))}
        </div>
      </>
    )
  }

  renderNewestGames = () => {
    return this.props.games.slice(0,3).map(game =>(<GameDetails key={game._id} game = {game}/>))
  }

  render() {
    return (

      <section className='Home'>

        <section className='trending container'>
          <h2>Trending</h2>
          <div className = 'container'>
            {this.renderTrendingGames()}
          </div>
        </section>

        <img style={{width: "50%"}} src= "https://s3.amazonaws.com/conventionimages.tabletop.events/C4409D10-69D0-11E9-A67D-738802F0A829/1D6BF11A-69D5-11E9-B536-D7D7686004F6/tabletop-events-logo.jpg" alt = "orlando games con 2019 banner"/>

        <section className='newest container'>
          <h2>New {'&'} Upcoming Games</h2>
          <div className = 'row'>
            {this.renderNewestGames()}
          </div>
        </section>

        <section className='reviews container'>
        <h2>Recent Reviews</h2>
        {this.getReviews()}
        </section>

        <section className='posts container'>
          <h2>Recent Posts</h2>
          {this.getPosts()}
        </section>

      </section>
    )
  }
}


function mapState(state) {
  return {
    posts: state.posts.all,
    reviews: state.reviews.all,
    games: state.games.all
  }
}

const actionCreators = {
  getPosts,
  getReviews,
  getGames
};

export default connect(mapState, actionCreators)(Home)
