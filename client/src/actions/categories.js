import * as types from './types'
import api from '../apis/backend'

export const getCategories = () => {
    return async dispatch => {
        dispatch(request())
        api.getCategories()
            .then(
                categories => dispatch(success(categories)),
                error => dispatch(failure(error.toString()))
            )
    }

    function request() { return { type: types.FETCH_CATEGORIES_REQUEST } }

    function success(categories) { return { type: types.FETCH_CATEGORIES_SUCCESS, payload: categories } }

    function failure(error) { return { type: types.FETCH_CATEGORIES_ERROR, error } }

}

export const getCategory = (id) => {
    return async dispatch => {
        try {
            const response = await api.getCategory(id)
            return dispatch({ type: types.FETCH_CATEGORY, payload: response });
        } catch (error) {
            return dispatch({ type: types.ERROR, error });
        }
    }
}

export const addCategory = (body) => {
    return async dispatch => {
        try {
            const response = await api.addCategory(body)
            return dispatch({ type: types.CREATE_CATEGORY, payload: response });
        } catch (error) {
            return dispatch({ type: types.ERROR, error });
        }
    }
}

export const updateCategory = (id, body) => {
    return async dispatch => {
        try {
            const response = await api.updateCategory(id, body)
            return dispatch({ type: types.UPDATE_CATEGORY, payload: response });
        } catch (error) {
            return dispatch({ type: types.ERROR, error });
        }
    }
}

export const deleteCategory = (id) => {
    return async dispatch => {
        try {
            const response = await api.deleteCategory(id)
            return dispatch({ type: types.DELETE_CATEGORY, payload: response });
        } catch (error) {
            return dispatch({ type: types.ERROR, error });
        }
    }
}