import errHandler from './error'
import getService from './config'

const service = getService('')

export default {
    searchComments() {
        return service
            .get('/comments/search')
            .then(res => res.data)
            .catch(errHandler)
    },

    getComments() {
        return service
            .get('/comments')
            .then(res => res.data)
            .catch(errHandler)
    },

    addComment(body) {
        return service
            .post('/comments', body)
            .then(res => res.data)
            .catch(errHandler)
    },

    getComment(id) {
        return service
            .get(`/comments/${id}`)
            .then(res => res.data)
            .catch(errHandler)
    },

    updateComment(id, body) {
        return service
            .patch(`/comments/${id}`, body)
            .then(res => res.data)
            .catch(errHandler)
    },

    deleteComment(id) {
        return service
            .delete(`/comments/${id}`)
            .then(res => res.data)
            .catch(errHandler)
    },
}