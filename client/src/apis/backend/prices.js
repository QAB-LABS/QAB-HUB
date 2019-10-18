import errHandler from './error'
import getService from './config'

const service = getService()

export default {
    searchPrices() {
        return service
            .get('/prices/search')
            .then(res => res.data)
            .catch(errHandler)
    },

    getPrices() {
        return service
            .get('/prices')
            .then(res => res.data)
            .catch(errHandler)
    },

    addPrice(body) {
        return service
            .post('/prices', body)
            .then(res => res.data)
            .catch(errHandler)
    },

    getPrice(id) {
        return service
            .get(`/prices/${id}`)
            .then(res => res.data)
            .catch(errHandler)
    },

    updatePrice(id, body) {
        return service
            .patch(`/prices/${id}`, body)
            .then(res => res.data)
            .catch(errHandler)
    },

    deletePrice(id) {
        return service
            .delete(`/prices/${id}`)
            .then(res => res.data)
            .catch(errHandler)
    },
}