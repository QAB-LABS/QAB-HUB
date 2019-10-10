import * as types from './types'
import api from '../apis/backend'
import _ from 'lodash'

export const fetchPosts = id => dispatch => _fetchPosts(id, dispatch)
const _fetchPosts = _.memoize(async dispatch => {
    const response = await api.getGames()
    dispatch({ type: types.FETCH_GAMES, payload: response.data })
})