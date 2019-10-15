import * as types from './types'
import api from '../apis/backend'

export const getGamesCount = () => {
    return async dispatch => {
        try {
            const response = await api.getGamesCount()
            return dispatch({ type: types.FETCH_GAMES_COUNT, payload: response });
        } catch (error) {
            return dispatch({ type: types.ERROR, error });
        }
    }
}

export const getGames = () => {
    return async dispatch => {
        try {
            const response = await api.getGames()
            return dispatch({ type: types.FETCH_GAMES, payload: response });
        } catch (error) {
            return dispatch({ type: types.ERROR, error });
        }
    }
}

export const getGame = (id) => {
    return async dispatch => {
        try {
            const response = await api.getGame(id)
            return dispatch({ type: types.FETCH_GAME, payload: response });
        } catch (error) {
            return dispatch({ type: types.ERROR, error });
        }
    }
}

export const addGame = (body) => {
    return async dispatch => {
        try {
            const response = await api.addGame(body)
            return dispatch({ type: types.CREATE_GAME, payload: response });
        } catch (error) {
            return dispatch({ type: types.ERROR, error });
        }
    }
}

export const updateGame = (id, body) => {
    return async dispatch => {
        try {
            const response = await api.updateGame(id, body)
            return dispatch({ type: types.UPDATE_GAME, payload: response });
        } catch (error) {
            return dispatch({ type: types.ERROR, error });
        }
    }
}

export const deleteGame = (id) => {
    return async dispatch => {
        try {
            const response = await api.deleteGame(id)
            return dispatch({ type: types.DELETE_GAME, payload: response });
        } catch (error) {
            return dispatch({ type: types.ERROR, error });
        }
    }
}