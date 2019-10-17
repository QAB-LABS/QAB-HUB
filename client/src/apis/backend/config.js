import axios from 'axios'

const base = process.env.NODE_ENV === 'production' ? process.env.API_URL : `http://${window.location.hostname}:5000`

export default function getService(path) {
    const route = `api/${path}`
    return axios.create({
        baseURL: `${base}/${route}`,
        withCredentials: true,
    })
}
