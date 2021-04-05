const advImport = {
  namespaced: true,

  state: {
    type: 123,
    category: null,
    file: null
  },

  mutations: {
    type: (state, type) => {
      state.type = type
    },
    category: (state, category) => {
      state.category = category
    },
    clear (state) {
      state.type = null
      state.category = null
    }
  },

  getters: {
    type: (state) => {
      return state.type
    },

    category: (state) => {
      return state.category
    }
  },

  actions: {}
}

export default advImport
