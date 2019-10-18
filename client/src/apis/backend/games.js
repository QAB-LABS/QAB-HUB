import errHandler from './error'
import getService from './config'

const service = getService('')


export default {
    searchGames(filter, skip, limit, sort, populate, query) {
        return service
            .get('/games/search' + (query || ''), {
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
            .get('/games', {
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
            .get('/games/count')
            .then(res => res.data)
            .catch(errHandler)
    },

    addGame(body) {
        return service
            .post('/games', body)
            .then(res => res.data)
            .catch(errHandler)
    },

    getGame(id) {
        return service
            .get(`/games/${id}`)
            .then(res => res.data)
            .catch(errHandler)
    },

    updateGame(id, body) {
        return service
            .patch(`/games/${id}`, body)
            .then(res => res.data)
            .catch(errHandler)
    },

    deleteGame(id) {
        return service
            .delete(`/games/${id}`)
            .then(res => res.data)
            .catch(errHandler)
    },
}