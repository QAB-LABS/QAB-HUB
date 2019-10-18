import errHandler from './error'
import getService from './config'

const service = getService()

export default {
    searchMerchants() {
        return service
            .get('/merchants/search')
            .then(res => res.data)
            .catch(errHandler)
    },

    getMerchants() {
        return service
            .get('/merchants')
            .then(res => res.data)
            .catch(errHandler)
    },

    addMerchant(body) {
        return service
            .post('/merchants', body)
            .then(res => res.data)
            .catch(errHandler)
    },

    getMerchant(id) {
        return service
            .get(`/merchants/${id}`)
            .then(res => res.data)
            .catch(errHandler)
    },

    updateMerchant(id, body) {
        return service
            .patch(`/merchants/${id}`, body)
            .then(res => res.data)
            .catch(errHandler)
    },

    deleteMerchant(id) {
        return service
            .delete(`/merchants/${id}`)
            .then(res => res.data)
            .catch(errHandler)
    },
}