<template>
  <page-content>
    <template #title>
      Мои объявления - {{ pagination.total }}
    </template>
    <template #sort>
      <div class="sort">
        <a-select v-model="status" :data="statuses" size="xsmall"/>
      </div>
    </template>
    <template #fullBody>
      <div class="wrap">
        <item-base :item="item" :slug="slug" v-for="(item, index) in items" :key="index"/>
      </div>
    </template>
    <template #pagination>
      <div class="pagination" v-if="items.length">
        <pagination :pagination="pagination" @nextPage="nextPage"/>
      </div>
    </template>
  </page-content>
</template>

<script>

import PageContent from '@/components/User/Profile/PageContent'
import ItemBase from '@/components/Classified/Listing/ItemBase'
import Pagination from '@/components/Classified/Listing/Pagination'
import ASelect from '@/components/components/Select/ASelect'

export default {
  props: ['slug'],
  name: 'Advert',
  components: {
    PageContent,
    ItemBase,
    Pagination,
    ASelect
  },
  data () {
    return {
      status: 1,
      statuses: [],
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
    },
    status () {
      this.items = []
      this.fetch()
    }
  },
  methods: {
    nextPage () {
      this.fetch(this.pagination.page + 1)
    },
    fetch (page) {
      page = page || 1
      const data = new URLSearchParams()
      data.append('status', this.status)

      this.$http.post(`${this.$config.host}/api/user/adverts/${this.slug}?page=${page}`, data)
        .then(r => {
          r.data.items.map(item => this.items.push(item))
          this.statuses = r.data.statuses
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
  background: #eff2f3;
}
.sort {
  margin-right: -12px;
}

</style>
