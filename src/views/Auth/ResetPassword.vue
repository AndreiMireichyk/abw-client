<template>
  <div class="reset-password">
    <div class="reset-password__card card">
      <div class="card__header">
        <div class="card__title">Востановление пароля</div>
      </div>
      <div class="card__body">
        <ValidationObserver ref="form" v-slot="{passes}" :key="1">
          <form @submit.prevent="passes(sendResetToken)">
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
      email: null
    }
  },
  methods: {
    sendResetToken () {

    }
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
