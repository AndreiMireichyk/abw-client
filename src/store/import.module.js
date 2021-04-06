const advImport = {
  namespaced: true,

  state: {
    type: null,
    category: null,
    file: null,
    startAt: null,
    url: null,
    data: [],
    column: []
  },

  mutations: {
    type: (state, type) => {
      state.type = type
    },
    category: (state, category) => {
      state.category = category
    },
    data: (state, data) => {
      state.data = data
    },
    column: (state, column) => {
      state.column = column
    },
    url: (state, url) => {
      state.url = url
    },
    file: (state, file) => {
      state.file = file
    },
    startAt: (state, startAt) => {
      state.startAt = startAt
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
    },
    data: (state) => {
      return state.data
    },
    column: (state) => {
      return state.column
    },
    url: (state) => {
      return state.url
    },
    file: (state) => {
      return state.file
    },
    startAt: (state) => {
      return state.startAt
    }
  },

  actions: {}
}

export default advImport
