<template>
  <ValidationObserver ref="phoneForm" v-slot="{errors, passes}" :key="1">

    <form id="phoneForm" @submit.prevent="passes(addPhone)" v-if="phoneCodeSent" :key="2">
      <ValidationProvider v-slot="{errors}" rules="required" name="code">
        <a-form-item label="Код подверждения" :errors="errors" label-col="4" label-align="left" input-col="4">
          <a-input v-model="code" placeholder="Введите код подтверждения"/>
          <template #desc>
            На номер телефона {{ phone }} было отправлено сообщение с кодом подтверждения.
          </template>
          <template #actions>
            <a-button  weight="bold" el-style="link">Привязать телефон</a-button>
            <a-link type="danger" weight="bold" @click="phoneCodeSent = false">Назад</a-link>
          </template>
        </a-form-item>
      </ValidationProvider>
    </form>

    <form id="phoneAuthForm" @submit.prevent="passes(sendPhoneCode)" v-else :key="3">
      <ValidationProvider v-slot="{errors}" rules="required" name="phone">
        <a-form-item label="Номер телефона" :errors="errors" label-col="4" label-align="left" input-col="4">
          <a-tel-input v-model="phone"/>
          <ValidationProvider v-slot="{errors}" name="ip">
            <a-form-item label="" :errors="errors" v-if="errors.length"/>
          </ValidationProvider>
          <template #desc v-if="phoneCodeSentTtl">
            Отправить код через {{ phoneCodeSentTtl }} с.
          </template>
          <template #actions v-else>
            <a-button weight="bold" el-style="link">Выслать код подтверждения</a-button>
          </template>
        </a-form-item>
      </ValidationProvider>
    </form>

  </ValidationObserver>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import AFormItem from '@/components/components/Form/AFormItem'
import ATelInput from '@/components/components/Input/ATelInput'
import AInput from '@/components/components/Input/AInput'
import ALink from '@/components/components/Link/ALink'
import AButton from '@/components/components/Button/AButton'

export default {
  name: 'AddPhone',
  components: {
    AButton,
    ALink,
    AFormItem,
    ATelInput,
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
      changeEmail: false,
      phoneCodeSent: false,
      phoneCodeSentAt: false,
      phoneCodeSentTtl: 0,
      bindProps: {
        mode: 'international',
        placeholder: 'Введите телефон',
        required: false,
        enabledCountryCode: false,
        onlyCountries: ['BY', 'RU']
      }
    }
  },
  computed: {
    ...mapGetters('profile', ['profile', 'formattedPhone'])
  },
  methods: {
    ...mapActions('profile', { fetchProfile: 'profile' }),
    sendPhoneCode () {
      const data = new URLSearchParams()
      data.append('form[phone]', this.phone)

      this.$http.post(`${this.$config.host}/api/auth/get_add_phone_auth_code`, data)
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
    addPhone () {
      const data = new URLSearchParams()
      data.append('form[phone]', this.phone)
      data.append('form[code]', this.code)

      this.$http.post(`${this.$config.host}/api/auth/add_phone`, data)
        .then(r => {
          this.$message.success(r.data.message)
          this.phoneCodeSent = false
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
