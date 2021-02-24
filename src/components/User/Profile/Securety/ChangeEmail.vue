<template>
<div>
  <div class="control">
    <label class="control__label">Текущий email</label>
    <div class="control__group">
      <a-input type="email" v-model="profile.email" :disabled="true" placeholder="Введите адрес электронной почты"/>
    </div>
  </div>
  <div class="control">
    <label class="control__label"></label>
    <div class="control__group">
      <a href="javascript:void(0)" class="link link-primary">Изменить email</a>
    </div>
  </div>
</div>
</template>

<script>

import { mapGetters } from 'vuex'
import AInput from '@/components/components/Input/AInput'
export default {
  name: 'ChangeEmail',
  components: {
    AInput
  },
  computed: {
    ...mapGetters('profile', ['profile'])
  }
}
</script>

<style scoped>

</style>
