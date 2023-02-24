import { createStore } from 'vuex'
import CollectionService from '../services/CollectionService.js';
import CalculatorService from '../services/CalculatorService.js';

export default createStore({
  state: {
    messages: [],
    equations: [],
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
    }

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
    }
  },
  getters: {
    getEquation (state) {
      return state.equation
    }
  }
})
