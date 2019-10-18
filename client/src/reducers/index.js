import { combineReducers } from 'redux'
import alertReducer from './alertReducer'
import usersReducer from './usersReducer'
import postsReducer from './postsReducer'
import commentsReducer from './commentsReducer'
import categoriesReducer from './categoriesReducer'
import gamesReducer from './gamesReducer'
import likesReducer from './likesReducer'
import reviewsReducer from './reviewsReducer'
import merchantsReducer from './merchantsReducer'
import pricesReducer from './pricesReducer'
import authReducer from './authReducer'
import registrationReducer from './registrationReducer'
import filtersReducer from './filtersReducer'
import mechanicsReducer from './mechanicsReducer'

export default combineReducers({
    alert: alertReducer,
    authentication: authReducer,
    categories: categoriesReducer,
    comments: commentsReducer,
    games: gamesReducer,
    likes: likesReducer,
    merchants: merchantsReducer,
    posts: postsReducer,
    prices: pricesReducer,
    registration: registrationReducer,
    reviews: reviewsReducer,
    users: usersReducer,
    filters: filtersReducer,
    mechanics: mechanicsReducer,
})