import * as types from './types'
import api from '../apis/backend'
import _ from 'lodash'

export const getPosts = id => dispatch => _getPosts(id, dispatch)
const _getPosts = _.memoize(async dispatch => {
    const response = await api.getGames()
    dispatch({ type: types.FETCH_GAMES, payload: response.data })
})