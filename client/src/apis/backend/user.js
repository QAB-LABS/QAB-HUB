import axios from 'axios'

const service = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? '/api/users' : `http://${window.location.hostname}:5000/api/users`,
    withCredentials: true,
})

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