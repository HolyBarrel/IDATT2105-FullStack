import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {
    getData() {
        return apiClient.get('/equations')
    },
    postMessage(message){
        return apiClient.post('/equations', message)
    },
    getUserData(userId){
        return apiClient.post('/equations/user/' + userId)
    }
}