import * as types from './types';

export const addFilter = (filterKey, filterValue) => {
    return dispatch => {
        dispatch({ type: types.ADD_FILTER, payload: { filterKey, filterValue } })
        dispatch(updateQueryUrl())
    }
}

export const removeFilter = (filterKey, filterValue) => {
    return dispatch => {
        dispatch({ type: types.REMOVE_FILTER, payload: { filterKey, filterValue } })
        dispatch(updateQueryUrl())
    }
}

export const filtersUpdated = () => { return { type: types.FILTERS_UPDATED } }

export const filtersApplied = () => { return { type: types.FILTERS_APPLIED } }

export const updateQueryUrl = () => {
    return dispatch => {
        dispatch({ type: types.UPDATE_QUERY_URL })
        dispatch(filtersUpdated())
    }
}