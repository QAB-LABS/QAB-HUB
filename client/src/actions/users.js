import * as types from './types'
import api from '../apis/backend'
import _ from 'lodash'
import fetchPosts from './posts'

export const fetchUser = id => dispatch => _fetchUser(id, dispatch)
const _fetchUser = _.memoize(async(id, dispatch) => {
    const response = await api.getUser(`/users/${id}`)
    dispatch({ type: types.FETCH_USER, payload: response.data })
})


export const fetchPostsAndUsers = () => async(dispatch, getState) => {
    await dispatch(fetchPosts())
    _.chain(getState().posts)
        .map('userId')
        .uniq()
        .forEach(id => dispatch(fetchUser(id)))
        .value();
}