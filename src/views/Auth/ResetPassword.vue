<template>
  <div class="reset-password">
    <div class="reset-password__card card">
      <div class="card__header">
        <div class="card__title">Востановление пароля</div>
      </div>
      <div class="card__body">
        <ValidationObserver ref="form" v-slot="{passes}" :key="1" v-if="tokenSent && tokenAccepted">
          <form @submit.prevent="passes(resetPassword)">
            <div class="card__body">

              <ValidationProvider name="password" rules="required" v-slot="{errors}" class="control" tag="div">
                <input class="control__password" :type="passwordInputType" v-model="password"
                       placeholder="Введите пароль">
                <small v-if="errors.length" class="control__error">{{ errors[0] }}</small>
                <i class="icon-eye-off" v-if="showPassword" @click="showPassword  = false"/>
                <i class="icon-eye" v-else @click="showPassword  = true"/>
              </ValidationProvider>
              <ValidationProvider name="confirmPassword" rules="required" v-slot="{errors}" class="control" tag="div">
                <input class="control__password" :type="confirmPasswordInputType" v-model="confirmPassword"
                       placeholder="Подтвердите пароль">
                <small v-if="errors.length" class="control__error">{{ errors[0] }}</small>
                <i class="icon-eye-off" v-if="showConfirmPassword" @click="showConfirmPassword  = false"/>
                <i class="icon-eye" v-else @click="showConfirmPassword  = true"/>
                <ValidationProvider name="token" v-slot="{errors}" tag="div">
                  <small v-if="errors.length" class="control__error">{{ errors[0] }}</small>
                  <small class="control__desc">Установите новый пароль для дальнешего доступа к личнму кабинету.</small>
                </ValidationProvider>
              </ValidationProvider>

            </div>
            <div class="card__footer">
              <button class="btn btn-primary btn-block">Сохранить</button>
            </div>
          </form>
        </ValidationObserver>
        <ValidationObserver ref="form" v-slot="{passes}" :key="2" v-else-if="tokenSent">
          <form @submit.prevent="passes(resetPasswordTokenCheck)">
            <div class="card__body">
              <div class="control">
                <ValidationProvider name="token" rules="required" v-slot="{errors}">
                  <input class="control__input" type="text" v-model="token" placeholder="Введите код подтверждения">
                  <small v-if="errors.length" class="control__error">{{ errors[0] }}</small>
                  <small class="control__desc">На {{ email }} было выслано письмо с кодом подтверждения пароля.</small>
                </ValidationProvider>
              </div>
            </div>
            <div class="card__footer">
              <button class="btn btn-primary btn-block">Далее</button>
            </div>
          </form>
        </ValidationObserver>
        <ValidationObserver ref="form" v-slot="{passes}" :key="3" v-else>
          <form @submit.prevent="passes(resetPasswordRequest)">
            <div class="card__body">
              <div class="control">
                <ValidationProvider name="email" rules="required|email" v-slot="{errors}">
                  <input class="control__input" type="text" v-model="email" placeholder="Введите email">
                  <small v-if="errors.length" class="control__error">{{ errors[0] }}</small>
                  <small class="control__desc">На указанный email будет выслано письмо с инструкциями по сбросу
                    пароля.</small>
                </ValidationProvider>
              </div>
            </div>
            <div class="card__footer">
              <button class="btn btn-primary btn-block">Выслать сообщение</button>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResetPassword',
  data () {
    return {
      email: null,
      tokenSent: false,
      tokenAccepted: false,
      token: null,
      password: null,
      confirmPassword: null,
      showPassword: false,
      showConfirmPassword: false
    }
  },
  computed: {
    passwordInputType () {
      return this.showPassword ? 'text' : 'password'
    },
    confirmPasswordInputType () {
      return this.showConfirmPassword ? 'text' : 'password'
    }
  },
  methods: {
    resetPasswordRequest () {
      const data = new URLSearchParams()
      data.append('form[email]', this.email)
      this.$http.post(`${this.$config.host}/api/auth/reset_password_request`, data)
        .then(r => {
          this.$message.success(r.data.message)
          this.tokenSent = true
        })
        .catch(e => {
          this.$refs.form.setErrors(e.response.data)
        })
    },
    resetPasswordTokenCheck () {
      const data = new URLSearchParams()
      data.append('form[email]', this.email)
      data.append('form[token]', this.token)

      this.$http.post(`${this.$config.host}/api/auth/reset_password_token_check`, data)
        .then(r => {
          this.$message.success(r.data.message)
          this.tokenSent = true
          this.tokenAccepted = true
        })
        .catch(e => {
          this.$refs.form.setErrors(e.response.data)
        })
    },
    resetPassword () {
      const data = new URLSearchParams()
      data.append('form[email]', this.email)
      data.append('form[token]', this.token)
      data.append('form[password]', this.password)
      data.append('form[confirmPassword]', this.confirmPassword)

      this.$http.post(`${this.$config.host}/api/auth/reset_password`, data)
        .then(r => {
          this.$message.success(r.data.message)
          this.$router.push({ name: 'login' })
        })
        .catch(e => {
          this.$refs.form.setErrors(e.response.data)
        })
    },
    setHash (hash) {
      const segments = hash.split(':')

      if (segments.length === 2) {
        this.email = segments[0]
        this.token = segments[1]
        this.tokenSent = true
        this.resetPasswordTokenCheck()
      }
    }
  },
  created () {
    const hash = this.$route.params.hash
    if (hash) this.setHash(hash)
  }
}
</script>

<style scoped lang="scss">
.reset-password {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 50vh;
  box-sizing: border-box;
  padding-top: 10vh;
}

.reset-password .card {
  max-width: 255px;
  min-width: 255px;
  background: var(--white-bg);
  padding: 24px;

  &__title {
    font-weight: 600;
    font-size: 22px;
    margin-bottom: 16px;
    text-align: center;
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

  .control {
    position: relative;
    margin-bottom: 16px;

    &__input {
      text-align: center;
      border: 1px solid #d9deee;
      width: 100%;
      box-sizing: border-box;
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

    i {
      cursor: pointer;
      font-size: 15px;
      color: #9b9b9b;
      position: absolute;
      top: 8px;
      right: 8px;
    }

    &__error {
      line-height: 1.1;
      text-align: center;
      display: block;
      font-size: 12px;
      color: var(--red-color);
      margin-top: 10px;
    }

    &__desc {
      text-align: center;
      display: block;
      margin-top: 6px;
      line-height: 1.2;
      font-size: 12px;
      color: var(--font-muted-color);
    }
  }
}

</style>
