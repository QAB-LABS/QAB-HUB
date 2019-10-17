import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addPriceFilter, removePriceFilter, addLocationFilter, removeLocationFilter, addTakeoutFilter, removeTakeoutFilter } from '../../actions/filters';


class Filter extends Component {
  handlePriceFilter(e) {
    let priceType = e.target.value
    if (e.target.checked) {
      this.props.dispatch(addPriceFilter(priceType));
    } else {
      this.props.dispatch(removePriceFilter(priceType));
    }
  }

  handleLocationFilter(e) {
    let zip_code = e.target.value;
    if (e.target.checked) {
      this.props.dispatch(addLocationFilter(zip_code));
    } else {
      this.props.dispatch(removeLocationFilter(zip_code));
    }
  }

  handleTakeoutFilter(e) {
    if (e.target.checked) {
      this.props.dispatch(addTakeoutFilter());
    } else {
      this.props.dispatch(removeTakeoutFilter());
    }
  }

  renderFilters = () => {
    return this.props.filters.map((filter, i) => {
      return (
        <div key={i} className="filter">
          <h4>{filter.heading}</h4>
          {filter.values.map((value, i) => <div key={i}><input type="checkbox" value={value} onClick={e => this[filter.handler](e)} /> {value} <br /></div>)}
        </div>
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