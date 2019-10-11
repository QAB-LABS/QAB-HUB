import * as types from './types'
import api from '../apis/backend'
import _ from 'lodash'

export const getMerchants = id => dispatch => _getMerchants(id, dispatch)
const _getMerchants = _.memoize(async dispatch => {
    const response = await api.getMerchants()
    dispatch({ type: types.FETCH_MERCHANTS, payload: response.data })
})