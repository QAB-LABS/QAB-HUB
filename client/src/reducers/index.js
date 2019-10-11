import { combineReducers } from 'redux'
import usersReducer from './usersReducer'
import postsReducer from './postsReducer'
import commentsReducer from './commentsReducer'
import gamesReducer from './gamesReducer'
import likesReducer from './likesReducer'
import reviewsReducer from './reviewsReducer'
import merchantsReducer from './merchantsReducer'
import pricesReducer from './pricesReducer'
import authReducer from './authReducer'

export default combineReducers({
    posts: postsReducer,
    users: usersReducer,
    games: gamesReducer,
    prices: pricesReducer,
    reviews: reviewsReducer,
    likes: likesReducer,
    comments: commentsReducer,
    merchants: merchantsReducer,
    auth: authReducer
})