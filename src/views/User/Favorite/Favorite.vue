<template>
  <page-content>
    <template #title>
      Избранное - {{ pagination.total }}
    </template>
    <template #fullBody>
      <div class="wrap">
        <item-base :item="item" :slug="slug" v-for="(item, index) in items" :key="index"/>
      </div>
    </template>
    <template #pagination>
      <div class="pagination">
        <pagination :pagination="pagination" @nextPage="nextPage"/>
      </div>
    </template>
  </page-content>
</template>

<script>

import PageContent from '@/components/User/Profile/PageContent'
import ItemBase from '@/components/Classified/Listing/ItemBase'
import Pagination from '@/components/Classified/Listing/Pagination'
import { mapGetters } from 'vuex'

export default {
  props: ['slug'],
  name: 'Favorite',
  components: {
    PageContent,
    ItemBase,
    Pagination
  },
  data () {
    return {
      items: [],
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
    favoriteIds () {
      this.items = []
      this.fetch()
    }
  },
  computed: {
    ...mapGetters('profile', ['favoriteIds'])
  },
  methods: {
    nextPage () {
      this.fetch(this.pagination.page + 1)
    },
    fetch (page) {
      page = page || 1

      this.$http.get(`${this.$config.host}/api/user/favorites/${this.slug}?page=${page}`)
        .then(r => {
          r.data.items.map(item => this.items.push(item))
          this.pagination = r.data.pagination
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
