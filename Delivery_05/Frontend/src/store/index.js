import { createStore } from 'vuex'
import CollectionService from '../services/CollectionService.js';
import CalculatorService from '../services/CalculatorService.js';
import LoginService from '../services/LoginService.js';

export default createStore({
  state: {
    messages: [],
    equations: [],
    users: [],
    status: "",
    formData: {
      name: "",
      email: "",
      message: ""
    },
    equation: {
      firstNumber: null,
      operator: '',
      secondNumber: null,
      result: null
    },
    authorized: false,
    authorizedId: null,
    userData: null
  },
  mutations: {
    ADD_CONTACT_MSG(state, payload) {
      state.messages.push(payload)
    },
    GET_STATUS(state, payload) {
      state.status = payload
    },
    ADD_EQUATION(state, payload) {
      state.equations.push(payload)
    },
    GET_EQUATION(state, payload) {
      state.equation = payload
    },
    ADD_USER(state, payload) {
      state.users.push(payload)
    },
    GET_USERS(state, payload) {
      state.users = payload
    },
    SET_AUTHORIZED(state, payload) {
      state.authorized = payload
    },
    SET_AUTHORIZED_ID(state, payload) {
      state.authorizedId = payload
    },
    SET_USER_DATA(state, payload) {
      state.userData = payload
    }
  },
  actions: {
    async createMessage({ commit }, payload) {
      await CollectionService.postMessage(payload)
        .then(() => {
          commit('ADD_CONTACT_MSG', payload)
        })
        .catch(err => {
          alert(err)
        })
    },
    async fetchStatus({ commit }) {
      await CollectionService.getStatus()
      .then(response => {
        commit('GET_STATUS', response.data.status)
      })
      .catch(err => {
        alert(err)
      })
    },
    async createEquation({ commit }, payload) {
      await CalculatorService.postMessage(payload)
        .then(() => {
          commit('ADD_EQUATION', payload)
        })
        .catch(err => {
          alert(err)
        })
    },
    async fetchEquation({ commit }) {
      await CalculatorService.getData()
      .then(response => {
        commit('GET_EQUATION', response.data)
      })
      .catch(err => {
        alert(err)
      })
    },
    async createUser({ commit }, payload) {
      await LoginService.postMessage(payload)
        .then(() => {
          commit('ADD_USERS', payload)
        })
        .catch(err => {
          alert(err)
        })
    },
    logUserOut({ commit }) {
      commit('SET_AUTHORIZED', false)
      commit('SET_AUTHORIZED_ID', null)
    },
    async checkUser({commit}, user) {
      try {
        const response = await LoginService.checkUser(user);
        commit('SET_AUTHORIZED', response)
        return response
      } catch (error) {
        console.log('Error: ' + error)
      }
    },
    async fetchUserId({commit}, user) {
      try {
        const response = await LoginService.getUserId(user);
        commit('SET_AUTHORIZED_ID', response.data)
        return response.data
      } catch (error) {
        console.log('Error: ' + error)
      }
    },
    async fetchUserData({commit}, userId) {
      try {
        const response = await CalculatorService.getUserData(userId);
        commit('SET_USER_DATA', response.data)
        return response.data
      } catch (error) {
        console.log('Error: ' + error)
      }
    },

  }
})
