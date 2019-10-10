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

    getPrice(body) {
        return service
            .get(`/${body.id}`)
            .then(res => res.data)
            .catch(errHandler)
    },

    updatePrice(body) {
        return service
            .patch(`/${body.id}`, body)
            .then(res => res.data)
            .catch(errHandler)
    },

    deletePrice(body) {
        return service
            .patch(`/${body.id}`, body)
            .then(res => res.data)
            .catch(errHandler)
    },
}