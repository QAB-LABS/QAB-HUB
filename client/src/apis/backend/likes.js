import errHandler from './error'
import getService from './config'

const service = getService('')

export default {
    searchLikes() {
        return service
            .get('/api/likes/search')
            .then(res => res.data)
            .catch(errHandler)
    },

    getLikes() {
        return service
            .get('/api/likes')
            .then(res => res.data)
            .catch(errHandler)
    },

    addLike(body) {
        return service
            .post('/api/likes', body)
            .then(res => res.data)
            .catch(errHandler)
    },

    getLike(id) {
        return service
            .get(`/api/likes/${id}`)
            .then(res => res.data)
            .catch(errHandler)
    },

    updateLike(id, body) {
        return service
            .patch(`/api/likes/${id}`, body)
            .then(res => res.data)
            .catch(errHandler)
    },

    deleteLike(id) {
        return service
            .delete(`/api/likes/${id}`)
            .then(res => res.data)
            .catch(errHandler)
    },
}