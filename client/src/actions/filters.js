import * as types from './types';


export const addPriceFilter = (priceType) => {
    return {
        type: types.ADD_PRICE_FILTER,
        priceType
    }
}

export const removePriceFilter = (priceType) => {
    return {
        type: types.REMOVE_PRICE_FILTER,
        priceType
    }
}

export const addLocationFilter = (zip_code) => {
    return {
        type: types.ADD_LOCATION_FILTER,
        zip_code
    }
}

export const removeLocationFilter = (zip_code) => {
    return {
        type: types.REMOVE_LOCATION_FILTER,
        zip_code
    }
}

export const addTakeoutFilter = () => {
    return {
        type: types.ADD_TAKEOUT_FILTER
    }
}

export const removeTakeoutFilter = () => {
    return {
        type: types.REMOVE_TAKEOUT_FILTER
    }
}