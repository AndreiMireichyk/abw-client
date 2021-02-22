<template>
<div>
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
</div>
</template>

<script>

import { mapGetters } from 'vuex'
export default {
  name: 'ChangeEmail',
  computed: {
    ...mapGetters('profile', ['profile'])
  }
}
</script>

<style scoped>

</style>
