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
    }
  },

  getters: {
    profile (state) {
      return state.profile
    },
    updatedData (state) {
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
    removePhoto (state, index) {
      state.profile.photo = null
    }
  },

  actions: {
    profile ({ commit }) {
      axios.get(`${config.host}/api/user/profile`)
        .then(res => {
          commit('profile', res.data)
        })
        .catch(res => {

        })
    },
    applyChanges ({ getters }) {
      return new Promise((resolve, reject) => {
        axios.post(`${config.host}/api/user/profile/update`, getters.updatedData)
          .then(response => {
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
