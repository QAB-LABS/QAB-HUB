import React, { Component } from 'react';
import { connect } from 'react-redux'
import CollapsibleList from '../generic/CollapsibleList'
import { addFilter, removeFilter } from '../../actions/filters';
import { setPaginatedGames } from '../../actions/games'

class Filter extends Component {

  handleFilterChange(e, filterKey) {
    const { query, skip, limit, removeFilter, addFilter } = this.props
    let filterType = e.target.value

    new Promise((resolve) => resolve(e.target.checked ? addFilter(filterKey, filterType) : removeFilter(filterKey, filterType)))
      .then(() => {
        if (this.props.newFilters) {
          this.props.setPaginatedGames(null, skip, limit, null, "ratings,categories,likes", query)
        }
      })
  }

  renderFilterList = (filter) => {
    const { heading, values } = filter
    return values.map((value, i) => (
        <div className="filterWrap" key={i}>
        <div className="filterLabel"><label htmlFor={value + i}>{value}</label></div>
        <div className="filterInput">
        <input type="checkbox" id={value + i} value={value} onClick={e => this.handleFilterChange(e, heading.toLowerCase())} /></div>
        </div>
    ))
  }

  renderFilters = () => {
    const { cutoff } = this.props
    return this.props.filters.map((filter, i) => {
      const { heading } = filter
      return (
        <CollapsibleList key={i} cutoff={cutoff} title={heading} items={this.renderFilterList(filter)} />
      )
    })
  }

  render() {
    return (
      <div className="filter-container" >
        <h3>Filter Options</h3>
        {this.renderFilters()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    restaurantFilters: state.restaurantFilters,
    query: state.filters.query,
    newFilters: state.filters.newFilters
  }
}

export default connect(mapStateToProps, { addFilter, removeFilter, setPaginatedGames })(Filter)