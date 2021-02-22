<template>
  <div class="login">
    <div class="login__card card">
      <div class="card__header">
        <div class="card__title">Авторизация</div>
      </div>

      <ul class="card__nav">
        <li class="card__nav-item">
          <a class="card__nav-link" :class="{active: isCredentialPhone}" href="javascript:void(0)"
             @click="credentialPhone">телефон</a>
        </li>
        <li class="card__nav-item">
          <a class="card__nav-link" :class="{active: isCredentialLogin}" href="javascript:void(0)"
             @click="credentialLogin">логин</a>
        </li>
      </ul>

      <ValidationObserver ref="form" v-slot="{passes}" v-if="isCredentialPhone && !authCodeSent" :key="1">
        <form @submit.prevent="passes(sentAuthCode)">
          <div class="card__body" v-show="isCredentialPhone">
            <div class="control">
              <ValidationProvider name="phone" rules="required" v-slot="{errors}">
                <vue-tel-input v-model="phone" v-bind="phoneProps" @validate="validatePhone" class="control__phone"
                               data-vv-as="телефон"/>
                <small v-if="errors.length" class="control__error">{{ errors[0] }}</small>
              </ValidationProvider>
            </div>
            <div class="control">
              <ValidationProvider name="ip" v-slot="{errors}">
                <small v-if="errors.length" class="control__error">{{ errors[0] }}</small>
              </ValidationProvider>
            </div>
          </div>
          <div class="card__footer" v-show="isCredentialPhone">
            <button class="control__btn">Далее</button>
          </div>
        </form>
      </ValidationObserver>

      <ValidationObserver ref="form" v-slot="{passes}" v-if="isCredentialPhone && authCodeSent" :key="2">
        <form @submit.prevent="passes(auth)">
          <div class="card__body" v-show="isCredentialPhone">
            <div class="card__description">
              Код отправлен на номер <br> <span>{{ phone }}</span>
            </div>
            <div class="control">
              <ValidationProvider name="code" rules="required" v-slot="{errors}">
                <input class="control__password" :type="passwordInputType" v-model="code"
                       placeholder="Код подтверждения" data-vv-as="код подтверждения">
                <small v-if="errors.length" class="control__error">{{ errors[0] }}</small>
              </ValidationProvider>
              <ValidationProvider name="phone" v-slot="{errors}">
                <small v-if="errors.length" class="control__error">{{ errors[0] }}</small>
              </ValidationProvider>
              <ValidationProvider name="ip" v-slot="{errors}">
                <small v-if="errors.length" class="control__error">{{ errors[0] }}</small>
              </ValidationProvider>
              <i class="icon-eye-off" v-if="showPassword" @click="showPassword  = false"/>
              <i class="icon-eye" v-else @click="showPassword  = true"/>
            </div>
            <div class="control">
              <a class="control__link wait" href="javascript:void(0)" v-if="authCodeReplayTtl">
                Выслать код повторно {{ authCodeReplayTtl }}c.
              </a>
              <a class="control__link" href="javascript:void(0)" @click.prevent="sentAuthCode" v-else>
                Выслать код повторно
              </a>
            </div>
          </div>
          <div class="card__footer">
            <button class="control__btn">Вход</button>
          </div>
        </form>
      </ValidationObserver>

      <ValidationObserver ref="form" v-slot="{passes}" v-if="isCredentialLogin" :key="3">
        <form @submit.prevent="passes(auth)">
          <div class="card__body">
            <div class="control">
              <ValidationProvider name="login" data-as="asd" rules="required" v-slot="{errors}">
                <input class="control__login" type="text" v-model="login" placeholder="Логин">
                <small v-if="errors.length" class="control__error">{{ errors[0] }}</small>
              </ValidationProvider>
            </div>
            <div class="control">
              <ValidationProvider name="password" rules="required" v-slot="{errors}">
                <input class="control__password" :type="passwordInputType" v-model="password" placeholder="Пароль">
                <small v-if="errors.length" class="control__error">{{ errors[0] }}</small>
              </ValidationProvider>
              <i class="icon-eye-off" v-if="showPassword" @click="showPassword  = false"/>
              <i class="icon-eye" v-else @click="showPassword  = true"/>
            </div>
            <div class="control">
              <router-link class="control__link" :to="{name: 'reset-password'}">Востановление пароля</router-link>
            </div>
          </div>
          <div class="card__footer">
            <button class="control__btn">Войти</button>
          </div>
        </form>
      </ValidationObserver>

    </div>
  </div>
</template>

<script>

import { VueTelInput } from 'vue-tel-input'
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  components: { VueTelInput },
  data () {
    return {
      phone: null,
      login: null,
      code: null,
      password: null,
      showPassword: false,
      credentialType: 'phone',
      authCodeSent: false,
      authCodeSentAt: null,
      authCodeReplayTtl: 0, // one min
      loading: false,
      phoneProps: {
        mode: 'international',
        placeholder: 'Введите телефона',
        required: false,
        enabledCountryCode: false,
        onlyCountries: ['BY', 'RU']
      }
    }
  },
  computed: {
    isCredentialLogin () {
      return this.credentialType === 'login'
    },
    isCredentialPhone () {
      return this.credentialType === 'phone'
    },
    passwordInputType () {
      return this.showPassword ? 'text' : 'password'
    }
  },
  methods: {
    ...mapActions('auth', ['logIn']),
    validatePhone (status) {
      console.log(status)
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

      this.$http.post(`${this.$config.host}/api/auth/get-code`, data)
        .then(r => {
          this.authCodeSent = true
          this.$message.success(r.data.message)
          this.authCodeSentAt = Date.now()
          this.authCodeReplayTtl = 60
          this.setTimeoutReplayCode()
        })
        .catch(e => {
          this.$refs.form.setErrors(e.response.data)
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

      this.logIn(data)
        .then(() => {
          this.$message.success('Вход выполнен успешно')
        })
        .catch(e => {
          this.$refs.form.setErrors(e.response.data)
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
  padding: 24px;

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
    font-size: 14px;

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

  &__nav-link {
    text-decoration: none;
    color: var(--gray-color);

    &:hover, &.active {
      color: var(--primary-color);
    }
  }

  .control {
    position: relative;
    margin-bottom: 16px;

    &__phone {
      position: relative;
      border: none !important;

      &:focus-within {
        box-shadow: none !important;
      }

      input {
        text-align: center;
        border: 1px solid #d9deee !important;
        border-radius: var(--input-radius);
        padding: 8px 12px 8px 60px;
        color: var(--gray-color);

        transition: all .3s;

        &::placeholder {
          color: var(--font-muted-color);
        }

        &:focus-within {
          border-color: var(--primary-color) !important;
          box-shadow: none;
        }

      }

      .vti__dropdown {
        position: absolute;
        top: 0;
        left: 0;
        padding: 0;
        margin: 8px 0 8px 12px;
        background: none !important;
        border-right: 1px solid rgba(0, 0, 0, 0.18);

        &:focus {
          outline: none;
        }
      }

      .vti__selection {
        height: 15px;
        padding-right: 6px;
      }

      .vti__flag {
        margin-left: 0;
      }
    }

    &__password {
      text-align: center;
      width: 100%;
      box-sizing: border-box;
      border: 1px solid #d9deee;
      padding: 8px 12px;
      border-radius: var(--input-radius);
      outline: none;
      color: var(--gray-color);
      transition: all .3s;

      &::placeholder {
        color: var(--font-muted-color);
      }

      &:focus-within {
        border: 1px solid var(--primary-color);
      }
    }

    &__login {
      text-align: center;
      width: 100%;
      box-sizing: border-box;
      border: 1px solid #d9deee;
      padding: 8px 12px;
      border-radius: var(--input-radius);
      outline: none;
      color: var(--gray-color);
      transition: all .3s;

      &::placeholder {
        color: var(--font-muted-color);
      }

      &:focus-within {
        border: 1px solid var(--primary-color);
      }
    }

    &__error {
      line-height: 1.1;
      text-align: center;
      display: block;
      font-size: 12px;
      color: var(--red-color);
      margin-top: 10px;
    }

    i {
      cursor: pointer;
      font-size: 15px;
      color: #9b9b9b;
      position: absolute;
      top: 8px;
      right: 8px;
    }

    &__btn {
      text-align: center;
      display: block;
      width: 100%;
      font-size: 15px;
      cursor: pointer;
      box-shadow: 0 0 0 1px var(--primary-color) inset, 0 1px 0 rgba(24, 26, 27, 0.08);
      padding: 8px 10px;
      border-radius: 4px;
      transition: all .3s;
      background: var(--primary-color);
      color: var(--white-color);
      text-decoration: none;
      border: none;
      outline: none;
      appearance: none;

      &:hover {
        background: transparent;
        box-shadow: 0 0 0 2px #d3d9df inset, 0 2px 0 rgba(24, 26, 27, 0.08);
        color: var(--font-color);
      }
    }

    &__link {
      display: block;
      text-align: center;
      text-decoration: none;
      color: var(--primary-color);

      &.wait {
        color: var(--gray-color);
      }
    }
  }
}

</style>
