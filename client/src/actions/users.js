import * as types from './types'
import api from '../apis/backend'
import _ from 'lodash'

export const getUsers = id => dispatch => _getUsers(id, dispatch)
const _getUsers = _.memoize(async(dispatch) => {
    const response = await api.getUsers()
    console.log('getusers reponse', response)
    dispatch({ type: types.FETCH_USERS, payload: response })
})

export const getUser = id => dispatch => _getUser(id, dispatch)
const _getUser = _.memoize(async(id, dispatch) => {
    const response = await api.getUser(id)
    console.log('getuser reponse', response)
    dispatch({ type: types.FETCH_USER, payload: response })
})