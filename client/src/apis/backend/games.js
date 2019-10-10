import axios from 'axios'
import errHandler from './error'

const service = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ?
        '/api/games' : `http://${window.location.hostname}:5000/api/games`,
    withCredentials: true,
})

export default {
    searchGames() {
        return service
            .get('/search')
            .then(res => res.data)
            .catch(errHandler)
    },

    getGames() {
        return service
            .get('/')
            .then(res => res.data)
            .catch(errHandler)
    },

    addGame(body) {
        return service
            .post('/', body)
            .then(res => res.data)
            .catch(errHandler)
    },

    getGame(id) {
        return service
            .get(`/${id}`)
            .then(res => res.data)
            .catch(errHandler)
    },

    updateGame(id, body) {
        return service
            .patch(`/${id}`, body)
            .then(res => res.data)
            .catch(errHandler)
    },

    deleteGame(id) {
        return service
            .delete(`/${id}`)
            .then(res => res.data)
            .catch(errHandler)
    },
}