<template>
  <page-content>
    <template #title>
      Выберите категорию импорта
    </template>
    <template #sort>
     <a-link class="back-btn" type="primary" :to="{name: 'user.import.history'}">
       <a-icon type="chevron-left"/>
       Назад
     </a-link>
    </template>
    <template #body>
      <import-category/>
    </template>
  </page-content>
</template>

<script>
import PageContent from '@/components/User/Profile/PageContent'
import ImportCategory from '@/components/User/Profile/Import/ImportCategory'
import ALink from '@/components/components/Link/ALink'
import AIcon from '@/components/components/Icon/AIcon'
export default {
  name: 'Category',
  components: {
    PageContent,
    ImportCategory,
    ALink,
    AIcon
  }
}
</script>

<style scoped lang="scss">
.back-btn{
  display: flex;
  align-items: center;
}
</style>
