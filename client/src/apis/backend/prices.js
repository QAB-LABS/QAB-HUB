import errHandler from './error'
import getService from './config'

const service = getService()

export default {
    searchPrices() {
        return service
            .get('/api/prices/search')
            .then(res => res.data)
            .catch(errHandler)
    },

    getPrices() {
        return service
            .get('/api/prices')
            .then(res => res.data)
            .catch(errHandler)
    },

    addPrice(body) {
        return service
            .post('/api/prices', body)
            .then(res => res.data)
            .catch(errHandler)
    },

    getPrice(id) {
        return service
            .get(`/api/prices/${id}`)
            .then(res => res.data)
            .catch(errHandler)
    },

    updatePrice(id, body) {
        return service
            .patch(`/api/prices/${id}`, body)
            .then(res => res.data)
            .catch(errHandler)
    },

    deletePrice(id) {
        return service
            .delete(`/api/prices/${id}`)
            .then(res => res.data)
            .catch(errHandler)
    },
}