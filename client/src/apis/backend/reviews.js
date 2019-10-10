import axios from 'axios'
import errHandler from './error'

const service = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ?
        '/api/reviews' : `http://${window.location.hostname}:5000/api/reviews`,
    withCredentials: true,
})

export default {
    searchReviews() {
        return service
            .get('/search')
            .then(res => res.data)
            .catch(errHandler)
    },

    getReviews() {
        return service
            .get('/')
            .then(res => res.data)
            .catch(errHandler)
    },

    addReview(body) {
        return service
            .post('/', body)
            .then(res => res.data)
            .catch(errHandler)
    },

    getReview(id) {
        return service
            .get(`/${id}`)
            .then(res => res.data)
            .catch(errHandler)
    },

    updateReview(id, body) {
        return service
            .patch(`/${id}`, body)
            .then(res => res.data)
            .catch(errHandler)
    },

    deleteReview(id, body) {
        return service
            .patch(`/${id}`, body)
            .then(res => res.data)
            .catch(errHandler)
    },
}