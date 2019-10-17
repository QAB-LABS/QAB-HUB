import errHandler from './error'
import getService from './config'

const service = getService('reviews')

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

    deleteReview(id) {
        return service
            .delete(`/${id}`)
            .then(res => res.data)
            .catch(errHandler)
    },
}