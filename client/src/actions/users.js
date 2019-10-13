import * as types from './types'
import api from '../apis/backend'
import _ from 'lodash'
import getPosts from './posts'

export const getUser = id => dispatch => _getUser(id, dispatch)
const _getUser = _.memoize(async(id, dispatch) => {
    const response = await api.getUser(`/users/${id}`)
    dispatch({ type: types.FETCH_USER, payload: response.data })
})


export const getPostsAndUsers = () => async(dispatch, getState) => {
    await dispatch(getPosts())
    _.chain(getState().posts)
        .map('userId')
        .uniq()
        .forEach(id => dispatch(getUser(id)))
        .value();
}