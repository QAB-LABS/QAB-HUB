import React from 'react'
import GamesList from '../Games/GamesList'
import { connect } from 'react-redux'
import { getGames, getGamesCount, setFilteredGames, setPaginatedGames } from '../../actions/games'
import { getCategories } from '../../actions/categories'
import { getMechanics } from '../../actions/mechanics'
import Filter from '../generic/Filter'
import ReactPaginate from 'react-paginate';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Games extends React.Component {
  state = {
    skip: 0,
    limit: 12,
    filterCutoff: 6
  }

  componentDidMount() {
    const { query } = this.props
    const { skip, limit } = this.state
    this.props.getGamesCount()
    this.props.getCategories()
    this.props.getMechanics()
    this.props.setPaginatedGames(null, skip, limit, null, "ratings,categories,likes", query)
  }

  handlePageClick = data => {
    const { query } = this.props
    const { limit } = this.state
    let pageIndex = data.selected;
    let offset = Math.ceil(pageIndex * this.state.limit);
    this.setState({ skip: offset }, () => {
      this.props.setPaginatedGames(null, this.state.skip, limit, null, "ratings,categories,likes", query)
    })
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
      <div className="games container" >
        <div className="games-description row">
          <div className="filterStats">
            {count ? 
            `Showing ${skip + 1}-${(limit + skip) > count.count ? count.count : limit + skip} of ${count ? count.count : 0} results for FILTERS`
            :"Showing 0 of 0 results for FILTERS "
            }
          </div>
          <div className="filterView">
            <span className="active"><FontAwesomeIcon icon="grip-horizontal" /></span>
            <FontAwesomeIcon icon="grip-lines" /> 
          </div>
        </div>
        <div className="row">
          <div className="col-2">
            <Filter skip={skip} limit={limit} cutoff={filterCutoff} filters={this.generateFilters()} />
          </div>

          <div className="col-10">
            <GamesList games={paginatedGames} />
            <div id='pagination-box'>
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
    )
  }
}


const mapStateToProps = state => {
  return {
    games: state.games.games,
    count: state.games.count,
    filters: state.filters,
    needsLoading: state.filters.newFilters,
    filteredGames: state.games.filtered,
    paginatedGames: state.games.paginated,
    categories: state.categories.all,
    categoriesLoading: state.categories.isLoading,
    mechanics: state.mechanics.all,
    mechanicsLoading: state.mechanics.isLoading
  }
}

export default connect(mapStateToProps, { getMechanics, getCategories, getGames, getGamesCount, setFilteredGames, setPaginatedGames })(Games)
