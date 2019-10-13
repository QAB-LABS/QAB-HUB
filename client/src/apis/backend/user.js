import axios from 'axios'
import errHandler from './error'

const service = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ?
        '/api/comments' : `http://${window.location.hostname}:5000/api`,
    withCredentials: true,
})

export default {
    isLoggedIn() {
        return localStorage.getItem('user') != null
    },

    getLocalStorageUser() {
        return JSON.parse(localStorage.getItem('user'))
    },

    signup(userInfo) {
        return service
            .post('/signup', userInfo)
            .then(res => {
                localStorage.setItem('user', JSON.stringify(res.data))
                return res.data
            })
            .catch(errHandler)
    },

    login(username, password) {
        return service
            .post('/login', {
                username,
                password,
            })
            .then(res => {
                localStorage.setItem('user', JSON.stringify(res.data))
                return res.data
            })
            .catch(errHandler)
    },

    logout() {
        localStorage.removeItem('user')
        return service.get('/logout')
    },


    addPicture(file) {
        const formData = new FormData()
        formData.append('picture', file)
        return service
            .post('/endpoint/to/add/a/picture', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(res => res.data)
            .catch(errHandler)
    },
}