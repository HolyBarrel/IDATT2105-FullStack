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
    getData() {
        return apiClient.get('/collection')
    },
    postMessage(message){
        return apiClient.post('/collection', message)
    },
    getStatus() {
        return apiClient.get('/answer')
    }
}