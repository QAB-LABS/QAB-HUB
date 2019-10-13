import axios from 'axios'
import errHandler from './error'

const service = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ?
        '/api/merchants' : `http://${window.location.hostname}:5000/api/merchants`,
    withCredentials: true,
})

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