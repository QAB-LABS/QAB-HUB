import * as types from '../actions/types';

let initialState = {
    priceFilter: [],
    locationFilter: [],
    takeoutFilter: false,
}

const visibilityFilter = (state = initialState, action) => {
    switch (action.type) {
        case types.ADD_PRICE_FILTER:
            return Object.assign({}, state, { priceFilter: [...state.priceFilter, action.priceType], locationFilter: [...state.locationFilter], takeoutFilter: state.takeoutFilter })

        case types.REMOVE_PRICE_FILTER:
            const newPriceFilter = state.priceFilter.filter((item) => item !== action.priceType)
            return { priceFilter: newPriceFilter, locationFilter: [...state.locationFilter], takeoutFilter: state.takeoutFilter }

        case types.ADD_LOCATION_FILTER:
            return Object.assign({}, state, { priceFilter: [...state.priceFilter], locationFilter: [...state.locationFilter, action.zip_code], takeoutFilter: state.takeoutFilter })

        case types.REMOVE_LOCATION_FILTER:
            const newLocationFilter = state.locationFilter.filter((item) => item !== action.zip_code)
            return { priceFilter: [...state.priceFilter], locationFilter: newLocationFilter, takeoutFilter: state.takeoutFilter }

        case types.ADD_TAKEOUT_FILTER:
            return { priceFilter: [...state.priceFilter], locationFilter: [...state.locationFilter], takeoutFilter: true }

        case types.REMOVE_TAKEOUT_FILTER:
            return { priceFilter: [...state.priceFilter], locationFilter: [...state.locationFilter], takeoutFilter: false }

        default:
            return state
    }
}

export default visibilityFilter