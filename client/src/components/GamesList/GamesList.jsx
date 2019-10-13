import React from 'react'
import { connect } from 'react-redux'
import GameDetailsRow from '../GameDetailsRow/GameDetailsRow'
import { getGames } from '../../actions/games'

class GameList extends React.Component {
  componentDidMount() {
    this.props.getGames()
  }

  renderGames() {
    return this.props.games.map(game => (
      <GameDetailsRow key={game.id} game={game} />
    ))
  }

  render() {
    const { games } = this.props
    return !games ? null : this.renderGames()
  }
}

const mapStateToProps = state => {
  return {
    games: state.games,
  }
}

export default connect(
  mapStateToProps,
  { getGames }
)(GameList)
