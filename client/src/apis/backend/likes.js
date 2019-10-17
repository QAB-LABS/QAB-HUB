import errHandler from './error'
import getService from './config'

const service = getService('likes')

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

    deleteLike(id) {
        return service
            .delete(`/${id}`)
            .then(res => res.data)
            .catch(errHandler)
    },
}