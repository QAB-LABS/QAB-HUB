import * as types from '../actions/types'

export default (state = {}, action) => {
    switch (action.type) {
        case types.FETCH_USER:
            return state.selectedUser = action.payload, state
        case types.FETCH_USERS:
            return state.users = action.payload, state
        default:
            return state
    }
}