import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {
    getData() {
        return apiClient.get('/equation')
    },
    postMessage(message){
        return apiClient.post('/equation', message)
    }
}