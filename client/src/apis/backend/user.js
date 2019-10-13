import axios from 'axios'
import errHandler from './error'

const service = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? '/api/users' : `http://${window.location.hostname}:5000/api/users`,
    withCredentials: true,
})

export default {
    getUser(userId) {
        return service
            .get(`/${userId}`)
            .then(res => res.data)
            .catch(errHandler)
    },
}