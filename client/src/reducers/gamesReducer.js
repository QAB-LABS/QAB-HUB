import { CREATE_GAME, FETCH_GAMES } from '../actions/types'

export default (state = [], action) => {
    switch (action.type) {
        case FETCH_GAMES:
            return action.payload
        case CREATE_GAME:
            return { game: action.payload }
        default:
            return state
    }
}