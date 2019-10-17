import { userService } from './backend/user'
import auth from './backend/auth'
import comments from './backend/comments'
import posts from './backend/posts'
import games from './backend/games'
import merchants from './backend/merchants'
import prices from './backend/prices'
import reviews from './backend/reviews'
import likes from './backend/likes'
import categories from './backend/categories'

export default {
    ...userService,
    ...comments,
    ...posts,
    ...games,
    ...merchants,
    ...prices,
    ...reviews,
    ...likes,
    ...auth,
    ...categories
}