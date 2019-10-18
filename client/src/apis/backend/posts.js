import errHandler from './error'
import getService from './config'

const service = getService()


export default {
    searchPosts(filter, skip, limit, sort, populate) {
        return service
            .get('/api/posts/search', {
                params: {
                    filter: new RegExp(filter, "gi"),
                    skip,
                    limit,
                    sort,
                    populate
                }
            })
            .then(res => res.data)
            .catch(errHandler)
    },

    getPosts(skip, limit, populate) {
        return service
            .get('/api/posts', {
                params: {
                    skip,
                    limit,
                    populate
                }
            })
            .then(res => res.data)
            .catch(errHandler)
    },

    addPost(body) {
        return service
            .post('/api/posts', body)
            .then(res => res.data)
            .catch(errHandler)
    },

    getPost(id, body) {
        return service
            .get(`/api/posts/${id}`)
            .then(res => res.data)
            .catch(errHandler)
    },

    updatePost(id, body) {
        return service
            .patch(`/api/posts/${id}`, body)
            .then(res => res.data)
            .catch(errHandler)
    },

    deletePost(id) {
        return service
            .delete(`/api/posts/${id}`)
            .then(res => res.data)
            .catch(errHandler)
    },
}