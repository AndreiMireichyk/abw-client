<template>
  <div class="security">
    <div class="security__head">
      <div class="security__title">Безопасность</div>
    </div>
    <div class="security__body">

      <div class="security__divider">Изменить номер телефона</div>

      <ValidationObserver ref="phoneForm" v-slot="{errors, passes}" :key="1">
        <form id="phoneForm" @submit.prevent="passes(changePhone)">
          <div v-if="phoneCodeSent">
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
                <input type="number" class="control__input" v-model="code" placeholder="Введите код подтверждения">
                <small class="control__error" v-if="errors.length">{{ errors[0] }}</small>
                <small class="control__desc">
                  На номер телефона {{ formatPhone }} было отправлено сообщение с кодом подтверждения.
                </small>
              </div>
            </ValidationProvider>
            <div class="control">
              <label class="control__label"></label>
              <div class="control__group">
                <div class="control__actions">
                  <button class="link link-primary">Изменить телефон</button>
                  <a href="javascript:void(0)" class="link link-danger" @click="phoneCodeSent = false">Назад</a>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <ValidationProvider v-slot="{errors}" rules="required" name="phone" tag="div" class="control">
              <label class="control__label">Текущий телефон</label>
              <div class="control__group">
                <input type="text" class="control__input" disabled="disabled" v-model="formatPhone">
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
          </div>
        </form>
      </ValidationObserver>

      <div class="security__divider">Изменить Email адрес</div>
      <div class="control">
        <label class="control__label">Текущий email</label>
        <div class="control__group">
          <input type="email" class="control__input" disabled="disabled" v-model="profile.email">
        </div>
      </div>
      <div class="control">
        <label class="control__label"></label>
        <div class="control__group">
          <a href="javascript:void(0)" class="link link-primary">Изменить email</a>
        </div>
      </div>

      <div class="security__divider">Изменить пароль</div>
      <ValidationObserver ref="passwordForm" v-slot="{errors, passes}" :key="3">
        <form id="passwordForm" @submit.prevent="passes(changePassword)">
          <ValidationProvider v-slot="{errors}" rules="required" name="password" tag="div" class="control">
            <label class="control__label">Текущий пароль</label>
            <div class="control__group">
              <input type="password" class="control__input"  v-model="password" placeholder="Введите действующий пароль">
              <small class="control__error" v-if="errors.length">{{ errors[0] }}</small>
            </div>
          </ValidationProvider>
          <ValidationProvider v-slot="{errors}" rules="required" name="newPassword.first" tag="div" class="control">
            <label class="control__label">Новый пароль</label>
            <div class="control__group">
              <input type="password" class="control__input" v-model="newPassword.first" placeholder="Введите новый пароль">
              <small class="control__error" v-if="errors.length">{{ errors[0] }}</small>
            </div>
          </ValidationProvider>
          <ValidationProvider v-slot="{errors}" rules="required" name="newPassword.second" tag="div" class="control">
            <label class="control__label">Подтвердите пароль</label>
            <div class="control__group">
              <input type="password" class="control__input" v-model="newPassword.second" placeholder="Подвердите новый пароль">
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
  </div>
</template>

<script>
import { VueTelInput } from 'vue-tel-input'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Security',
  components: {
    VueTelInput
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
    ...mapGetters('profile', ['profile']),
    formatPhone () {
      const match = this.profile.phone.match(/^(\+\d{3})(\d{2})(\d{3})(\d{2})(\d{2})$/)

      return match ? `${match[1]} (${match[2]}) ${match[3]}-${match[4]}-${match[5]}` : null
    }
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
    changePhone () {
      const data = new URLSearchParams()
      data.append('form[phone]', this.phone)
      data.append('form[code]', this.code)

      this.$http.post(`${this.$config.host}/api/user/change_phone`, data)
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
    changePassword () {
      const data = new URLSearchParams()
      data.append('form[password]', this.password)
      data.append('form[newPassword][first]', this.newPassword.first)
      data.append('form[newPassword][second]', this.newPassword.second)

      this.$http.post(`${this.$config.host}/api/user/change_password`, data)
        .then(r => {
          this.$message.success(r.data.message)
          this.password = null
          this.$refs.passwordForm.reset()
        })
        .catch(e => {
          this.$refs.passwordForm.setErrors(e.response.data)
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

<style lang="scss">
.security {
  &__head {
    display: flex;
    align-items: center;
    padding: 0 24px 24px 24px;
    margin: 0 -24px;
    border-bottom: 1px solid #EBEDF3;
    margin-bottom: 24px;
  }

  &__footer {
    background: #fafbfb;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: 0 -24px -24px -24px;
    border-top: 1px solid #EBEDF3;
    padding: 16px 24px;

    & > * {
      margin-left: 12px;
    }
  }

  &__title {
    flex-grow: 1;
    font-size: 18px;
    font-weight: bold;
  }

  &__divider {
    padding-left: 30%;
    margin-top: 36px;
    margin-bottom: 16px;
    font-weight: 500;
    font-size: 16px;
  }
}

.security .control {
  display: flex;
  align-items: stretch;
  margin-bottom: 16px;

  &__label {
    position: relative;
    top: 9px;
    box-sizing: border-box;
    width: 30%;
    text-align: right;
    padding-right: 24px;
    height: 100%;
  }

  &__group {
    width: 40%;
  }

  &__actions {
    display: flex;

    & > * {
      padding-right: 12px;
    }
  }

  &__input {
    box-sizing: border-box;
    display: block;
    width: 100%;
    background-color: var(--white-color);
    outline: none;
    appearance: none;
    border: 1px solid #d9deee;
    padding: 8px 12px;
    border-radius: 6px;
    color: var(--gray-color);
    transition: color 0.15s ease, background-color 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease, -webkit-box-shadow 0.15s ease;

    &:disabled {
      background: #f1f1f1;
      cursor: not-allowed;
    }

    &::placeholder {
      color: var(--font-muted-color);
    }

    &:focus {
      border: 1px solid var(--primary-color);
      background-color: #f6f6f6;
    }
  }

  &__input-phone {
    flex-grow: 1;
    max-width: none;
    background: var(--white-color);
    border: 1px solid #d9deee;
    box-shadow: none !important;
    border-radius: 6px;
    padding: 8px 12px;

    input::placeholder {
      color: var(--font-muted-color);
    }

    &:focus-within {
      border: 1px solid var(--primary-color);
      box-shadow: none;
    }

    input {
      color: var(--gray-color);
    }

    .vti__dropdown {
      outline: none;
      height: 14px;
      padding: 0;
    }

  }

  &__desc {
    display: block;
    margin-top: 6px;
    line-height: 1.2;
    font-size: 12px;
    color: var(--font-muted-color);
  }

  &__error {
    margin-top: 6px;
    display: block;
    line-height: 1.2;
    font-size: 12px;
    color: var(--red-color);
  }
}
</style>
