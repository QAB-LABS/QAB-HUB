import axios from 'axios'

console.log(`NODE_ENV: ${process.env.NODE_ENV}, API_URL: ${process.env.API_URL}`)
const base = process.env.NODE_ENV === 'production' ? process.env.API_URL : `http://${window.location.hostname}:5000`

export default function getService(endpoint) {
    const route = `api/${endpoint}`
    const baseURL = `${base}/${route}`
    console.log(`Setting up API route service at URL: ${baseURL}: ${base}, ${route}`)
    return axios.create({
        baseURL,
        withCredentials: true,
    })
}
