import React from 'react'
import GameDetails from './GameDetails'
import './GamesList.scss'


const GameList = ({ games }) => {

  const renderGames = (games) => {
    return (
      <div className="row">
        <div className="container">
          {games.map(game => <GameDetails card={true} key={game._id} game={game} />)}
        </div>
      </div>
    )
  }

  return (
    <React.Fragment>{games ? renderGames(games) : null}</React.Fragment>
  )
}


export default GameList;