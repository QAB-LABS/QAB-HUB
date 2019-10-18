import * as types from '../actions/types';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.LOGIN_REQUEST:
            return {
                ...state,
                loggingIn: true,
                user: action.user
            };

        case types.LOGIN_SUCCESS:
            return {
                ...state,
                loggedIn: true,
                user: action.user
            };

        case types.REGISTER_REQUEST:
            return {
                ...state,
                loggingIn: true,
                user: action.user
            };

        case types.REGISTER_SUCCESS:
            return {
                ...state,
                loggedIn: true,
                user: action.user
            };

        case types.REGISTER_FAILURE:
            return {...state, loggedIn: false, user: null }
            
        case types.LOGIN_FAILURE:
            return {...state, loggedIn: false, user: null }

        case types.SIGN_OUT:
            return {...state, loggedIn: false, user: null }

        default:
            return state
    }
}