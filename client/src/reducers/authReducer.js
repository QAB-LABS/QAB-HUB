import * as types from '../actions/types';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.LOGIN_REQUEST:
            return {
                loggingIn: true,
                user: action.user
            };
        case types.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                user: action.user
            };
        case types.LOGIN_FAILURE:
            return {};
        case types.LOGOUT:
            return {};
        default:
            return state
    }
}