<template>
  <div>
    <ValidationObserver ref="passwordForm" v-slot="{errors, passes}" :key="1">
      <form id="passwordForm" @submit.prevent="passes(changePassword)">
        <ValidationProvider v-slot="{errors}" rules="required" name="password" tag="div" class="control">
          <label class="control__label">Текущий пароль</label>
          <div class="control__group">
            <input type="password" class="control__input" v-model="password" placeholder="Введите действующий пароль">
            <small class="control__error" v-if="errors.length">{{ errors[0] }}</small>
          </div>
        </ValidationProvider>
        <ValidationProvider v-slot="{errors}" rules="required" name="newPassword" tag="div" class="control">
          <label class="control__label">Новый пароль</label>
          <div class="control__group">
            <input type="password" class="control__input" v-model="newPassword"
                   placeholder="Введите новый пароль">
            <small class="control__error" v-if="errors.length">{{ errors[0] }}</small>
          </div>
        </ValidationProvider>
        <ValidationProvider v-slot="{errors}" rules="required" name="confirmPassword" tag="div" class="control">
          <label class="control__label">Подтвердите пароль</label>
          <div class="control__group">
            <input type="password" class="control__input" v-model="confirmPassword"
                   placeholder="Подвердите новый пароль">
            <small class="control__error" v-if="errors.length">{{ errors[0] }}</small>
          </div>
        </ValidationProvider>
        <div class="control">
          <label class="control__label"></label>
          <div class="control__group">
            <button class="btn btn-primary">Изменить пароль</button>
          </div>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ChangePassword',
  data () {
    return {
      password: null,
      newPassword: null,
      confirmPassword: null
    }
  },
  computed: {
    ...mapGetters('profile', ['profile'])
  },
  methods: {
    changePassword () {
      const data = new URLSearchParams()
      data.append('form[password]', this.password)
      data.append('form[newPassword][', this.newPassword)
      data.append('form[confirmPassword]', this.confirmPassword)

      this.$http.post(`${this.$config.host}/api/user/change_password`, data)
        .then(r => {
          this.$message.success(r.data.message)
          this.password = null
          this.newPassword = null
          this.confirmPassword = null
          this.$refs.passwordForm.reset()
        })
        .catch(e => {
          this.$refs.passwordForm.setErrors(e.response.data)
        })
    }
  }
}
</script>

<style scoped>

</style>
