import * as types from '../actions/types'

export default (state = [], action) => {
    switch (action.type) {
        case types.FETCH_GAMES:
            return {...state, games: action.payload }
        case types.CREATE_GAME:
            return {...state, game: action.payload }
        case types.FETCH_GAMES_COUNT:
            return {...state, count: action.payload }
        default:
            return state
    }
}