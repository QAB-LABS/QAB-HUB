import * as types from '../actions/types'

export default (state = { all: [], selected: undefined }, action) => {
    switch (action.type) {
        case types.FETCH_CATEGORIES_REQUEST:
            return {...state, isLoading: true }
        case types.FETCH_CATEGORIES_SUCCESS:
            return {...state, all: action.payload, isLoading: false }
        case types.FETCH_CATEGORIES_ERROR:
            return state
        case types.FETCH_CATEGORY:
            return {...state, selected: action.payload }
        default:
            return state
    }
}