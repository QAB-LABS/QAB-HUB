import React from 'react'
import { connect } from 'react-redux'
import { getGames, getGamesCount } from '../../actions/games'
import GameDetails from './GameDetails'
import Filter from '../generic/Filter'
import ReactPaginate from 'react-paginate';
import './GamesList.scss'

class GameList extends React.Component {
  state = {
    filteredGames: [],
    skip: 0,
    limit: 20
  }

  handlePageClick = data => {
    let pageIndex = data.selected;
    let offset = Math.ceil(pageIndex * this.state.limit);
    this.setState({
      skip: offset,
      filteredGames: this.props.games.slice(offset, this.state.limit + offset)
    });
  };

  componentDidMount() {
    this.props.getGamesCount()
    this.props.getGames()
      .then(() => {
        this.setState({
          filteredGames: this.props.games.slice(this.state.skip, this.state.limit)
        })
      })

  }

  renderGames(games, count) {
    return (
      <React.Fragment>
        {games.map(game => <GameDetails key={game.id} game={game} />)}
        <ReactPaginate
          previousLabel={'prev'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={count.count / this.state.limit}
          marginPagesDisplayed={2}
          pageRangeDisplayed={1}
          onPageChange={this.handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
      </React.Fragment>
    )
  }

  render() {
    const { games, count } = this.props
    const { filteredGames } = this.state
    return (
      <div className="ui segments">
        <div className="ui horizontal segments">
          <div className="container ui grid">

            <div className="four wide column">
              <Filter filters={[
                { heading: "Price", handler: 'handlePriceFilter', values: ['$', '$$', '$$$', '$$$$'] },
                { heading: "Minimum Players", handler: 'handleLocationFilter', values: ['1', '2', '3', '4', '5', '6+'] },
                { heading: "Price", handler: 'handleTakeoutFilter', values: ['takeout'] },
                ]} />
            </div>

            <div className="twelve wide column">
              {(games) ? this.renderGames(filteredGames, count) : null}
            </div>

          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    games: state.games.games,
    count: state.games.count,
  }
}

export default connect(
  mapStateToProps,
  { getGames, getGamesCount }
)(GameList)
