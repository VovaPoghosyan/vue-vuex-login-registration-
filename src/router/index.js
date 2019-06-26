import Vue from 'vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import 'vue-material/dist/vue-material.min.css'
import { MdButton, MdContent, MdTabs } from 'vue-material/dist/components'
import Router   from 'vue-router'
import Register from '@/components/Register'
import Login    from '@/components/Login'
import Account  from '@/components/Account'
import EditAccount  from '@/components/EditAccount'
import {store}  from '../store/store'

Vue.use(Router)
Vue.use(MdButton)
Vue.use(MdContent)
Vue.use(MdTabs)
Vue.use(VueMaterial)
Vue.use(store)

async function redirectIfNotAuth (to, from, next) {
  if(store.getters.userId) {
    next({ name: 'Account' })
  } else {
    next();
  }
}

async function redirectIfAuth (to, from, next) {
  if(store.getters.userId) {
    next();
  } else {
    next({ name: 'Login' })
  }
}

export default new Router({
  routes: [
    {
      path: '/register',
      name: 'Register',
      component: Register,
      beforeEnter: redirectIfNotAuth,
      
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      beforeEnter: redirectIfNotAuth,
    },
    {
      path: '/account',
      name: 'Account',
      component: Account,
      beforeEnter: redirectIfAuth,
    },
    {
      path: '/edit',
      name: 'EditAccount',
      component: EditAccount,
      beforeEnter: redirectIfAuth,
    },
  ],
});
