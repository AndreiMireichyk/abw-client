<template>
  <ValidationObserver ref="phoneForm" v-slot="{errors, passes}" :key="1">
    <form id="phoneForm" @submit.prevent="passes(addPhone)" v-if="phoneCodeSent" :key="2">
      <ValidationProvider v-slot="{errors}" rules="required" name="code" tag="div" class="control">
        <label class="control__label">Код подверждения</label>
        <div class="control__group">
          <input type="number" class="control__input" v-model="code" placeholder="Введите код подтверждения">
          <small class="control__error" v-if="errors.length">{{ errors[0] }}</small>
          <small class="control__desc">
            На номер телефона {{ phone }} было отправлено сообщение с кодом подтверждения.
          </small>
        </div>
      </ValidationProvider>
      <div class="control">
        <label class="control__label"></label>
        <div class="control__group">
          <div class="control__actions">
            <button class="link link-primary">Привязать телефон</button>
            <a href="javascript:void(0)" class="link link-danger" @click="phoneCodeSent = false">Назад</a>
          </div>
        </div>
      </div>
    </form>
    <form id="phoneAuthForm" @submit.prevent="passes(sendPhoneCode)" v-else :key="3">
      <ValidationProvider v-slot="{errors}" rules="required" name="phone" tag="div" class="control">
        <label class="control__label">Номер телефона</label>
        <div class="control__group">
          <vue-tel-input class="control__input-phone" v-model="phone" v-bind="bindProps"/>
          <small class="control__error" v-if="errors.length">{{ errors[0] }}</small>
          <ValidationProvider v-slot="{errors}" name="ip">
            <small class="control__error" v-if="errors.length">{{ errors[0] }}</small>
          </ValidationProvider>
        </div>
      </ValidationProvider>
      <div class="control">
        <label class="control__label"></label>
        <div class="control__group">
          <small class="control__desc" v-if="phoneCodeSentTtl">
            Отправить код через {{ phoneCodeSentTtl }} с.
          </small>
          <button class="link link-primary" v-else>
            Выслать код подтверждения
          </button>
        </div>
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
import { VueTelInput } from 'vue-tel-input'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'AddPhone',
  components: { VueTelInput },
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
