import * as types from './types';
import api from '../apis/backend';
import { alertActions } from './alert';
import { history } from '../helpers/history';

export const authActions = {
    login,
    logout,
    register,
    getAll
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        api.login(username, password)
            .then(
                user => {
                    dispatch(success(user));
                    history.push('/');
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
    return { type: types.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        api.register(user)
            .then(
                user => {
                    dispatch(success());
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

function getAll() {
    return dispatch => {
        dispatch(request());

        api.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: types.GETALL_REQUEST } }

    function success(users) { return { type: types.GETALL_SUCCESS, users } }

    function failure(error) { return { type: types.GETALL_FAILURE, error } }
}