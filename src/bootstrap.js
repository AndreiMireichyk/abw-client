import Vue from 'vue'
import axios from 'axios'
import config from './app.config'
import { ValidationObserver, ValidationProvider, extend, localize } from 'vee-validate'
import ru from 'vee-validate/dist/locale/ru.json'
import * as rules from 'vee-validate/dist/rules'
import services from './service/services'
import { message } from 'ant-design-vue'
import store from './store'
import VueFrappe from 'vue2-frappe'

Vue.use(VueFrappe)
// Configuration global plugins
Vue.prototype.$http = axios
Vue.prototype.$config = config
Vue.prototype.$errorHandling = services.errorHandling
Vue.prototype.$message = message

// VeeValidator configuration
Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule])
})

localize('ru', ru)

Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)

const token = localStorage.getItem('token')

// axios default response error handler
Vue.prototype.$http.interceptors.response.use(undefined, (error) => {
  // HTTP Error 401 - Unauthorized
  if (error.response.status === 401) {
    store.dispatch('auth/logOut').then()
  }
  if (error.response.status === 422) {

  }
  return Promise.reject(error)
})

// auth
if (token) {
  Vue.prototype.$http.defaults.headers.common.Authorization = `Bearer ${token}`
}
