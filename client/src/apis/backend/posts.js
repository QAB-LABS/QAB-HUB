import axios from 'axios'
import errHandler from './error'

const service = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ?
        '/api/posts' : `http://${window.location.hostname}:5000/api/posts`,
    withCredentials: true,
})

export default {
    searchPosts() {
        return service
            .get('/search')
            .then(res => res.data)
            .catch(errHandler)
    },

    getPosts() {
        return service
            .get('/')
            .then(res => res.data)
            .catch(errHandler)
    },

    addPost(body) {
        return service
            .post('/', body)
            .then(res => res.data)
            .catch(errHandler)
    },

    getPost(id, body) {
        return service
            .get(`/${id}`)
            .then(res => res.data)
            .catch(errHandler)
    },

    updatePost(id, body) {
        return service
            .patch(`/${id}`, body)
            .then(res => res.data)
            .catch(errHandler)
    },

    deletePost(id) {
        return service
            .delete(`/${id}`)
            .then(res => res.data)
            .catch(errHandler)
    },
}