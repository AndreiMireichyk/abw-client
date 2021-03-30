<template>
  <page-content>
    <template #title>
      Импорт объявлений
    </template>
    <template #body>
      <adv-import/>
    </template>
  </page-content>
</template>

<script>
import PageContent from '@/components/User/Profile/PageContent'
import AdvImport from '@/components/User/Profile/Import/Import'

export default {
  name: 'Import',
  components: { PageContent, AdvImport }
}
</script>

<style scoped>

</style>
