import errHandler from './error'
import getService from './config'

const service = getService('')

export default {
    isLoggedIn() {
        return localStorage.getItem('user') != null
    },

    getLocalStorageUser() {
        return JSON.parse(localStorage.getItem('user'))
    },

    signup(userInfo) {
        return service
            .post('/api/signup', userInfo)
            .then(res => {
                localStorage.setItem('user', JSON.stringify(res.data))
                return res.data
            })
            .catch(errHandler)
    },

    login(username, password) {
        return service
            .post('/api/login', {
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
        return service.get('/api/logout')
    },
}