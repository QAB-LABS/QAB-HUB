import * as types from '../actions/types'

export default (state = {}, action) => {
    switch (action.type) {
        case types.FETCH_USER:
            console.log('fetch USER!!!!', action, state)
            return state.selectedUser = action.payload, state
        case types.FETCH_USERS:
            console.log('fetch USERS!!!!', action, state)
            return state.users = action.payload, state
        default:
            return state
    }
}