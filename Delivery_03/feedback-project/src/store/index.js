import { createStore } from 'vuex'
import CollectionService from '../services/CollectionService.js';

export default createStore({
  state: {
    messages: [],
    error: "",
    status: ""
  },
  mutations: {
    ADD_CONTACT_MSG(state, payload) {
      state.messages.push(payload)
    },
    GET_STATUS(state, payload) {
      state.status = payload
    },
    
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
        console.log(err)
      })
    }
  }
})
