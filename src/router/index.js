import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index';

// Vistas
import Login from '../views/Login.vue'
import Root from '../views/Root.vue'
import CursosIndex from '../views/cursos/CursosIndex.vue'
import UserIndex from '../views/users/UserIndex.vue'
import MisCursosIndex from '../views/mis-cursos/MisCursosIndex.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Root',
    component: Root,
    children: [
      {
        path: 'usuarios',
        name: 'users.index',
        component: UserIndex
      },
      {
        path: 'usuarios/nuevo',
        name: 'users.create',
        component: () => import('../views/users/UserForm.vue')
      },
      {
        path: 'mis-cursos',
        name: 'mis-cursos.index',
        component: MisCursosIndex
      },
      {
        path: 'cursos',
        name: 'cursos.index',
        component: CursosIndex
      }
    ]
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
