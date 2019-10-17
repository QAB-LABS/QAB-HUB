import errHandler from './error'
import getService from './config'

const service = getService('prices')

export default {
    searchPrices() {
        return service
            .get('/search')
            .then(res => res.data)
            .catch(errHandler)
    },

    getPrices() {
        return service
            .get('/')
            .then(res => res.data)
            .catch(errHandler)
    },

    addPrice(body) {
        return service
            .post('/', body)
            .then(res => res.data)
            .catch(errHandler)
    },

    getPrice(id) {
        return service
            .get(`/${id}`)
            .then(res => res.data)
            .catch(errHandler)
    },

    updatePrice(id, body) {
        return service
            .patch(`/${id}`, body)
            .then(res => res.data)
            .catch(errHandler)
    },

    deletePrice(id) {
        return service
            .delete(`/${id}`)
            .then(res => res.data)
            .catch(errHandler)
    },
}