import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth';
import sidebar from './modules/sidebar'
import users from './modules/users'

Vue.use(Vuex)

const state = {
  api_url: process.env.VUE_APP_API_URL,
}

export default new Vuex.Store({
  state,
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    sidebar,
    users
  }
})
