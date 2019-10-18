import * as types from './types';
import api from '../apis/backend';
import { alertActions } from './alert';
import { history } from '../helpers/history';

export const authActions = {
    login,
    logout,
    register
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        api.login(username, password)
            .then(
                user => {
                    dispatch(success(user));
                    dispatch(alertActions.success('Registration successful'));
                    history.push('/signup');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: types.LOGIN_REQUEST, user } }

    function success(user) { return { type: types.LOGIN_SUCCESS, user } }

    function failure(error) { return { type: types.LOGIN_FAILURE, error } }
}

function logout() {
    api.logout();
    return { type: types.SIGN_OUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user.username));

        api.signup(user)
            .then(
                user => {
                    dispatch(success(user));
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            )
    }

    function request(user) { return { type: types.REGISTER_REQUEST, user } }

    function success(user) { return { type: types.REGISTER_SUCCESS, user } }

    function failure(error) { return { type: types.REGISTER_FAILURE, error } }
}