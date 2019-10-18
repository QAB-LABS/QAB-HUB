import * as types from './types'
import api from '../apis/backend'

export const getPosts = (skip, limit, population) => {
    return async dispatch => {
        try {
            const response = await api.getPosts(skip, limit, population)
            return dispatch({ type: types.FETCH_POSTS, payload: response });
        } catch (error) {
            return dispatch({ type: types.ERROR, error });
        }
    }
}

export const getPost = (id) => {
    return async dispatch => {
        try {
            const response = await api.getPost(id)
            return dispatch({ type: types.FETCH_POST, payload: response });
        } catch (error) {
            return dispatch({ type: types.ERROR, error });
        }
    }
}

export const addPost = (body) => {
    return async dispatch => {
        try {
            const response = await api.addPost(body)
            return dispatch({ type: types.CREATE_POST, payload: response });
        } catch (error) {
            return dispatch({ type: types.ERROR, error });
        }
    }
}

export const updatePost = (id, body) => {
    return async dispatch => {
        try {
            const response = await api.updatePost(id, body)
            return dispatch({ type: types.UPDATE_POST, payload: response });
        } catch (error) {
            return dispatch({ type: types.ERROR, error });
        }
    }
}

export const deletePost = (id) => {
    return async dispatch => {
        try {
            const response = await api.deletePost(id)
            return dispatch({ type: types.DELETE_POST, payload: response });
        } catch (error) {
            return dispatch({ type: types.ERROR, error });
        }
    }
}