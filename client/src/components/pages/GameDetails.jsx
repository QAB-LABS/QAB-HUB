import React from 'react';

class GameDetails extends React.Component {
  render() {
    const { game } = this.props
    return (
      <div>{game.name}</div>
    )
  }
}

export default GameDetails;
