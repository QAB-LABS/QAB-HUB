import * as types from './types';

export const addFilter = (filterKey, filterValue) => {
    return dispatch => {
        dispatch({ type: types.ADD_FILTER, payload: { filterKey, filterValue } })
        dispatch(updateQueryUrl())
    }
}

export const removeFilter = (filterKey, filterValue) => {

    return {
        type: types.REMOVE_FILTER,
        payload: { filterKey, filterValue }
    }
}

export const updateQueryUrl = () => { return { type: types.UPDATE_QUERY_URL } }