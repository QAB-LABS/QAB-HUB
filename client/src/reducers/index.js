import { combineReducers } from 'redux'
import alertReducer from './alertReducer'
import usersReducer from './usersReducer'
import postsReducer from './postsReducer'
import commentsReducer from './commentsReducer'
import gamesReducer from './gamesReducer'
import likesReducer from './likesReducer'
import reviewsReducer from './reviewsReducer'
import merchantsReducer from './merchantsReducer'
import pricesReducer from './pricesReducer'
import authReducer from './authReducer'
import registrationReducer from './registrationReducer'

export default combineReducers({
    alert: alertReducer,
    authentication: authReducer,
    comments: commentsReducer,
    games: gamesReducer,
    likes: likesReducer,
    merchants: merchantsReducer,
    posts: postsReducer,
    prices: pricesReducer,
    registration: registrationReducer,
    reviews: reviewsReducer,
    users: usersReducer,
})