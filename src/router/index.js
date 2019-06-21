import Vue from 'vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import 'vue-material/dist/vue-material.min.css'
import { MdButton, MdContent, MdTabs } from 'vue-material/dist/components'
import Router from 'vue-router'
import Register from '@/components/Register'

Vue.use(Router)
Vue.use(MdButton)
Vue.use(MdContent)
Vue.use(MdTabs)
Vue.use(VueMaterial)

export default new Router({
  routes: [
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
  ]
})
