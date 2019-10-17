import React, { Component } from 'react';
import { connect } from 'react-redux'
import CollapsibleList from '../generic/CollapsibleList'
import { addFilter, removeFilter } from '../../actions/filters';


class Filter extends Component {

  handleFilterChange(e, filterKey) {
    const { dispatch } = this.props
    let filterType = e.target.value
    dispatch((e.target.checked) ? addFilter(filterKey, filterType) : removeFilter(filterKey, filterType))
  }

  renderFilterList = (filter) => {
    const { heading, values } = filter
    return values.map((value, i) => (
      <React.Fragment key={i}>
        <input type="checkbox" id={value + i} value={value} onClick={e => this.handleFilterChange(e, heading.toLowerCase())} />
        <label htmlFor={value + i}>{value}</label>
      </React.Fragment>
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
  }
}

export default connect(mapStateToProps)(Filter)