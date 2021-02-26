<template>
  <ValidationObserver ref="phoneForm" v-slot="{errors, passes}" :key="1">
    <form id="phoneFormStep3" @submit.prevent="passes(changePhone)" v-if="newPhoneCodeSent" :key="2">

      <ValidationProvider v-slot="{errors}" rules="required" name="newCode">
        <a-form-item label="Код подверждения" label-col="4" input-col="4" :errors="errors">
          <a-input type="number" v-model="newCode" placeholder="Введите код подтверждения"/>
          <template #desc>
            На номер телефона {{ phone }} было отправлено сообщение с кодом подтверждения.
          </template>
          <template #actions>
            <a-button weight="bold" el-style="link">Привязать номер</a-button>
            <a-link weight="bold" type="danger" @click.native.prevent="newPhoneCodeSent = false">Назад</a-link>
          </template>
          <template></template>
        </a-form-item>
      </ValidationProvider>
    </form>

    <form id="phoneFormStep2" @submit.prevent="passes(acceptChangePhone)" v-else-if="phoneCodeSent" :key="3">
      <ValidationProvider v-slot="{errors}" rules="required" name="phone">
        <a-form-item label="Новый телефон" label-col="4" input-col="4" :errors="errors">
          <a-tel-input v-model="phone"></a-tel-input>
        </a-form-item>
      </ValidationProvider>
      <ValidationProvider v-slot="{errors}" rules="required" name="code">
        <a-form-item label="Код подверждения" label-col="4" input-col="4" :errors="errors">
          <a-input type="number" v-model="code" placeholder="Введите код подтверждения"/>
          <ValidationProvider v-slot="{errors}" name="ip">
            <a-form-item label="" :errors="errors" v-if="errors.length"/>
          </ValidationProvider>
          <template #desc>
            На номер телефона {{ formattedPhone }} было отправлено сообщение с кодом подтверждения.
          </template>
          <template #actions>
            <a-button weight="bold" el-style="link">Продолжить</a-button>
            <a-link weight="bold" type="danger" @click.native.prevent="phoneCodeSent = false">Назад</a-link>
          </template>
        </a-form-item>
      </ValidationProvider>
    </form>

    <form id="phoneFormStep1" @submit.prevent="passes(sendPhoneCode)" v-else :key="4">
      <ValidationProvider v-slot="{errors}" rules="required" name="phone">
        <a-form-item label="Текущий телефон" :errors="errors" label-col="4" input-col="4">
          <a-input v-model="formattedPhone" placeholder="Введите новый пароль" :disabled="true"/>
          <ValidationProvider v-slot="{errors}" name="ip">
            <a-form-item label="" :errors="errors" v-if="errors.length"/>
          </ValidationProvider>
          <template #desc v-if="phoneCodeSentTtl">
            Отправить код через {{ phoneCodeSentTtl }} с.
          </template>
          <template #actions v-else>
            <a-button weight="bold" el-style="link">Изменить телефон</a-button>
          </template>
        </a-form-item>
      </ValidationProvider>
    </form>
  </ValidationObserver>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import AInput from '@/components/components/Input/AInput'
import AFormItem from '@/components/components/Form/AFormItem'
import AButton from '@/components/components/Button/AButton'
import ATelInput from '@/components/components/Input/ATelInput'
import ALink from '@/components/components/Link/ALink'

export default {
  name: 'ChangePhone',
  components: {
    ALink,
    ATelInput,
    AButton,
    AFormItem,
    AInput
  },
  data () {
    return {
      password: null,
      newPassword: {
        first: null,
        second: null
      },
      phone: null,
      code: null,
      newCode: null,
      changeEmail: false,
      phoneCodeSent: false,
      phoneCodeSentAt: false,
      phoneCodeSentTtl: 0,
      newPhoneCodeSent: false
    }
  },
  computed: {
    ...mapGetters('profile', ['profile', 'formattedPhone'])
  },
  methods: {
    ...mapActions('profile', { fetchProfile: 'profile' }),
    sendPhoneCode () {
      const data = new URLSearchParams()
      data.append('phone', this.profile.phone)

      this.$http.post(`${this.$config.host}/api/auth/get-code`, data)
        .then(r => {
          this.$message.success(r.data.message)
          this.phoneCodeSent = true
          this.phoneCodeSentAt = Date.now()
          this.phoneCodeSentTtl = 60
          this.setTimeoutReplayCode()
        })
        .catch(e => {
          this.$refs.phoneForm.setErrors(e.response.data)
        })
    },
    acceptChangePhone () {
      const data = new URLSearchParams()
      data.append('form[phone]', this.phone)
      data.append('form[code]', this.code)

      this.$http.post(`${this.$config.host}/api/auth/accept_change_phone`, data)
        .then(r => {
          this.$message.success(r.data.message)
          this.newPhoneCodeSent = true
        })
        .catch(e => {
          if (e.response.status === 422) {
            this.$refs.phoneForm.setErrors(e.response.data)
          }
          if ('message' in e.response.data) {
            this.$message.error(e.response.data.message)
          }
        })
    },
    changePhone () {
      const data = new URLSearchParams()
      data.append('form[phone]', this.phone)
      data.append('form[code]', this.code)
      data.append('form[newCode]', this.newCode)

      this.$http.post(`${this.$config.host}/api/auth/change_phone`, data)
        .then(r => {
          this.$message.success(r.data.message)
          this.phoneCodeSent = false
          this.newPhoneCodeSent = false
          this.fetchProfile()
        })
        .catch(e => {
          if (e.response.status === 422) {
            this.$refs.phoneForm.setErrors(e.response.data)
          }
          if ('message' in e.response.data) {
            this.$message.error(e.response.data.message)
          }
        })
    },
    setTimeoutReplayCode () {
      const interval = setInterval(() => {
        this.phoneCodeSentTtl--
        if (!this.phoneCodeSentTtl) {
          this.phoneCodeSentTtl = 0
          clearInterval(interval)
        }
      }, 1000)
    }
  }
}
</script>

<style scoped>

</style>
