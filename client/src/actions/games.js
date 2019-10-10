import * as types from './types'
import api from '../apis/backend'

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