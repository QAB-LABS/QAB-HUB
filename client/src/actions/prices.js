import * as types from './types'
import api from '../apis/backend'

export const getPrices = () => {
    return async dispatch => {
        try {
            const response = await api.getPrices()
            return dispatch({ type: types.FETCH_PRICES, payload: response });
        } catch (error) {
            return dispatch({ type: types.ERROR, error });
        }
    }
}

export const getPrice = (id) => {
    return async dispatch => {
        try {
            const response = await api.getPrice(id)
            return dispatch({ type: types.FETCH_PRICE, payload: response });
        } catch (error) {
            return dispatch({ type: types.ERROR, error });
        }
    }
}

export const addPrice = (body) => {
    return async dispatch => {
        try {
            const response = await api.addPrice(body)
            return dispatch({ type: types.CREATE_PRICE, payload: response });
        } catch (error) {
            return dispatch({ type: types.ERROR, error });
        }
    }
}

export const updatePrice = (id, body) => {
    return async dispatch => {
        try {
            const response = await api.updatePrice(id, body)
            return dispatch({ type: types.UPDATE_PRICE, payload: response });
        } catch (error) {
            return dispatch({ type: types.ERROR, error });
        }
    }
}

export const deletePrice = (id) => {
    return async dispatch => {
        try {
            const response = await api.deletePrice(id)
            return dispatch({ type: types.DELETE_PRICE, payload: response });
        } catch (error) {
            return dispatch({ type: types.ERROR, error });
        }
    }
}
