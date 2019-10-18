import errHandler from './error'
import getService from './config'

const service = getService('')

export default {
    searchLikes() {
        return service
            .get('/likes/search')
            .then(res => res.data)
            .catch(errHandler)
    },

    getLikes() {
        return service
            .get('/likes')
            .then(res => res.data)
            .catch(errHandler)
    },

    addLike(body) {
        return service
            .post('/likes', body)
            .then(res => res.data)
            .catch(errHandler)
    },

    getLike(id) {
        return service
            .get(`/likes/${id}`)
            .then(res => res.data)
            .catch(errHandler)
    },

    updateLike(id, body) {
        return service
            .patch(`/likes/${id}`, body)
            .then(res => res.data)
            .catch(errHandler)
    },

    deleteLike(id) {
        return service
            .delete(`/likes/${id}`)
            .then(res => res.data)
            .catch(errHandler)
    },
}