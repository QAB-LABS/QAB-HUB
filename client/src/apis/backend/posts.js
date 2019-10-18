import errHandler from './error'
import getService from './config'

const service = getService()


export default {
    searchPosts(filter, skip, limit, sort, populate) {
        return service
            .get('/posts/search', {
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
            .get('/posts', {
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
            .post('/posts', body)
            .then(res => res.data)
            .catch(errHandler)
    },

    getPost(id, body) {
        return service
            .get(`/posts/${id}`)
            .then(res => res.data)
            .catch(errHandler)
    },

    updatePost(id, body) {
        return service
            .patch(`/posts/${id}`, body)
            .then(res => res.data)
            .catch(errHandler)
    },

    deletePost(id) {
        return service
            .delete(`/posts/${id}`)
            .then(res => res.data)
            .catch(errHandler)
    },
}