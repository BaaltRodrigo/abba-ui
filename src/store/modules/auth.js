import Vue from 'vue'
import axios from 'axios'

const state = {
  logged: false,
  currentUser: null,
}

const mutations = {
  setLogged(state, logged) {
    state.logged = logged;
  },

  setCurrentUser(state, current) {
    state.currentUser = current;
  }
}

const actions = {
  async test({rootState}) {
    const config = {
      url: `${rootState.api_url}/test`,
      method: 'GET',
    }
    console.log(await axios(config));
  },

  async getCurrentUser({commit, rootState}) {
    const accessToken = Vue.$cookies.get('jwt');
    const config = {
      url: `${rootState.api_url}/me`,
      method: 'GET',
      headers: { Authorization: 'Bearer ' + accessToken}
    };
    try {
      const response = await axios(config);
      commit('setCurrentUser', response.data);
      return response.status;
    } catch (error) {
      commit('setCurrentUser', null);
      return error.response.status;
    }
  },

  async login({commit, rootState}, payload) {
    const config = {
      url: `${rootState.api_url}/login`,
      method: 'POST',
      data: payload ,
    };
    try {
      const response = await axios(config)
      Vue.$cookies.set('jwt', response.data.access_token, -1)
      commit('setLogged', true)
      return response.status
    } catch(error) {
      commit('setLogged', false)
      return error.response.status
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}