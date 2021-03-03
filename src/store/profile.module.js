import axios from 'axios'
import config from '../app.config'

const profile = {
  namespaced: true,

  state: {
    profile: {
      id: null,
      username: null,
      firstName: null,
      lastName: null,
      middleName: null,
      photo: null,
      balance: null,
      phone: '',
      email: null,
      phones: [],
      emails: [],
      address: null,
      location: {
        city: null,
        region: null,
        country: null
      }
    },
    favoriteIds: [],
    favoriteCategories: [],
    advertCategories: []
  },

  getters: {
    profile (state) {
      return state.profile
    },
    advertCategories (state) {
      return state.advertCategories
    },
    favoriteCategories (state) {
      return state.favoriteCategories
    },
    favoriteIds (state) {
      return state.favoriteIds
    },
    totalAdverts (state) {
      return state.advertCategories.reduce((a, b) => a + b.total, 0)
    },
    totalFavorites (state) {
      return state.favoriteCategories.reduce((a, b) => a + b.total, 0)
    },
    formattedPhone (state) {
      if ([null, ''].includes(state.profile.phone)) return 'не указан'

      const match = state.profile.phone.match(/^(\+\d{3})(\d{2})(\d{3})(\d{2})(\d{2})$/)

      return match ? `${match[1]} (${match[2]}) ${match[3]}-${match[4]}-${match[5]}` : null
    },
    prepareFormData (state) {
      const data = new URLSearchParams()
      data.append('form[firstName]', state.profile.firstName)
      data.append('form[lastName]', state.profile.lastName)
      data.append('form[middleName]', state.profile.middleName)
      data.append('form[photo]', state.profile.photo)
      data.append('form[country]', state.profile.location.country)
      data.append('form[region]', state.profile.location.region)
      data.append('form[city]', state.profile.location.city)

      state.profile.phones
        .filter((item) => !!item)
        .map(item => {
          data.append('form[phones][]', item)
        })

      state.profile.emails
        .filter((item) => !!item)
        .map(item => {
          data.append('form[emails][]', item)
        })

      return data
    }
  },

  mutations: {
    profile (state, payload) {
      state.profile = payload
    },
    advertCategories (state, payload) {
      state.advertCategories = payload
    },
    favoriteCategories (state, payload) {
      state.favoriteCategories = payload
    },
    favoriteIds (state, payload) {
      state.favoriteIds = payload
    },
    changePhone (state, payload) {
      state.profile.phone = payload
    },
    addPhone (state) {
      state.profile.phones.push('')
    },
    removePhone (state, index) {
      state.profile.phones.splice(index, 1)
    },
    addEmail (state) {
      state.profile.emails.push('')
    },
    removeEmail (state, index) {
      state.profile.emails.splice(index, 1)
    },
    setPhoto (state, payload) {
      state.profile.photo = payload
    },
    removePhoto (state) {
      state.profile.photo = null
    }
  },

  actions: {
    profile ({ commit, dispatch }) {
      axios.get(`${config.host}/api/user/profile`)
        .then(res => {
          commit('profile', res.data)
          dispatch('advertCategories')
          dispatch('favoriteCategories')
          dispatch('favoriteIds')
        })
        .catch(res => {

        })
    },
    applyChanges ({ getters }) {
      return new Promise((resolve, reject) => {
        axios.post(`${config.host}/api/user/profile/update`, getters.prepareFormData)
          .then(response => {
            resolve(response)
          })

          .catch(response => {
            reject(response)
          })
      })
    },
    advertCategories ({ commit }) {
      axios.get(`${config.host}/api/user/categories_with_user_ads`)
        .then(res => {
          commit('advertCategories', res.data)
        })
        .catch(res => {

        })
    },
    favoriteCategories ({ commit }) {
      axios.get(`${config.host}/api/user/categories_with_user_favorite_ads`)
        .then(res => {
          commit('favoriteCategories', res.data)
        })
        .catch(res => {

        })
    },
    favoriteIds ({ commit }) {
      axios.get(`${config.host}/api/user/favorites/ids`)
        .then(res => {
          commit('favoriteIds', res.data)
        })
        .catch(res => {

        })
    },
    toggleFavorite ({ commit, dispatch }, id) {
      return new Promise((resolve, reject) => {
        axios.get(`${config.host}/api/user/favorites/toggle/${id}`)
          .then(response => {
            dispatch('favoriteCategories')
            dispatch('favoriteIds')
            resolve(response)
          })
          .catch(response => {
            reject(response)
          })
      })
    }
  }
}

export default profile
