<template>
  <div class="login">
    <div class="login__card card">
      <div class="card__header">
        <div class="card__title">Авторизация</div>
      </div>

      <ul class="card__nav">
        <li class="card__nav-item">
          <a-link type="default" :active="isCredentialPhone" @click.native="credentialPhone">телефон</a-link>
        </li>
        <li class="card__nav-item">
          <a-link type="default" :active="isCredentialLogin" @click.native="credentialLogin">логин</a-link>
        </li>
      </ul>

      <ValidationObserver ref="form" v-slot="{passes}" v-if="isCredentialPhone && !authCodeSent" :key="1">
        <form @submit.prevent="passes(sentAuthCode)">
          <div class="card__body" v-show="isCredentialPhone">
            <ValidationProvider name="phone" rules="required" v-slot="{errors}">
              <a-form-item :errors="errors" input-align="center">
                <a-tel-input v-model="phone" align="center"/>
                <ValidationProvider name="ip" v-slot="{errors}">
                  <a-form-item :errors="errors"  input-align="center" v-if="errors.length"></a-form-item>
                </ValidationProvider>
              </a-form-item>
            </ValidationProvider>
            <a-form-item>
              <a-button block :loading="loading">Далее</a-button>
            </a-form-item>
          </div>
        </form>
      </ValidationObserver>

      <ValidationObserver ref="form" v-slot="{passes}" v-if="isCredentialPhone && authCodeSent" :key="2">
        <form @submit.prevent="passes(auth)">
          <div class="card__body" v-show="isCredentialPhone">
            <div class="card__description">
              Код отправлен на номер <br> <span>{{ phone }}</span>
            </div>
            <ValidationProvider name="code" rules="required" v-slot="{errors}">
              <a-form-item :errors="errors" input-align="center">
                <a-input type="password" v-model="code" align="center" placeholder="Код подтверждения">
                  <template #prefix>
                    <a-icon type="lock"/>
                  </template>
                </a-input>
                <ValidationProvider name="phone" v-slot="{errors}">
                  <a-form-item :errors="errors" v-if="errors.length"/>
                </ValidationProvider>
                <ValidationProvider name="ip" v-slot="{errors}">
                  <a-form-item :errors="errors" v-if="errors.length"/>
                </ValidationProvider>
                <template #desc v-if="authCodeReplayTtl">
                  Выслать код повторно {{ authCodeReplayTtl }}c.
                </template>
                <template #actions v-else>
                  <div class="text-center">
                    <a-link type="primary" @click.native="sentAuthCode">Выслать код повторно</a-link>
                  </div>
                </template>
              </a-form-item>
            </ValidationProvider>
            <a-form-item>
              <a-button type="primary" block :loading="loading">Вход</a-button>
            </a-form-item>
          </div>
        </form>
      </ValidationObserver>

      <ValidationObserver ref="form" v-slot="{passes}" v-if="isCredentialLogin" :key="3">
        <form @submit.prevent="passes(auth)">
          <div class="card__body">
            <ValidationProvider name="login" rules="required" v-slot="{errors}">
              <a-form-item :errors="errors" input-align="center">
                <a-input v-model="login" type="text" align="center" placeholder="Введите логин">
                  <template #prefix>
                    <a-icon type="user"/>
                  </template>
                  <template #postfix>
                    <span></span>
                  </template>
                </a-input>
              </a-form-item>
            </ValidationProvider>
            <ValidationProvider name="password" rules="required" v-slot="{errors}">
              <a-form-item :errors="errors" input-align="center">
                <a-input type="password" v-model="password" align="center" placeholder="Введите пароль">
                  <template #prefix>
                    <a-icon type="lock"/>
                  </template>
                </a-input>
              </a-form-item>
            </ValidationProvider>
            <a-form-item>
              <div class="text-center">
                <a-link type="primary" :to="{name: 'reset-password'}">Востановление пароля</a-link>
              </div>
            </a-form-item>
            <a-form-item>
              <a-button type="primary" block :loading="loading">Войти</a-button>
            </a-form-item>
          </div>
        </form>
      </ValidationObserver>

    </div>
  </div>
</template>

<script>

import { mapActions } from 'vuex'
import AFormItem from '@/components/components/Form/AFormItem'
import ATelInput from '@/components/components/Input/ATelInput'
import AInput from '@/components/components/Input/AInput'
import AButton from '@/components/components/Button/AButton'
import ALink from '@/components/components/Link/ALink'
import AIcon from '@/components/components/Icon/AIcon'

export default {
  name: 'Login',
  components: {
    AFormItem,
    ATelInput,
    AInput,
    AButton,
    ALink,
    AIcon
  },
  data () {
    return {
      phone: null,
      login: null,
      code: null,
      password: null,
      credentialType: 'phone',
      authCodeSent: false,
      authCodeSentAt: null,
      authCodeReplayTtl: 0, // one min
      loading: false
    }
  },
  computed: {
    isCredentialLogin () {
      return this.credentialType === 'login'
    },
    isCredentialPhone () {
      return this.credentialType === 'phone'
    }
  },
  methods: {
    ...mapActions('auth', ['logIn']),
    validatePhone (status) {
    },
    credentialLogin () {
      this.credentialType = 'login'
    },
    credentialPhone () {
      this.credentialType = 'phone'
    },
    sentAuthCode () {
      const data = new URLSearchParams()
      data.append('phone', this.phone)

      this.loading = true

      this.$http.post(`${this.$config.host}/api/auth/get-code`, data)
        .then(r => {
          this.authCodeSent = true
          this.$message.success(r.data.message)
          this.authCodeSentAt = Date.now()
          this.authCodeReplayTtl = 60
          this.setTimeoutReplayCode()
          this.loading = false
        })
        .catch(e => {
          this.$refs.form.setErrors(e.response.data)
          this.loading = false
        })
    },
    auth () {
      const data = new URLSearchParams()

      if (this.isCredentialLogin) {
        data.append('login', this.login)
        data.append('password', this.password)
      } else {
        data.append('phone', this.phone)
        data.append('code', this.code)
      }

      this.loading = true

      this.logIn(data)
        .then(() => {
          this.$message.success('Вход выполнен успешно')
          this.loading = false
        })
        .catch(e => {
          this.$refs.form.setErrors(e.response.data)
          this.loading = false
        })
    },
    setTimeoutReplayCode () {
      const interval = setInterval(() => {
        this.authCodeReplayTtl--
        if (!this.authCodeReplayTtl) clearInterval(interval)
      }, 1000)
    }
  }
}
</script>

<style lang="scss">
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 50vh;
  box-sizing: border-box;
  padding-top: 10vh;
}

.login .card {
  max-width: 255px;
  min-width: 255px;
  background: var(--white-bg);
  padding: 24px 24px 8px 24px;

  &__title {
    font-weight: 600;
    font-size: 32px;
    margin-bottom: 16px;
    text-align: center;
  }

  &__nav {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
  }

  &__description {
    text-align: center;
    color: var(--gray-color);
    margin-bottom: 8px;
    font-size: 13px;

    span {
      margin-top: 3px;
      display: block;
      font-size: 13px;
      font-weight: 500;
      color: var(--primary-color);
    }
  }

  &__nav-item {
    display: flex;
    font-size: 13px;

    &:after {
      content: "";
      display: block;
      min-height: 100%;
      margin: 0 8px;
      border-right: 1px solid rgba(0, 0, 0, 0.18);
    }

    &:last-child:after {
      display: none;
    }
  }
}

</style>
