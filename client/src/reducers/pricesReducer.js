import * as types from '../actions/types'

export default (state = [], action) => {
    switch (action.type) {
        case types.FETCH_PRICES:
            return {...state, payload: action.payload }
        default:
            return state
    }
}