import axios from 'axios'

const base = process.env.NODE_ENV === 'production' ? process.env.API_URL : `http://${window.location.hostname}:5000`

export default function getService(path) {
    const route = `api/${path}`
    const baseURL = `${base}/${route}`
    console.log(`Setting up API route service at URL: ${baseURL}`)
    return axios.create({
        baseURL,
        withCredentials: true,
    })
}
