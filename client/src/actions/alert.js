import * as types from './types';

export const alertActions = {
    success,
    error,
    clear
};

function success(message) {
    return { type: types.SUCCESS, message };
}

function error(message) {
    return { type: types.ERROR, message };
}

function clear() {
    return { type: types.CLEAR };
}