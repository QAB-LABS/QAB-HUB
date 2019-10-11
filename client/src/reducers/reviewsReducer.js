import * as types from '../actions/types'

export default (state = [], action) => {
    switch (action.type) {
        case types.FETCH_REVIEWS:
            return action.payload
        default:
            return state
    }
}