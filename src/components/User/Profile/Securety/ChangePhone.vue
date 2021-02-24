<template>
  <ValidationObserver ref="phoneForm" v-slot="{errors, passes}" :key="1">
    <form id="phoneFormStep3" @submit.prevent="passes(changePhone)" v-if="newPhoneCodeSent" :key="2">
      <ValidationProvider v-slot="{errors}" rules="required" name="newCode" tag="div" class="control">
        <label class="control__label">Код подверждения</label>
        <div class="control__group">
          <input type="number" class="control__input" v-model="newCode" placeholder="Введите код подтверждения">
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
            <button class="link link-primary">Привязать номер</button>
            <a href="javascript:void(0)" class="link link-danger" @click="newPhoneCodeSent = false">Назад</a>
          </div>
        </div>
      </div>
    </form>
    <form id="phoneFormStep2" @submit.prevent="passes(acceptChangePhone)" v-else-if="phoneCodeSent" :key="3">
      <ValidationProvider v-slot="{errors}" rules="required" name="phone" tag="div" class="control">
        <label class="control__label">Новый телефон</label>
        <div class="control__group">
          <vue-tel-input class="control__input-phone" v-model="phone" v-bind="bindProps"/>
          <small class="control__error" v-if="errors.length">{{ errors[0] }}</small>
        </div>
      </ValidationProvider>
      <ValidationProvider v-slot="{errors}" rules="required" name="code" tag="div" class="control">
        <label class="control__label">Код подверждения</label>
        <div class="control__group">
          <a-input type="number" v-model="code" placeholder="Введите код подтверждения"/>
          <small class="control__error" v-if="errors.length">{{ errors[0] }}</small>
          <ValidationProvider v-slot="{errors}" name="ip">
            <small class="control__error" v-if="errors.length">{{ errors[0] }}</small>
          </ValidationProvider>
          <small class="control__desc">
            На номер телефона {{ formattedPhone }} было отправлено сообщение с кодом подтверждения.
          </small>
        </div>
      </ValidationProvider>
      <div class="control">
        <label class="control__label"></label>
        <div class="control__group">
          <div class="control__actions">
            <button class="link link-primary">Продолжить</button>
            <a href="javascript:void(0)" class="link link-danger" @click="phoneCodeSent = false">Назад</a>
          </div>
        </div>
      </div>
    </form>
    <form id="phoneFormStep1" @submit.prevent="passes(sendPhoneCode)" v-else :key="4">
      <ValidationProvider v-slot="{errors}" rules="required" name="phone" tag="div" class="control">
        <label class="control__label">Текущий телефон</label>
        <div class="control__group">
          <a-input v-model="formattedPhone" placeholder="Введите новый пароль" :disabled="true"/>
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
          <a href="javascript:void(0)" class="link link-primary" @click="sendPhoneCode" v-else>
            Изменить телефон
          </a>
        </div>
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { VueTelInput } from 'vue-tel-input'
import AInput from '@/components/components/Input/AInput'

export default {
  name: 'ChangePhone',
  components: { VueTelInput, AInput },
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
      newPhoneCodeSent: false,
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
