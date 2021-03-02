import Vue from 'vue'
import VueRouter from 'vue-router'

import guards from '../guard/guard'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Auth/Login'),
    meta: {
      guards: ['notAuth']
    }
  },
  {
    path: '/reset-password/:hash?',
    name: 'reset-password',
    component: () => import('@/views/Auth/ResetPassword'),
    meta: {
      guards: ['notAuth']
    }
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('@/views/User/User'),
    meta: {
      guards: ['auth']
    },
    children: [
      {
        path: 'adverts/:slug',
        name: 'user.adverts',
        component: () => import('@/views/User/Advert/Advert'),
        props: (route) => ({ slug: route.params.slug }),
        meta: {
          guards: ['auth']
        }
      },
      {
        path: 'favorites/:slug?',
        name: 'user.favorites',
        component: () => import('@/views/User/Favorite/Favorite'),
        props: (route) => ({ slug: route.params.slug }),
        meta: {
          guards: ['auth']
        }
      },
      {
        path: 'settings/personal',
        name: 'user.personal',
        component: () => import('@/views/User/Settings/Personal'),
        meta: {
          guards: ['auth']
        }
      },
      {
        path: 'settings/security',
        name: 'user.security',
        component: () => import('@/views/User/Settings/Security'),
        meta: {
          guards: ['auth']
        }
      },
      {
        path: 'settings/notification',
        name: 'user.notification',
        component: () => import('@/views/User/Settings/Notification'),
        meta: {
          guards: ['auth']
        }
      },
      {
        path: 'balance/refill',
        name: 'user.balance.refill',
        component: () => import('@/views/User/Balance/Refill'),
        meta: {
          guards: ['auth']
        }
      },
      {
        path: 'balance/history',
        name: 'user.balance.history',
        component: () => import('@/views/User/Balance/History'),
        meta: {
          guards: ['auth']
        }
      }
    ]
  },
  {
    path: '/advert/add',
    name: 'ad-category',
    component: () => import('@/views/Advert/Create/Categories')
  },
  {
    path: '/advert/add/:slug',
    name: 'ad-form',
    component: () => import('@/views/Advert/Create/Form')
  },
  {
    path: '/:slug/prodaja/:params*',
    name: 'ad-cat-list',
    component: () => import('@/views/Advert/List/List'),
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
    component: () => import('@/views/Advert/List/List')
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
