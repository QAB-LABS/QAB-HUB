import errHandler from './error'
import getService from './config'

const service = getService()

export default {
    searchReviews() {
        return service
            .get('/reviews/search')
            .then(res => res.data)
            .catch(errHandler)
    },

    getReviews() {
        return service
            .get('/reviews')
            .then(res => res.data)
            .catch(errHandler)
    },

    addReview(body) {
        return service
            .post('/reviews', body)
            .then(res => res.data)
            .catch(errHandler)
    },

    getReview(id) {
        return service
            .get(`/reviews/${id}`)
            .then(res => res.data)
            .catch(errHandler)
    },

    updateReview(id, body) {
        return service
            .patch(`/reviews/${id}`, body)
            .then(res => res.data)
            .catch(errHandler)
    },

    deleteReview(id) {
        return service
            .delete(`/reviews/${id}`)
            .then(res => res.data)
            .catch(errHandler)
    },
}