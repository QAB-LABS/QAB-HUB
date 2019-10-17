import React from 'react'
import GamesList from '../Games/GamesList'
import { connect } from 'react-redux'
import { getGames, getGamesCount, setFilteredGames } from '../../actions/games'
import Filter from '../generic/Filter'
import ReactPaginate from 'react-paginate';

class Games extends React.Component {
  state = {
    skip: 0,
    limit: 12
  }

  componentDidMount() {
    this.props.getGamesCount()
    this.props.getGames()
      .then(() => {
        this.props.setFilteredGames(this.state.skip, this.state.limit + this.state.skip)
      })
  }

  handlePageClick = data => {
    let pageIndex = data.selected;
    let offset = Math.ceil(pageIndex * this.state.limit);
    this.setState({
      skip: offset,
    }, () => {
      this.props.setFilteredGames(this.state.skip, this.state.limit + this.state.skip)
    });
  };

  render() {
    const { count, filteredGames } = this.props
    const { skip, limit } = this.state

    return (
      <div className="Games" >
        <div className="ui segments">
          <div className="games-description">
            <span>Showing {`${skip + 1}-${limit + skip} of ${count ? count.count : 0} results for FILTERS`}</span>
            <div className="right">
              <i className="icon th" />
              <i className="icon th list" />
            </div>
          </div>
          <div className="ui horizontal segments">
            <div className="ui grid">
              <div className="two wide column">
                <Filter filters={[
                  { heading: "Price", handler: 'handlePriceFilter', values: ['$', '$$', '$$$', '$$$$'] },
                  { heading: "Minimum Players", handler: 'handleLocationFilter', values: ['1', '2', '3', '4', '5', '6+'] },
                  { heading: "Price", handler: 'handleTakeoutFilter', values: ['takeout'] },
                ]} />
              </div>

              <div className="fourteen wide column">
                <GamesList games={filteredGames} />
                <ReactPaginate
                  previousLabel={'<'}
                  nextLabel={'>'}
                  breakLabel={'...'}
                  breakClassName={'break-me'}
                  pageCount={count ? Math.ceil(count.count / limit) : 0}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={1}
                  onPageChange={this.handlePageClick}
                  containerClassName={'pagination'}
                  subContainerClassName={'pages pagination'}
                  activeClassName={'active'}
                />
              </div>
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
    filteredGames: state.games.filteredGames
  }
}

export default connect(mapStateToProps, { getGames, getGamesCount, setFilteredGames })(Games)
