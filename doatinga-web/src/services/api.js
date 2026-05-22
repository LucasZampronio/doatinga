import axios from 'axios'

const api = axios.create({
    baseURL: 'http://163.176.226.58/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
})

export default api;