import * as types from './types'
import api from '../apis/backend'
import _ from 'lodash'

export const getMechanics = () => dispatch => _getMechanics(dispatch)
const _getMechanics = _.memoize(async dispatch => {
    const request = () => { return { type: types.GET_MECHANICS_REQUEST } }
    const success = mechanics => { return { type: types.GET_MECHANICS_SUCCESS, mechanics } }
    const failure = error => { return { type: types.GET_MECHANICS_ERROR, error } }

    dispatch(request())
    try {
        const response = await api.getMechanics()
        return dispatch(success(response));
    } catch (error) {
        return dispatch(failure(error));
    }

})
