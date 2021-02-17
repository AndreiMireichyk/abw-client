
function auth ({ next, store }) {
  const auth = store.getters['auth/auth']
  if (!auth) {
    localStorage.setItem('backURI', location.pathname)
    next('/login')
  }
}

function notAuth ({ next, store }) {
  const auth = store.getters['auth/auth']
  if (auth) next('/user')
}

export default {
  auth,
  notAuth
}
