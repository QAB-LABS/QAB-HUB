import axios from 'axios'
import errHandler from './error'

const service = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ?
        '/api/likes' : `http://${window.location.hostname}:5000/api/likes`,
    withCredentials: true,
})

export default {
    searchLikes() {
        return service
            .get('/search')
            .then(res => res.data)
            .catch(errHandler)
    },

    getLikes() {
        return service
            .get('/')
            .then(res => res.data)
            .catch(errHandler)
    },

    addLike(body) {
        return service
            .post('/', body)
            .then(res => res.data)
            .catch(errHandler)
    },

    getLike(id) {
        return service
            .get(`/${id}`)
            .then(res => res.data)
            .catch(errHandler)
    },

    updateLike(id, body) {
        return service
            .patch(`/${id}`, body)
            .then(res => res.data)
            .catch(errHandler)
    },

    deleteLike(id, body) {
        return service
            .patch(`/${id}`, body)
            .then(res => res.data)
            .catch(errHandler)
    },
}