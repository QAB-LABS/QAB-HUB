import * as types from '../actions/types'

export default (state = {}, action) => {
    switch (action.type) {
        case types.FETCH_USER:
            state.selectedUser = action.payload
            return state
        case types.FETCH_USERS:
            state.users = action.payload
            return state
        default:
            return state
    }
}