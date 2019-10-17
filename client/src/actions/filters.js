import * as types from './types';



export const addFilter = (filterKey, filterValue) => {
    return {
        type: types.ADD_FILTER,
        payload: { filterKey, filterValue }
    }
}

export const removeFilter = (filterKey, filterValue) => {
    return {
        type: types.REMOVE_FILTER,
        payload: { filterKey, filterValue }
    }
}
