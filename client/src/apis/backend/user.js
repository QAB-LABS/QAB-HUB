
import getService from './config'

const service = getService('users')

export const userService = {
    getUsers,
    getUser,
    updateUser,
    deleteUser
};

function getUsers() {
    return service
        .get('/')
        .then(handleResponse)
}

function getUser(id) {
    return service
        .get(`/${id}`)
        .then(handleResponse)
}

function updateUser(user) {
    return service
        .post('/login', JSON.stringify(user))
        .then(handleResponse)
}

function deleteUser(id) {
    return service
        .delete(`/${id}`)
        .then(handleResponse)
}

function handleResponse(response) {
    const { data } = response
    if (!response.statusText) {
        const error = (data && data.message) || response.statusText;
        return error
    }
    return data;
}