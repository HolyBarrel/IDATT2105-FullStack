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
    checkUser(message){
        return apiClient.post('/users/login', message)
    }
}