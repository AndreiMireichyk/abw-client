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
      <import-schedule/>
    </template>
  </page-content>
</template>

<script>
import { mapGetters } from 'vuex'
import PageContent from '@/components/User/Profile/PageContent'
import ImportSchedule from '@/components/User/Profile/Import/ImportSchedule'
import ALink from '@/components/components/Link/ALink'
import AIcon from '@/components/components/Icon/AIcon'

export default {
  name: 'Schedule',
  components: {
    ALink,
    AIcon,
    PageContent,
    ImportSchedule
  },
  computed: {
    ...mapGetters('advImport', ['category'])
  },
  created () {
    if (this.category === null) this.$router.push({ name: 'user.import.history' })
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
