import axios from 'axios'

console.log(`NODE_ENV: ${process.env.NODE_ENV}, API_URL: ${process.env.API_URL}`)
const base = process.env.NODE_ENV === 'https://boardgamesilo-dev.azurewebsites.net/' ? '' : `http://${window.location.hostname}:5000`

export default function getService(endpoint) {
    const route = `api/${endpoint}`
    const baseURL = base ? `${base}/${route}` : route
    return axios.create({
        baseURL,
        withCredentials: true,
    })
}
