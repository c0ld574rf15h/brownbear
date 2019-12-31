import Vue from 'vue'
import VueRouter from 'vue-router'

import Dashboard from '@/components/dashboard/Dashboard'
import Signup from '@/components/auth/Signup'
import Signin from '@/components/auth/Signin'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup
  },
  {
    path: '/signin',
    name: 'signin',
    component: Signin
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
