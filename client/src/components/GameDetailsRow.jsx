import React from 'react';

class GameDetailsRow extends React.Component {
  render() {
    const { game } = this.props
    return (
      <div>{game}</div>
    )
  }
}

export default GameDetailsRow;
