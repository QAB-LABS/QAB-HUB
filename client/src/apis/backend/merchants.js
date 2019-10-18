import errHandler from './error'
import getService from './config'

const service = getService()

export default {
    searchMerchants() {
        return service
            .get('/api/merchants/search')
            .then(res => res.data)
            .catch(errHandler)
    },

    getMerchants() {
        return service
            .get('/api/merchants')
            .then(res => res.data)
            .catch(errHandler)
    },

    addMerchant(body) {
        return service
            .post('/api/merchants', body)
            .then(res => res.data)
            .catch(errHandler)
    },

    getMerchant(id) {
        return service
            .get(`/api/merchants/${id}`)
            .then(res => res.data)
            .catch(errHandler)
    },

    updateMerchant(id, body) {
        return service
            .patch(`/api/merchants/${id}`, body)
            .then(res => res.data)
            .catch(errHandler)
    },

    deleteMerchant(id) {
        return service
            .delete(`/api/merchants/${id}`)
            .then(res => res.data)
            .catch(errHandler)
    },
}