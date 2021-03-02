import axios from 'axios'
import router from '../router'
import config from '../app.config'

const token = localStorage.getItem('token')

const auth = {
  namespaced: true,

  state: {
    token: token
  },

  mutations: {
    token: (state, payload) => {
      state.token = payload
    }
  },

  getters: {
    token: (state) => {
      return state.token
    },

    auth: (state) => {
      return !!state.token
    }
  },

  actions: {
    logIn: ({ commit }, payload) => {
      return new Promise((resolve, reject) => {
        axios.post(`${config.host}/api/auth`, payload)

          .then(response => {
            commit('token', response.data.token)
            axios.defaults.headers.common.Authorization = `Bearer ${response.data.token}`
            router.push('/user')
            localStorage.setItem('token', response.data.token)
            resolve(response)
          })

          .catch(response => {
            reject(response)
          })
      })
    },

    logOut: ({ state, commit }) => {
      commit('token', null)
      localStorage.removeItem('token')
      delete axios.defaults.headers.common.Authorization
      router.push('/login')
      return true
    }
  }
}

export default auth
