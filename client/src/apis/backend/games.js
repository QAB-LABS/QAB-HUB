import errHandler from './error'
import getService from './config'

const service = getService('games')


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