import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import store from './store'
import router from './router'
import VueCookies from 'vue-cookies';

Vue.config.productionTip = false
Vue.use(VueCookies);

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
