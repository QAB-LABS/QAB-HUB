import * as types from './types'
import api from '../apis/backend'
import _ from 'lodash'

export const fetchMerchants = id => dispatch => _fetchMerchants(id, dispatch)
const _fetchMerchants = _.memoize(async dispatch => {
    const response = await api.getMerchants()
    dispatch({ type: types.FETCH_MERCHANTS, payload: response.data })
})