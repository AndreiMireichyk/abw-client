<template>
  <div>
    <ValidationObserver ref="passwordForm" v-slot="{errors, passes}" :key="1">
      <form id="passwordForm" @submit.prevent="passes(changePassword)">
        <ValidationProvider v-slot="{errors}" rules="required" name="password">
          <a-form-item label="Текущий пароль" :errors="errors" label-col="4" label-align="left" input-col="4">
            <a-input type="password" v-model="password" placeholder="Введите действующий пароль"/>
          </a-form-item>
        </ValidationProvider>

        <ValidationProvider v-slot="{errors}" rules="required" name="newPassword">
          <a-form-item label="Новый пароль" :errors="errors" label-col="4" label-align="left" input-col="4">
            <a-input type="password" v-model="newPassword" placeholder="Введите новый пароль"/>
          </a-form-item>
        </ValidationProvider>

        <ValidationProvider v-slot="{errors}" rules="required" name="confirmPassword">
          <a-form-item label="Подтвердите пароль" :errors="errors" label-col="4" label-align="left" input-col="4">
            <a-input type="password" v-model="confirmPassword" placeholder="Подвердите новый пароль"/>
          </a-form-item>
        </ValidationProvider>

        <a-form-item label=" " label-col="4" label-align="left" input-col="4">
          <a-button type="primary" :loading="loading">Изменить пароль</a-button>
        </a-form-item>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AInput from '@/components/components/Input/AInput'
import AFormItem from '@/components/components/Form/AFormItem'
import AButton from '@/components/components/Button/AButton'
export default {
  name: 'ChangePassword',
  components: { AInput, AFormItem, AButton },
  data () {
    return {
      loading: false,
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

      this.loading = true

      this.$http.post(`${this.$config.host}/api/user/change_password`, data)
        .then(r => {
          this.$message.success(r.data.message)
          this.password = null
          this.newPassword = null
          this.confirmPassword = null
          this.loading = false
          this.$refs.passwordForm.reset()
        })
        .catch(e => {
          this.loading = false
          this.$refs.passwordForm.setErrors(e.response.data)
        })
    }
  }
}
</script>

<style scoped>

</style>
