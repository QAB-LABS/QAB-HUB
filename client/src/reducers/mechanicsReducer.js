import * as types from '../actions/types'

export default (state = { all: [] }, action) => {
    switch (action.type) {
        case types.GET_MECHANICS_REQUEST:
            return {...state, isLoading: true }
        case types.GET_MECHANICS_SUCCESS:
            return {...state, all: action.payload, isLoading: false }
        case types.GET_MECHANICS_ERROR:
            return state
        default:
            return state
    }
}