import axios from 'axios'

const backendClient = () => axios.create({ baseURL: '', withCredentials: true })

export default backendClient
