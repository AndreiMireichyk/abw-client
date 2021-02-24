<template>
  <page-content>
    <template v-slot:title>
      История пополнений и платежей
    </template>
    <template v-slot:body>
      Table
    </template>
  </page-content>
</template>

<script>
import PageContent from '@/components/User/Profile/PageContent'

export default {
  name: 'History',
  components: {
    PageContent
  }
}
</script>

<style scoped>

</style>
