import React from 'react'
import PostDetails from '../Post/PostDetails'
import ReviewDetails from '../Reviews/ReviewDetails'
import { connect } from 'react-redux'
import { getPosts } from '../../actions/posts'
import { getReviews } from '../../actions/reviews'
import { searchGames, getGames } from '../../actions/games'
import GameDetails from '../Games/GameDetails'
import api from '../../apis/backend'

class Home extends React.Component {
  state ={
    newGames: ""
  }

  async componentDidMount() {
    this.props.getPosts(0, 6, 'author')
    this.props.getReviews(0, 6, 'author, game')
    this.props.getGames(0, 12, 'ratings,categories,likes')

    const newestGames = await api.searchGames(null, 0, 3 , { year_published: 1 }, 'ratings categories likes')

    this.setState({
      newGames: newestGames
    })
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
        <div className='row cards'>
        {this.props.games.slice(0, 3).map(game => (<GameDetails card='true' key={game._id} game={game} />))}
        </div>
        <div className = 'row cards'>
        {this.props.games.slice(3, 6).map(game => (<GameDetails card='true' key={game._id} game={game} />))}
        </div>
      </>
    )
  }

  renderNewestGames = () => {
    return (
      <>
      <div className='row cards'>
      {this.props.games.slice(6,9).map(game =>(<GameDetails card='true' key={game._id} game={game}/>))}
      </div>
      <div className='row cards'>
      {this.props.games.slice(9,12).map(game =>(<GameDetails card='true' key={game._id} game={game}/>))}
      </div>
      </>
    )
  }

  render() {
    return (

      <section className='Home'>

        <section className='trending container'>
          <div className="row">
            <h2>Trending Games</h2>
            </div>
              {this.renderTrendingGames()}
        </section>

        <section className="conventionBanner container">
          <div className="row">
              <img style={{width: "50%"}} src= "https://s3.amazonaws.com/conventionimages.tabletop.events/C4409D10-69D0-11E9-A67D-738802F0A829/1D6BF11A-69D5-11E9-B536-D7D7686004F6/tabletop-events-logo.jpg" alt = "orlando games con 2019 banner"/>
          </div>
        </section>

        <section className='newest container'>
          <div className="row">
            <h2>New {'&'} Upcoming Games</h2>
            </div>
            {this.renderNewestGames()}
        </section>

        <section className='reviewsPost container'>
          <div className="row">
            <div className="col-6">
              <section className='reviews cards'>
                <h2>Recent Reviews</h2>
                {this.getReviews()}
              </section>
            </div>
            <div className="col-6">
              <section className='posts cards'>
                <h2>Recent Posts</h2>
                {this.getPosts()}
              </section>
            </div>
          </div>
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
