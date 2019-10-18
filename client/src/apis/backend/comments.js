import errHandler from './error'
import getService from './config'

const service = getService('')

export default {
    searchComments() {
        return service
            .get('/api/comments/search')
            .then(res => res.data)
            .catch(errHandler)
    },

    getComments() {
        return service
            .get('/api/comments')
            .then(res => res.data)
            .catch(errHandler)
    },

    addComment(body) {
        return service
            .post('/api/comments', body)
            .then(res => res.data)
            .catch(errHandler)
    },

    getComment(id) {
        return service
            .get(`/api/comments/${id}`)
            .then(res => res.data)
            .catch(errHandler)
    },

    updateComment(id, body) {
        return service
            .patch(`/api/comments/${id}`, body)
            .then(res => res.data)
            .catch(errHandler)
    },

    deleteComment(id) {
        return service
            .delete(`/api/comments/${id}`)
            .then(res => res.data)
            .catch(errHandler)
    },
}