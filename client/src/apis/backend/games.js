import errHandler from './error'
import getService from './config'

const service = getService('')

export default {
  searchGames(filter, skip, limit, sort, populate, query) {
    return service
      .get('/api/games/search' + (query || ''), {
        params: {
          filter: new RegExp(filter, 'gi'),
          skip,
          limit,
          sort,
          populate,
        },
      })
      .then((res) => res.data)
      .catch(errHandler)
  },

  getGames(skip, limit, populate) {
    return service
      .get('/api/games', {
        params: {
          skip,
          limit,
          populate,
        },
      })
      .then((res) => res.data)
      .catch(errHandler)
  },

  getGamesCount() {
    return service
      .get('/api/games/count')
      .then((res) => res.data)
      .catch(errHandler)
  },

  addGame(body) {
    return service
      .post('/api/games', body)
      .then((res) => res.data)
      .catch(errHandler)
  },

  getGame(id) {
    return service
      .get(`/api/games/${id}`, {
        params: { populate: 'ratings categories likes' },
      })
      .then((res) => res.data)
      .catch(errHandler)
  },

  updateGame(id, body) {
    return service
      .patch(`/api/games/${id}`, body)
      .then((res) => res.data)
      .catch(errHandler)
  },

  deleteGame(id) {
    return service
      .delete(`/api/games/${id}`)
      .then((res) => res.data)
      .catch(errHandler)
  },
}
