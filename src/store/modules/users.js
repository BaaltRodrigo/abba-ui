import Vue from 'vue'
import axios from 'axios'

const state = {
  all: [],
  user: null,
  personalInformation: null
}

const mutations = {
  setUsers(state, users) {
    state.all = users
  },

  setUser(state, user) {
    state.user = user
  },

  setPersonalInformation(state, information) {
    state.personalInformation = information
  },

  addUser(state, user) {
    state.all.push(user);
  },

  deleteUser(state, userId) {
    // console.log(user)
    let index = state.all.findIndex( u => { return u.id == userId })
    // console.log(index);
    state.all.splice(index, 1)
  },

  updateUser(state, user) {
    let index = state.all.findIndex( u => { return u.id == user.id })
    state.all.splice(index, 1, user);
  }
}

const actions = {
  async getAllUsers({commit, rootState}) {
    const config = {
      url: `${rootState.api_url}/users`,
      method: 'GET',
      headers: {Authorization: 'Bearer ' + Vue.$cookies.get('jwt')}
    }
    try {
      const response = await axios(config);
      commit('setUsers', response.data);
      return response.status;
    } catch(error) {
      return error.response.status
    }
  },

  async deleteUser({commit, rootState}, userId) {
    const config = {
      url: `${rootState.api_url}/users/${userId}`,
      method: 'DELETE',
      headers: {Authorization: 'Bearer ' + Vue.$cookies.get('jwt')},
    }
    try {
      const response = await axios(config);
      commit('deleteUser', userId)
      return response.status;
    } catch(error) {
      return error.response.status
    }
  },

  async addPersonalInformation({state, commit, rootState}, payload) {
    const config = {
      url: `${rootState.api_url}/users/${state.user.id}/personal-information`,
      method: 'POST',
      headers: {Authorization: 'Bearer ' + Vue.$cookies.get('jwt')},
      data: payload,
    }
    try {
      const response = await axios(config);
      commit('setPersonalInformation', response.data);
      return response.status;
    } catch(error) {
      return error.response.status;
    }
  },

  async saveUser({commit, rootState}, payload) {
    const config = {
      url: `${rootState.api_url}/users`,
      method: 'POST',
      headers: {Authorization: 'Bearer ' + Vue.$cookies.get('jwt')},
      data: payload
    }
    try {
      const response = await axios(config)
      commit('addUser', response.data);
      commit('setUser', response.data);
      console.log(response);
      return response.status;
    } catch(error) {
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