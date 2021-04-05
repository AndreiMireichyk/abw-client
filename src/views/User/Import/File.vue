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
      <import-upload/>
    </template>
  </page-content>
</template>

<script>
import ImportUpload from '@/components/User/Profile/Import/ImportUpload'
import PageContent from '@/components/User/Profile/PageContent'
import ALink from '@/components/components/Link/ALink'
import AIcon from '@/components/components/Icon/AIcon'
import { mapGetters } from 'vuex'

export default {
  name: 'File',
  components: {
    ImportUpload,
    PageContent,
    ALink,
    AIcon
  },
  computed: {
    ...mapGetters('advImport', ['category'])
  },
  created () {
    if (this.category === null) this.$router.push({ name: 'user.import.history' })
  }
}
</script>

<style scoped>
.marker {
  color: var(--primary-color);
}

.back-btn {
  display: flex;
  align-items: center;
}
</style>
