import React from 'react'
import { getGame } from '../../actions/games'
import { connect } from 'react-redux'
import ReviewsList from '../Reviews/ReviewsList'
import ReviewForm from '../Reviews/ReviewForm'
import api from '../../apis/backend'


class GameDetails extends React.Component {
  state = {
    forceUpdate : false,
    needForm: ''
  }

  componentDidMount() {
    this.props.getGame(this.props.match.params.id)
  }

  likeGame = async() => {
    console.log(this.props.game.game)
    const res = await api.addLike({
      user: this.props.user, 
      game: this.props.game.game
    })
    this.setState({forceUpdate: true})
  }

  leaveReview = async() =>{
    this.setState({ needForm: true })

  }

  closeReview = () =>{
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

  renderDetails = (min_players, max_players, min_playtime, max_playtime, min_age, mechanics, categories) => { 
    return(
      <table>
        <tbody>
          <tr><td>Players: </td><td>{min_players}-{max_players}</td></tr>
          <tr><td>Playtime: </td><td>{min_playtime}-{max_playtime}</td></tr>
          <tr><td>Min Age: </td><td>{min_age}</td></tr>
          <tr><td>MSRVP: </td><td>...</td></tr>
          <tr><td>Mechanics: </td><td>{mechanics.join(' ')}</td></tr>
          <tr><td>Categories: </td><td>{categories.join(' ')}</td></tr>
        </tbody>
      </table>
    )
  }

  renderMainContent = () =>{
    let name, image, categories, description, reviews, ratings, min_players, max_players, min_playtime, max_playtime, min_age, mechanics, designers, artists, year_published, likes;

    if (this.props.game.game) {
      ({ name, image, categories, description, reviews, ratings, min_players, max_players, min_playtime, max_playtime, mechanics, designers, artists, year_published, likes } = this.props.game.game)
    }

    return (
      <>
        <div>
          <h1>{name}</h1>
          <p>{likes.length} LIKES</p>
          <img src={image} />
          <h2>Description</h2>
          <section>{description}</section>
          <h2>Additional Details</h2>
          {this.renderAdditionalDetails(year_published, designers, artists)}
          {this.state.needForm ? <div><button onClick ={this.closeReview}>x</button><ReviewForm game = {this.props.game.game}/></div> : <button onClick = {this.leaveReview}>Leave a Review</button>}
          <ReviewsList reviews = {reviews}/>
        </div>
        <div>
          <section>
            <h2>Details</h2>
            {this.renderDetails(min_players, max_players, min_playtime, max_playtime, min_age, mechanics, categories)}
          </section>
          <section>
            <button onClick = {this.likeGame}>Like this Game</button>
            <button onClick = {this.leaveReview}>Leave A Review</button>
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
