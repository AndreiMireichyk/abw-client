export const errorHandling = function (res) {
  console.log()
  const response = res.response

  const message = response.data.message

  if (response.status === 401) {
    // store.dispatch('auth/logOut')
  }

  if (response.status === 422) {
    if (message) this.$message.error(message)
    this.$refs.form.setErrors(response.data.errors)
  } else {
    if (message) this.$message.error('Error - ' + response.status)
  }
}

export default {
  errorHandling
}
