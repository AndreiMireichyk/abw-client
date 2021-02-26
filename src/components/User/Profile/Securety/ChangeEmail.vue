<template>
  <a-form-item label="Текущий email" label-col="4" input-col="4">
    <a-input type="email" v-model="profile.email" :disabled="true" placeholder="Введите адрес электронной почты"/>
    <template #actions>
      <a-button weight="bold" el-style="link">Изменить email</a-button>
    </template>
  </a-form-item>

</template>

<script>

import { mapGetters } from 'vuex'
import AInput from '@/components/components/Input/AInput'
import AFormItem from '@/components/components/Form/AFormItem'
import AButton from '@/components/components/Button/AButton'
export default {
  name: 'ChangeEmail',
  components: {
    AButton,
    AInput,
    AFormItem
  },
  computed: {
    ...mapGetters('profile', ['profile'])
  }
}
</script>

<style scoped>

</style>
