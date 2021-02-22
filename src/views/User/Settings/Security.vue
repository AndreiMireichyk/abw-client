<template>
  <div class="security">
    <div class="security__head">
      <div class="security__title">Безопасность</div>
    </div>
    <div class="security__body">

      <div class="security__divider">Изменить номер телефона</div>
      <change-phone v-if="profile.phone"/>
      <add-phone v-else/>

      <div class="security__divider">Изменить Email адрес</div>
      <change-email/>

      <div class="security__divider">Изменить пароль</div>
      <change-password/>

    </div>
  </div>
</template>

<script>
import ChangePassword from '@/components/User/Profile/Securety/ChangePassword'
import ChangePhone from '@/components/User/Profile/Securety/ChangePhone'
import ChangeEmail from '@/components/User/Profile/Securety/ChangeEmail'
import AddPhone from '@/components/User/Profile/Securety/AddPhone'
import { mapGetters } from 'vuex'

export default {
  name: 'Security',
  components: {
    ChangeEmail,
    AddPhone,
    ChangePassword,
    ChangePhone
  },
  computed: {
    ...mapGetters('profile', ['profile'])
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
    align-items: center;

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
