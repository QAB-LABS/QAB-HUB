import * as types from '../actions/types';

let initialState = {}

const visibilityFilter = (state = initialState, action) => {
    var filterKey, filterValue
    if (action.payload) {
        filterKey = action.payload.filterKey
        filterValue = action.payload.filterValue
    }

    switch (action.type) {

        case types.ADD_FILTER:
            if (!state[filterKey]) state[filterKey] = []
            const newFilters = [...state[filterKey], filterValue]
            return {...state, [filterKey]: newFilters }

        case types.REMOVE_FILTER:
            const newFilter = state[filterKey].filter(item => item !== filterValue)
            return {...state, [filterKey]: newFilter }

        default:
            return state
    }
}

export default visibilityFilter