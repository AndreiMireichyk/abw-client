<template>
  <page-content>
    <template #title>
      Импорт объявлений
    </template>
    <template #sort>
      <a-link class="import__add" type="primary" :to="{name: 'user.import.category'}">
        <a-icon type="plus"/>
        Добавить
      </a-link>
    </template>
    <template #body>
      <adv-import/>
    </template>
  </page-content>
</template>

<script>
import PageContent from '@/components/User/Profile/PageContent'
import AdvImport from '@/components/User/Profile/Import/Import'
import ALink from '@/components/components/Link/ALink'
import AIcon from '@/components/components/Icon/AIcon'

export default {
  name: 'History',
  components: {
    PageContent,
    AdvImport,
    ALink,
    AIcon
  }
}
</script>

<style scoped>

</style>
