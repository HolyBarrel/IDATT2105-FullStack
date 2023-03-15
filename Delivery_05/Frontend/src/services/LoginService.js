import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {
    postMessage(message){
        return apiClient.post('/users', message)
    },
    getStatus() {
        return apiClient.get('/answer')
    },
    getUsers() {
        return apiClient.get('/users')
    }
}