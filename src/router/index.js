import Vue from 'vue'
import VueRouter from 'vue-router'

import Dashboard from '@/components/dashboard/Dashboard'
import Signup from '@/components/auth/Signup'
import Signin from '@/components/auth/Signin'
import Challenge from '@/components/challenge/Challenge'

import firebase from 'firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
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
  },
  {
    path: '/challenge',
    name: 'challenge',
    component: Challenge,
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(rec => rec.meta.requiresAuth)) {
    let user = firebase.auth().currentUser
    if(user) {
      next()
    } else {
      next({ name: 'signin' })
    }
  } else {
    next()
  }
})

export default router
