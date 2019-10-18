import axios from 'axios'

const base = process.env.NODE_ENV === 'production' ? '' : `http://${window.location.hostname}:5000`

export default function getService(endpoint) {
    const route = `api/${endpoint}`
    const baseURL = `${base}/${route}`
    return axios.create({
        baseURL,
        withCredentials: true,
    })
}
