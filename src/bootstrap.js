import Vue from 'vue'
import axios from 'axios'
import config from './app.config'
import { ValidationObserver, ValidationProvider, extend, localize } from 'vee-validate'
import ru from 'vee-validate/dist/locale/ru.json'
import * as rules from 'vee-validate/dist/rules'

Vue.prototype.$http = axios
Vue.prototype.$config = config

Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule])
})

localize('ru', ru)

Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)
