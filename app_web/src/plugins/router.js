import Vue from 'vue'
import VueRouter from 'vue-router'

import Dashboard from '../views/Dashboard.vue'
import Funds from '../views/Funds.vue'
import Trades from '../views/Trades.vue'
import Datas from '../views/Datas.vue'
import About from '../views/About.vue'

import Users from '../views/Users.vue'
import Main from '../views/Main.vue'

import firebase from './firebase'

var auth = firebase.auth()

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: "/Main",
  },
  {
    path: '/Main',
    name: 'Main',
    component: Main,
    meta: {
      authenticated: false,

    }
  },
  {
    path: '/Dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      authenticated: true,

    }
  },
  {
    path: '/Funds',
    name: 'Funds',
    component: Funds,
    meta: {
      authenticated: true,

    }
  },
  {
    path: '/Trades',
    name: 'Trades',
    component: Trades,
    meta: {
      authenticated: true,

    }
  },
  {
    path: '/Datas',
    name: 'Datas',
    component: Datas,
    meta: {
      authenticated: true,

    }
  },
  {
    path: '/Users',
    name: 'Users',
    component: Users,
    meta: {
      authenticated: true,
    }
  },
  {
    path: '/About',
    name: 'About',
    component: About,
    meta: {
      authenticated: true,
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  auth.onAuthStateChanged((user) => {
    let authenticated = to.matched.some(record => record.meta.authenticated)
    if (user && authenticated) next()
    else if (user && !authenticated) next("/Dashboard")
    else if (!user && authenticated) next("/")
    else if (!user && !authenticated) next()
  });
})

export default router
