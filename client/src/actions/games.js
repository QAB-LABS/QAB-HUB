import * as types from './types'
import api from '../apis/backend'
import { filtersApplied } from './filters'


export const fetchGames = name => ({
    type: types.FETCH_GAMES,
    name
})

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

export const getSearch = (filter, skip, limit, sort, population) => {
    return async dispatch => {
        dispatch(fetchGames())
        try {
            const response = await api.getGames(filter, skip, limit, sort, population)
            return dispatch({ type: types.RECEIVE_GAMES, payload: response });
        } catch (error) {
            return dispatch({ type: types.ERROR, error });
        }
    }
}

export const getGames = (skip, limit, population) => {
    return async dispatch => {
        dispatch(fetchGames())
        try {
            const response = await api.getGames(skip, limit, population)
            return dispatch({ type: types.RECEIVE_GAMES, payload: response });
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

export const setPaginatedGames = (filter, skip, limit, sort, population, query) => {
    return async dispatch => {
        dispatch(fetchGames())
        try {
            const response = await api.searchGames(filter, skip, limit, sort, population, query)
            dispatch(filtersApplied())
            return dispatch({ type: types.PAGINATE_GAMES, payload: response })
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

export const setFilteredGames = (start, end) => {
    return dispatch => {
        return dispatch({ type: types.FILTER_GAMES, payload: { start, end } })
    }
}
