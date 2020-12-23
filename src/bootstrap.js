import Vue from 'vue'
import axios from 'axios'
import config from './app.config'
Vue.prototype.$http = axios
Vue.prototype.$config = config
