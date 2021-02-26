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

              <ValidationProvider name="password" rules="required" v-slot="{errors}">
                <a-form-item :errors="errors" input-align="center">
                  <a-input v-model="password" align="center" placeholder="Введите пароль" type="password">
                    <template #prefix>
                      <a-icon type="lock"/>
                    </template>
                  </a-input>
                </a-form-item>
              </ValidationProvider>

              <ValidationProvider name="confirmPassword" rules="required" v-slot="{errors}">
                <a-form-item :errors="errors" input-align="center">
                  <a-input v-model="confirmPassword" align="center" placeholder="Повторите пароль" type="password">
                    <template #prefix>
                      <a-icon type="lock"/>
                    </template>
                  </a-input>
                  <ValidationProvider name="token" v-slot="{errors}">
                    <a-form-item :errors="errors" input-align="center" v-if="errors.length"/>
                  </ValidationProvider>
                  <template #desc>
                    Установите новый пароль для дальнешего доступа к личнму кабинету.
                  </template>
                </a-form-item>
              </ValidationProvider>

              <a-form-item :errors="errors" input-align="center">
                <a-button block>Сохранить</a-button>
              </a-form-item>
            </div>
          </form>
        </ValidationObserver>

        <ValidationObserver ref="form" v-slot="{passes}" :key="2" v-else-if="tokenSent">
          <form @submit.prevent="passes(resetPasswordTokenCheck)">
            <div class="card__body">
              <div class="control">
                <ValidationProvider name="token" rules="required" v-slot="{errors}">
                  <a-form-item :errors="errors" input-align="center">
                    <a-input v-model="token" align="center" placeholder="Введите код подтверждения" type="password">
                      <template #prefix>
                        <a-icon type="lock"/>
                      </template>
                    </a-input>
                    <template #desc>
                      На {{ email }} было выслано письмо с кодом подтверждения пароля.
                    </template>
                  </a-form-item>
                </ValidationProvider>
              </div>
            </div>
            <a-form-item>
              <a-button block>Далее</a-button>
            </a-form-item>
          </form>
        </ValidationObserver>

        <ValidationObserver ref="form" v-slot="{passes}" :key="3" v-else>
          <form @submit.prevent="passes(resetPasswordRequest)">
            <div class="card__body">
              <ValidationProvider name="email" rules="required|email" v-slot="{errors}">
                <a-form-item :errors="errors" input-align="center">
                  <a-input v-model="email" align="center" placeholder="Введите email" type="text">
                    <template #prefix>
                      <a-icon type="mail"/>
                    </template>
                  </a-input>
                  <template #desc>
                    На указанный email будет выслано письмо с инструкциями по сбросу пароля.
                  </template>
                </a-form-item>
              </ValidationProvider>
            </div>
            <a-form-item>
              <a-button block>Выслать сообщение</a-button>
            </a-form-item>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
import AInput from '@/components/components/Input/AInput'
import AFormItem from '@/components/components/Form/AFormItem'
import AButton from '@/components/components/Button/AButton'
import AIcon from '@/components/components/Icon/AIcon'
export default {
  name: 'ResetPassword',
  components: {
    AInput,
    AFormItem,
    AButton,
    AIcon
  },
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
  padding: 24px 24px 8px 24px;

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
}

</style>
