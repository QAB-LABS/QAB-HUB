import * as types from '../actions/types'

export default (state = [], action) => {
    switch (action.type) {
        case types.FETCH_GAMES:
            return {...state, loading: true }
        case types.RECEIVE_GAMES:
            return {...state, games: action.payload, loading: false }
        case types.CREATE_GAME:
            return {...state, game: action.payload }
        case types.FETCH_GAMES_COUNT:
            return {...state, count: action.payload }
        case types.FILTER_GAMES:
            const { start, end } = action.payload
            return {...state, filtered: state.games.slice(start, end) }
        case types.PAGINATE_GAMES:
            return {...state, paginated: action.payload }
        default:
            return state
    }
}