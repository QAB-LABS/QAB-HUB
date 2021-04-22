import axios from 'axios'

console.log(
  `NODE_ENV: ${process.env.NODE_ENV}, API_URL: ${process.env.API_URL}`
)

const backendClient = () => axios.create({ baseURL: '', withCredentials: true })

export default backendClient
