import React from 'react'
import { getGame } from '../../actions/games'
import { connect } from 'react-redux'
import ReviewsList from '../Reviews/ReviewsList'
import ReviewForm from '../Reviews/ReviewForm'
import api from '../../apis/backend'


class GameDetails extends React.Component {
  state = {
    forceUpdate: false,
    needForm: '',
    myLike: null
  }

  componentDidMount() {
    this.props.getGame(this.props.match.params.id)
  }

  likeGame = async () => {
    if (this.state.myLike) {
      api.deleteLike(this.state.myLike._id)
        .then(res => {
          this.setState({ forceUpdate: true, myLike: null })
        }).catch(() => console.log('Could not unlike this game.'))
      return
    }

    api.addLike({
      user: this.props.user,
      game: this.props.game.game
    }).then(res => {
      this.setState({ forceUpdate: true, myLike: res })
    }).catch(() => console.log('You already liked this game.'))
  }

  leaveReview = async () => {
    this.setState({ needForm: true })
  }

  closeReview = () => {
    this.setState({ needForm: false })
  }


  renderAdditionalDetails = (year_published, designers, artists) => {
    return (
      <table>
        <tbody>
          <tr><td>Published: </td><td>{year_published}</td></tr>
          <tr><td>Designers: </td><td>{designers}</td></tr>
          <tr><td>Artists: </td><td>{artists}</td></tr>
          <tr><td>Alternative Name: </td><td>...</td></tr>
          <tr><td>Size: </td><td>...</td></tr>
          <tr><td>Weight: </td><td>...</td></tr>
        </tbody>
      </table>
    )
  }

  renderDetails = (price, min_players, max_players, min_playtime, max_playtime, min_age, mechanics, categories) => {
    return (
      <table>
        <tbody>
          <tr><td>Players: </td><td>{min_players}-{max_players}</td></tr>
          <tr><td>Playtime: </td><td>{min_playtime}-{max_playtime}</td></tr>
          <tr><td>Min Age: </td><td>{min_age ? min_age : 'N/A'}</td></tr>
          <tr><td>MSRP: </td><td>{`$${(price ? price : 0).toFixed(2)}`}</td></tr>
          <tr><td>Mechanics: </td><td>{mechanics.join(',')}</td></tr>
          <tr><td>Categories: </td><td>{categories.join(',')}</td></tr>
        </tbody>
      </table>
    )
  }

  renderMainContent = () => {
    let name, image, categories, description, reviews, price, min_players, max_players, min_playtime, max_playtime, min_age, mechanics, designers, artists, year_published, likes;

    if (this.props.game.game) {
      ({ name, image, categories, description, reviews, price, min_players, max_players, min_playtime, max_playtime, min_age, mechanics, designers, artists, year_published, likes } = this.props.game.game)
    }

    return (
        <div className="oneGame container">
          <div className="row">
            <div className="col-9">
              <h1>{name}</h1>
              <p>{likes.length} LIKES</p>
              <div className="imageWrapper maxSize">
                <img src={image} alt={`${name}-box-art`}/>
              </div>
              <section className="description">
                <h2>Description</h2>
                {description}
              </section>
              <section className="addionalDetails">
                <h2>Additional Details</h2>
                {this.renderAdditionalDetails(price, year_published, designers, artists)}
              </section>
              <section className="writeReview">
              {this.state.needForm ? <div><button className="button large purple" onClick={this.closeReview}>x</button><ReviewForm closeCallback={this.closeReview} game={this.props.game.game} /></div> : <button  className="button large purple" onClick={this.leaveReview}>Leave a Review</button>}
              </section>
              <section className="reviewList">
              <ReviewsList reviews={reviews} />
              </section>
            </div>
            <div className="col-3">
              <section>
                <h2>Details</h2>
                {this.renderDetails(price, min_players, max_players, min_playtime, max_playtime, min_age, mechanics, categories)}
              </section>
              <section>
                <button className="button large" onClick={this.likeGame}>Like this Game</button>
                <button className="button large" onClick={this.leaveReview}>Leave A Review</button>
                <button className="button large">Add To Wishlist</button>
                <button className="button large">Owned</button>
                <button className="button large">Add To Play Queue</button>
                <button className="button large">Log A Gameplay</button>
              </section>
            </div>
          </div>
        </div>
    )
  }

  sampleFunction = () => {
    return (
      <></>
    )
  }

  render() {
    return (
      <>
        {
          this.props.game.game ? this.renderMainContent() : null
        }

      </>
    )
  }
}

function mapState(state) {
  return {
    game: state.games,
    user: state.authentication.user
  }
}

const actionCreators = {
  getGame
};

export default connect(mapState, actionCreators)(GameDetails)
