import _ from 'lodash'
import jsonPlaceholder from '../apis/jsonPlaceholder'
import { SIGN_IN, SIGN_OUT, FETCH_GAMES, FETCH_POSTS, FETCH_USER } from './types'

export const signIn = userId => {
    return {
        type: SIGN_IN,
        payload: userId
    }
}

export const signOut = () => {
    return {
        type: SIGN_OUT
    }
}

export const fetchPostsAndUsers = () => async(dispatch, getState) => {
    await dispatch(fetchPosts())
    _.chain(getState().posts)
        .map('userId')
        .uniq()
        .forEach(id => dispatch(fetchUser(id)))
        .value();
}

export const fetchGames = () => async dispatch => {
    const response = await jsonPlaceholder.get('/posts')
    dispatch({ type: FETCH_GAMES, payload: response.data })
}

export const fetchPosts = () => async dispatch => {
    const response = await jsonPlaceholder.get('/posts')
    dispatch({ type: FETCH_POSTS, payload: response.data })
}

export const fetchUser = id => dispatch => _fetchUser(id, dispatch)
const _fetchUser = _.memoize(async(id, dispatch) => {
    const response = await jsonPlaceholder.get(`/users/${id}`)
    dispatch({ type: FETCH_USER, payload: response.data })
})