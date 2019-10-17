import errHandler from './error'
import getService from './config'

const service = getService('comments')

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

    deleteComment(id) {
        return service
            .delete(`/${id}`)
            .then(res => res.data)
            .catch(errHandler)
    },
}