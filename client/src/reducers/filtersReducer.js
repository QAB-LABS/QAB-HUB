import * as types from '../actions/types';

let initialState = {}

// 1  0 - 10
// 2  11 - 29
// 3  30-60
// 4  61-100
// 5  100+

const createQueryString = (filters) => {
    console.log(filters)
    return ''
}

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

        case types.UPDATE_QUERY_URL:
            const query = createQueryString({...state})
            return {...state, query}  

        default:
            return state
    }
}

export default visibilityFilter