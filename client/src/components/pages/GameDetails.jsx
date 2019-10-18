import React from 'react'
import { getGame } from '../../actions/games'
import { connect } from 'react-redux'
import ReviewsList from '../Reviews/ReviewsList'

class GameDetails extends React.Component {
  componentDidMount() {
    const val = this.props.getGame(this.props.match.params.id)
    
  }

  renderAdditionalDetails = (year_published, designers, artists) => {
    return (
      <table>
        <tr><td>Published: </td><td>{year_published}</td></tr>
        <tr><td>Designers: </td><td>{designers}</td></tr>
        <tr><td>Artists: </td><td>{artists}</td></tr>
        <tr><td>Alternative Name: </td><td>...</td></tr>
        <tr><td>Size: </td><td>...</td></tr>
        <tr><td>Weight: </td><td>...</td></tr>
      </table>
    )
  }

  renderDetails = (min_players, max_players, min_playtime, max_playtime, min_age, mechanics, categories) => { 
    return(
      <table>
        <tr><td>Players: </td><td>{min_players}-{max_players}</td></tr>
        <tr><td>Playtime: </td><td>{min_playtime}-{max_playtime}</td></tr>
        <tr><td>Min Age: </td><td>{min_age}</td></tr>
        <tr><td>MSRVP: </td><td>...</td></tr>
        <tr><td>Mechanics: </td><td>{mechanics.join(' ')}</td></tr>
        <tr><td>Categories: </td><td>{categories.join(' ')}</td></tr>

      </table>
    )
  }

  renderMainContent = () =>{
    let name, image, categories, description, reviews, ratings, min_players, max_players, min_playtime, max_playtime, min_age, mechanics, designers, artists, year_published;

    if (this.props.game.games) {
      ({ name, image, categories, description, reviews, ratings, min_players, max_players, min_playtime, max_playtime, mechanics, designers, artists, year_published } = this.props.game.games)
    }

    return (
      <>
        <div className>
          <h1>{name}</h1>
          <img src={image} />
          <h2>Description</h2>
          <section>{description}</section>
          <h2>Additional Details</h2>
          {this.renderAdditionalDetails(year_published, designers, artists)}
          <ReviewsList reviews = {reviews}/>
        </div>
        <div>
          <section>
            <h2>Details</h2>
            {this.renderDetails(min_players, max_players, min_playtime, max_playtime, min_age, mechanics, categories)}
          </section>
          <section>
            <button>Like this Game</button>
            <button>Leave A Review</button>
            <button>Add To Wishlist</button>
            <button>Owned</button>
            <button>Add To Play Queue</button>
            <button>Log A Gameplay</button>
          </section>
        </div>
      </>
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
        {this.props.game.games ? this.renderMainContent() : null}

      </>
    )
  }
}

function mapState(state) {
  return {
    game: state.games
  }
}

const actionCreators = {
  getGame
};

export default connect(mapState, actionCreators)(GameDetails)
