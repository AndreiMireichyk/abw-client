import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Categories from '../views/Advert/Create/Categories'
import Form from '../views/Advert/Create/Form'
import FormSuccess from '@/views/Advert/Create/FormSuccess'
import AdvertList from '@/views/Advert/List/List'
import Login from '@/views/Auth/Login'
import User from '../views/User/User'
import guards from '../guard/guard'
import store from '../store'

import Personal from '@/views/User/Settings/Personal'
import Security from '@/views/User/Settings/Security'
import Notification from '@/views/User/Settings/Notification'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      guards: ['not_auth']
    }
  },
  {
    path: '/user',
    name: 'user',
    component: User,
    meta: {
      guards: ['auth']
    },
    children: [
      {
        path: 'settings/personal',
        name: 'user.personal',
        component: Personal,
        meta: {
          guards: ['auth']
        }
      },
      {
        path: 'settings/security',
        name: 'user.security',
        component: Security,
        meta: {
          guards: ['auth']
        }
      },
      {
        path: 'settings/notification',
        name: 'user.notification',
        component: Notification,
        meta: {
          guards: ['auth']
        }
      }
    ]
  },
  {
    path: '/registration',
    name: 'registration',
    component: Login,
    meta: {
      guards: ['not_auth']
    }
  },
  {
    path: '/advert/add',
    name: 'ad-category',
    component: Categories
  },
  {
    path: '/advert/add/:slug',
    name: 'ad-form',
    component: Form
  },
  {
    path: '/advert/add/success',
    name: 'ad-success',
    component: FormSuccess
  },

  {
    path: '/:slug/prodaja/:params*',
    name: 'ad-cat-list',
    component: AdvertList,
    props: (route) => {
      return {
        pathParams: route.params.params,
        categorySlug: route.params.slug
      }
    }
  },
  {
    path: '/:slug/:location?/prodaja/:id',
    name: 'ad-detail',
    props: (route) => ({ location: route.params.location || 'belarus' }),
    component: Home
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

// Guards protection
router.beforeEach((to, from, next) => {
  const ctx = {
    to,
    from,
    next,
    router,
    store
  }

  to.matched.map(route => {
    if (!route.meta.guards) return false

    route.meta.guards.map(nameGuard => {
      if (nameGuard in guards) guards[nameGuard](ctx)
    })
  })

  next()
})

export default router
