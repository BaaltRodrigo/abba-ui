// import Vue from 'vue'
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

  async login({commit, rootState}, payload) {
    const config = {
      url: `${rootState.api_url}/login`,
      method: 'POST',
      data: payload ,
    };
    try {
      const response = await axios(config);
      console.log(response);
      commit('setLogged', true);
    } catch(error) {
      commit('setLogged', false);
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