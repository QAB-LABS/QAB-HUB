
import getService from './config'

const service = getService()

export const userService = {
    getUsers,
    getUser,
    updateUser,
    deleteUser
};

function getUsers() {
    return service
        .get('/users')
        .then(handleResponse)
}

function getUser(id) {
    return service
        .get(`/users/${id}`)
        .then(handleResponse)
}

function updateUser(user) {
    return service
        .post('/users/login', JSON.stringify(user))
        .then(handleResponse)
}

function deleteUser(id) {
    return service
        .delete(`/users/${id}`)
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