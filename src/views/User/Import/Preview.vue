<template>
  <page-content>
    <template #title>
      Импорт объявлений
      <span class="marker">«{{ category.title }}»</span>
    </template>
    <template #sort>
      <a-link class="back-btn" type="primary" :to="{name: 'user.import.category'}">
        <a-icon type="chevron-left"></a-icon>
        Назад
      </a-link>
    </template>
    <template #body>
      <import-preview/>
    </template>
  </page-content>
</template>

<script>
import { mapGetters } from 'vuex'
import PageContent from '@/components/User/Profile/PageContent'
import ImportPreview from '@/components/User/Profile/Import/ImportPreview'
import ALink from '@/components/components/Link/ALink'
import AIcon from '@/components/components/Icon/AIcon'

export default {
  name: 'Preview',
  components: {
    PageContent,
    ImportPreview,
    ALink,
    AIcon
  },
  computed: {
    ...mapGetters('advImport', ['category', 'type', 'data', 'column', 'url', 'startAt', 'file'])
  },
  created () {
    /*    if (this.category === null) this.$router.push({ name: 'user.import.history' })
    if (this.type === null) this.$router.push({ name: 'user.import.history' })
    if (!this.data.length) this.$router.push({ name: 'user.import.history' })
    if (!this.column.length) this.$router.push({ name: 'user.import.history' }) */
  }
}
</script>

<style scoped lang="scss">
.marker {
  color: var(--primary-color);
}

.back-btn {
  display: flex;
  align-items: center;
}
</style>
