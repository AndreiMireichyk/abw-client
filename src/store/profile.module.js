import axios from 'axios'
import config from '../app.config'

const profile = {
  namespaced: true,

  state: {
    profile: {
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
      return {
        firstName: state.profile.firstName,
        lastName: state.profile.lastName,
        middleName: state.profile.middleName,
        photo: state.profile.photo,
        phones: state.profile.phones,
        emails: state.profile.emails,
        country: state.profile.location.country,
        region: state.profile.location.region,
        city: state.profile.location.city
      }
    }
  },

  mutations: {
    profile (state, payload) {
      state.profile = payload
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
      alert('asd')
      return new Promise((resolve, reject) => {
        axios.post(`${config.host}/api/user/update`, { form: getters.updatedData })
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
