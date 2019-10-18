import axios from 'axios'
console.log(process.env.API_URL)
console.log(process.env.TEST)
const base = process.env.NODE_ENV === 'production' ? '' : `http://${window.location.hostname}:5000`

export default function getService(endpoint) {
    const route = `api/${endpoint}`
    const baseURL = base ? `${base}/${route}` : route
    return axios.create({
        baseURL,
        withCredentials: true,
    })
}
