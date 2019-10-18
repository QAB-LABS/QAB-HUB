import errHandler from './error'
import getService from './config'

const service = getService()

export default {
    searchReviews() {
        return service
            .get('/api/reviews/search')
            .then(res => res.data)
            .catch(errHandler)
    },

    getReviews() {
        return service
            .get('/api/reviews')
            .then(res => res.data)
            .catch(errHandler)
    },

    addReview(body) {
        return service
            .post('/api/reviews', body)
            .then(res => res.data)
            .catch(errHandler)
    },

    getReview(id) {
        return service
            .get(`/api/reviews/${id}`)
            .then(res => res.data)
            .catch(errHandler)
    },

    updateReview(id, body) {
        return service
            .patch(`/api/reviews/${id}`, body)
            .then(res => res.data)
            .catch(errHandler)
    },

    deleteReview(id) {
        return service
            .delete(`/api/reviews/${id}`)
            .then(res => res.data)
            .catch(errHandler)
    },
}