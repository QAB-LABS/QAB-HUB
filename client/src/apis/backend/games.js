import errHandler from './error'
import getService from './config'

const service = getService('games')


export default {
    searchGames(filter, skip, limit, sort, populate, query) {
        return service
            .get('/search' + (query || ''), {
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

    getGames(skip, limit, populate) {
        return service
            .get('/', {
                params: {
                    skip,
                    limit,
                    populate
                }
            })
            .then(res => res.data)
            .catch(errHandler)
    },

    getGamesCount() {
        return service
            .get('/count')
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