import { combineReducers } from 'redux'
import postsReducer from './postsReducer'
import usersReducer from './usersReducer'
import gamesReducer from './gamesReducer'
import authReducer from './authReducer'

export default combineReducers({
    posts: postsReducer,
    users: usersReducer,
    games: gamesReducer,
    auth: authReducer
})