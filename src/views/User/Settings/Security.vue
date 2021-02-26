<template>
  <page-content>
    <template #title>
      Безопасность
    </template>
    <template #body>
      <a-form-divider offset="4">Изменить номер телефона</a-form-divider>
      <change-phone v-if="profile.phone"/>
      <add-phone v-else/>

      <a-form-divider offset="4">Изменить Email адрес</a-form-divider>
      <change-email/>

      <a-form-divider offset="4">Изменить пароль</a-form-divider>
      <change-password/>

    </template>
  </page-content>
</template>

<script>
import PageContent from '@/components/User/Profile/PageContent'
import AFormDivider from '@/components/components/Form/AFormDivider'

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
    ChangePhone,
    PageContent,
    AFormDivider
  },
  computed: {
    ...mapGetters('profile', ['profile'])
  }
}
</script>
