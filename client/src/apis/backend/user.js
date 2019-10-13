import axios from 'axios'

const service = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? '/api/users' : `http://${window.location.hostname}:5000/api/users`,
    withCredentials: true,
})

export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete
};

function login(username, password) {
    return service
        .post('/login', JSON.stringify({ username, password }))
        .then(handleResponse)
        .then(user => {
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        });
}

function logout() {
    localStorage.removeItem('user');
}

function getAll() {
    return service
        .get('/')
        .then(handleResponse)
}

function getById(id) {
    return service
        .get(`/${id}`)
        .then(handleResponse)
}

function register(user) {
    return service
        .post('/signup', JSON.stringify(user))
        .then(handleResponse)
}

function update(user) {
    return service
        .post('/login', JSON.stringify(user))
        .then(handleResponse)
}

function _delete(id) {
    return service
        .delete(`/${id}`)
        .then(handleResponse)
}

function handleResponse(response) {
    return response.then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                logout();
                // location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}