import axios from 'axios'

console.log(`NODE_ENV: ${process.env.NODE_ENV}, API_URL: ${process.env.API_URL}`)
const base = process.env.NODE_ENV === 'production' ? '' : `https://127.0.0.1:${process.env.PORT}` // WAS https://${window.location.hostname}

export default function getService() {
    const baseURL = base
    console.log(`Creating service with endpoint: ${baseURL}`)
    return axios.create({
        baseURL,
        withCredentials: true,
    })
}