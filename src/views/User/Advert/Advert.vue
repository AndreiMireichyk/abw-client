<template>
  <page-content>
    <template #title>
      Мои объявления
    </template>
    <template #body>
      <div class="wrap">
        <item-base :item="item" :slug="slug" v-for="(item, index) in items" :key="index"/>
      </div>
      <div class="pagination">
        <pagination :pagination="pagination"/>
      </div>
    </template>
  </page-content>
</template>

<script>

import PageContent from '@/components/User/Profile/PageContent'
import ItemBase from '@/components/Classified/Listing/ItemBase'
import Pagination from '@/components/Classified/Listing/Pagination'

export default {
  props: ['slug'],
  name: 'Advert',
  components: {
    PageContent,
    ItemBase,
    Pagination
  },
  data () {
    return {
      items: [],
      sort: {
        value: null,
        items: []
      },
      pagination: {
        page: 1,
        per_page: 25,
        total: 0
      }
    }
  },
  watch: {
    slug () {
      this.items = []
      this.fetch()
    }
  },
  methods: {
    fetch (page) {
      page = page || 1
      const sort = this.sort.value ? `&sort=${this.sort.value}` : ''
      this.$http.get(`${this.$config.host}/api/user/adverts/${this.slug}?page=${page}${sort}`)
        .then(r => {
          r.data.items.map(item => this.items.push(item))
          this.pagination = r.data.pagination
          this.sort = r.data.sort
        })
        .catch(e => {
          alert('fetch err')
        })
    }
  },
  created () {
    this.fetch()
  }
}
</script>

<style scoped lang="scss">
.wrap {
  margin: -24px;
  background: #eff2f3;
}
.pagination{

}
</style>
