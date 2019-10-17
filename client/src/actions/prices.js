import * as types from './types'
import api from '../apis/backend'

export const getReviews = () => {
    return async dispatch => {
        try {
            const response = await api.getReviews()
            return dispatch({ type: types.FETCH_REVIEWS, payload: response });
        } catch (error) {
            return dispatch({ type: types.ERROR, error });
        }
    }
}

export const getReview = (id) => {
    return async dispatch => {
        try {
            const response = await api.getReview(id)
            return dispatch({ type: types.FETCH_REVIEW, payload: response });
        } catch (error) {
            return dispatch({ type: types.ERROR, error });
        }
    }
}

export const addReview = (body) => {
    return async dispatch => {
        try {
            const response = await api.addReview(body)
            return dispatch({ type: types.CREATE_REVIEW, payload: response });
        } catch (error) {
            return dispatch({ type: types.ERROR, error });
        }
    }
}

export const updateReview = (id, body) => {
    return async dispatch => {
        try {
            const response = await api.updateReview(id, body)
            return dispatch({ type: types.UPDATE_REVIEW, payload: response });
        } catch (error) {
            return dispatch({ type: types.ERROR, error });
        }
    }
}

export const deleteReview = (id) => {
    return async dispatch => {
        try {
            const response = await api.deleteReview(id)
            return dispatch({ type: types.DELETE_REVIEW, payload: response });
        } catch (error) {
            return dispatch({ type: types.ERROR, error });
        }
    }
}