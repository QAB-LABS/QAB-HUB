import axios from 'axios'
import errHandler from './error'

const service = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ?
        '/api/prices' : `http://${window.location.hostname}:5000/api/prices`,
    withCredentials: true,
})

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

    deletePrice(id, body) {
        return service
            .patch(`/${id}`, body)
            .then(res => res.data)
            .catch(errHandler)
    },
}