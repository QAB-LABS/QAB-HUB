import errHandler from './error'
import getService from './config'

const service = getService('merchants')

export default {
    searchMerchants() {
        return service
            .get('/search')
            .then(res => res.data)
            .catch(errHandler)
    },

    getMerchants() {
        return service
            .get('/')
            .then(res => res.data)
            .catch(errHandler)
    },

    addMerchant(body) {
        return service
            .post('/', body)
            .then(res => res.data)
            .catch(errHandler)
    },

    getMerchant(id) {
        return service
            .get(`/${id}`)
            .then(res => res.data)
            .catch(errHandler)
    },

    updateMerchant(id, body) {
        return service
            .patch(`/${id}`, body)
            .then(res => res.data)
            .catch(errHandler)
    },

    deleteMerchant(id) {
        return service
            .delete(`/${id}`)
            .then(res => res.data)
            .catch(errHandler)
    },
}