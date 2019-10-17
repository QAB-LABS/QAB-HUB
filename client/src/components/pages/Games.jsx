import React from 'react'
import GamesList from '../Games/GamesList'
import { connect } from 'react-redux'
import { getGames, getGamesCount, setFilteredGames, setPaginatedGames } from '../../actions/games'
import { getCategories } from '../../actions/categories'
import Filter from '../generic/Filter'
import ReactPaginate from 'react-paginate';

class Games extends React.Component {
  state = {
    skip: 0,
    limit: 12,
    filterCutoff: 6
  }

  componentDidMount() {
    this.props.getGamesCount()
    this.props.getCategories()
    this.props.setPaginatedGames(null, this.state.skip, this.state.limit, null, "ratings,categories,likes")
  }


  handlePageClick = data => {
    let pageIndex = data.selected;
    let offset = Math.ceil(pageIndex * this.state.limit);
    this.setState({ skip: offset, }, () => {
      this.props.setPaginatedGames(null, this.state.skip, this.state.limit, null, "ratings,categories,likes")
    });
  };

  generateFilters() {
    const baseCategories = [
      { heading: "Price", values: ['$', '$$', '$$$', '$$$$'] },
      { heading: "Minimum Players", values: ['1', '2', '3', '4', '5', '6+'] }
    ]
    if (!this.props.categoriesLoading) baseCategories.push({ heading: "Categories", values: this.props.categories.map(c => c.name) })
    return baseCategories
  }

  render() {
    const { count, paginatedGames } = this.props
    const { skip, limit, filterCutoff } = this.state

    return (
      <div className="Games container" >
        <div className="games-description row">
          <span>Showing {`${skip + 1}-${limit + skip + 1} of ${count ? count.count : 0} results for FILTERS`}</span>
          <div className="right">
            <i className="icon th" />
            <i className="icon th list" />
          </div>
        </div>
        <div className="row">
          <div className="col-2">
            <Filter cutoff={filterCutoff} filters={this.generateFilters()} />
          </div>

          <div className="col-10">
            <GamesList games={paginatedGames} />
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
    )
  }
}


const mapStateToProps = state => {
  return {
    games: state.games.games,
    count: state.games.count,
    filteredGames: state.games.filtered,
    paginatedGames: state.games.paginated,
    categories: state.categories.all,
    categoriesLoading: state.categories.isLoading
  }
}

export default connect(mapStateToProps, { getCategories, getGames, getGamesCount, setFilteredGames, setPaginatedGames })(Games)
