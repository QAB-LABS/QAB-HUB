import axios from 'axios'

console.log(`NODE_ENV: ${process.env.NODE_ENV}, API_URL: ${process.env.API_URL}`)
const base = process.env.NODE_ENV === 'production' ? '' : `https://${window.location.hostname}:5000`

export default function getService() {
    const baseURL = base
    console.log(`Creating service with endpoint: ${baseURL}`)
    return axios.create({
        baseURL,
        withCredentials: true,
    })
}