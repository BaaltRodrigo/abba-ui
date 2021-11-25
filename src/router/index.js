import Vue from 'vue'
import VueRouter from 'vue-router'
import Root from '../views/Root.vue'
import Login from '../views/Login.vue'
import store from '../store/index';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Root',
    component: Root
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  if (to.name != 'Login' && (await store.dispatch('auth/getCurrentUser') == 401)) {
    Vue.$cookies.remove('jwt');
    next({name: 'Login'})
  }
  next()
})

export default router
