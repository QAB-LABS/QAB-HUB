import axios from 'axios'
import errHandler from './error'

const service = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ?
        '/api/comments' : `http://${window.location.hostname}:5000/api/comments`,
    withCredentials: true,
})

export default {
    searchComments() {
        return service
            .get('/search')
            .then(res => res.data)
            .catch(errHandler)
    },

    getComments() {
        return service
            .get('/')
            .then(res => res.data)
            .catch(errHandler)
    },

    addComment(body) {
        return service
            .post('/', body)
            .then(res => res.data)
            .catch(errHandler)
    },

    getComment(id) {
        return service
            .get(`/${id}`)
            .then(res => res.data)
            .catch(errHandler)
    },

    updateComment(id, body) {
        return service
            .patch(`/${id}`, body)
            .then(res => res.data)
            .catch(errHandler)
    },

    deleteComment(id, body) {
        return service
            .patch(`/${id}`, body)
            .then(res => res.data)
            .catch(errHandler)
    },
}