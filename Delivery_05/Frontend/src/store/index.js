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
    authorizedId: null

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
    }
  },
  actions: {
    createMessage({ commit }, payload) {
      CollectionService.postMessage(payload)
        .then(() => {
          commit('ADD_CONTACT_MSG', payload)
        })
        .catch(err => {
          alert(err)
        })
    },
    fetchStatus({ commit }) {
      CollectionService.getStatus()
      .then(response => {
        commit('GET_STATUS', response.data.status)
      })
      .catch(err => {
        alert(err)
      })
    },
    createEquation({ commit }, payload) {
      CalculatorService.postMessage(payload)
        .then(() => {
          commit('ADD_EQUATION', payload)
        })
        .catch(err => {
          alert(err)
        })
    },
    fetchEquation({ commit }) {
      CalculatorService.getData()
      .then(response => {
        commit('GET_EQUATION', response.data)
      })
      .catch(err => {
        alert(err)
      })
    },
    createUser({ commit }, payload) {
      LoginService.postMessage(payload)
        .then(() => {
          commit('ADD_USERS', payload)
        })
        .catch(err => {
          alert(err)
        })
    },
    /*fetchUsers({ commit }) {
      LoginService.getUsers()
      .then(response => {
        commit('GET_USERS', response.data)
      })
      .catch(err => {
        alert(err)
      })
    },*/
    logUserIn({ commit }) {
      commit('SET_AUTHORIZED', true)

    },
    logUserOut({ commit }) {
      commit('SET_AUTHORIZED', false)
    },
    async checkUser({commit}, user) {
      try {
        const response = await LoginService.checkUser(user);
        commit('SET_AUTHORIZED', response)
        return response
      } catch (error) {
        console.log('Error: ' + error)
      }
    }
  },
  getters: {
  }
})
