import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Categories from '../views/Advert/Create/Categories'
import Form from '../views/Advert/Create/Form'
import FormSuccess from '@/views/Advert/Create/FormSuccess'
import AdvertList from '@/views/Advert/List/List'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
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
      let params = route.params.params ? route.params.params.split('/') : []

      params = params.map(param => {
        let type

        let [code, value] = param.split(/(?:_([a-z-:,0-9]+))$/)

        if (value && value.match(/:/)) {
          type = 'range'
          const [from, to] = value.split(':')
          value = {
            from,
            to
          }
        } else if (value && value.match(/,/)) {
          type = 'multiple'
          value = value.split(',')
        } else {
          type = 'single'
        }

        return {
          type,
          code: code ?? null,
          value: value ?? null
        }
      })

      return {
        categorySlug: route.params.slug,
        searchParams: params
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

export default router
