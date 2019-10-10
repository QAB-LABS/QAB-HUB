import * as types from './types'
import api from '../apis/backend'
import _ from 'lodash'

export const fetchGames = id => dispatch => _fetchGames(id, dispatch)
const _fetchGames = _.memoize(async dispatch => {
    const response = await api.getGames()
    dispatch({ type: types.FETCH_GAMES, payload: response.data })
})