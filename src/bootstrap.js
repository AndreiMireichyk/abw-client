import Vue from 'vue'
import axios from 'axios'
import config from './app.config'
import { ValidationObserver, ValidationProvider, extend, localize } from 'vee-validate'
import ru from 'vee-validate/dist/locale/ru.json'
import * as rules from 'vee-validate/dist/rules'
import services from './_service/services'
import { message } from 'ant-design-vue'

Vue.prototype.$http = axios
Vue.prototype.$config = config
Vue.prototype.$errorHandling = services.errorHandling
Vue.prototype.$message = message

Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule])
})

localize('ru', ru)

Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)

// auth
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common.Authorization = `Bearer ${token}`
}
