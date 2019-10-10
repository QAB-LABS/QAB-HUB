import users from './backend/user'
import comments from './backend/comments'
import posts from './backend/posts'
import games from './backend/games'
import merchants from './backend/merchants'
import prices from './backend/prices'
import reviews from './backend/reviews'
import likes from './backend/likes'

export default {
    ...users,
    ...comments,
    ...posts,
    ...games,
    ...merchants,
    ...prices,
    ...reviews,
    ...likes
}