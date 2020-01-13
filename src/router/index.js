import Vue from 'vue'
import VueRouter from 'vue-router'

import Dashboard from '@/components/dashboard/Dashboard'
import Signup from '@/components/auth/Signup'
import Signin from '@/components/auth/Signin'
import Wikis from '@/components/wikis/Wikis'
import Challenge from '@/components/challenge/Challenge'
import LeaderBoard from '@/components/challenge/LeaderBoard'
import ViewProfile from '@/components/layouts/ViewProfile'
import Upload from '@/components/challenge/Upload'

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
    path: '/wikis',
    name: 'wikis',
    component: Wikis,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/challenge',
    name: 'challenge',
    component: Challenge,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/leaderboard',
    name: 'leaderboard',
    component: LeaderBoard,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/profile/:id',
    name: 'viewProfile',
    component: ViewProfile,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/challenge/upload',
    name: 'upload',
    component: Upload,
    meta: {
      requiresAuth: true,
      requiresAdmin: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  let user = firebase.auth().currentUser
  if(to.matched.some(rec => rec.meta.requiresAdmin)) {
    let isAdmin = firebase.functions().httpsCallable('isAdmin')
    isAdmin({ uid: user.uid }).then(ret => {
      if(ret.data.res) {
        next()
      } else {
        next({ name: 'challenge' })
      }
    })
  }
  if(to.matched.some(rec => rec.meta.requiresAuth)) {
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
