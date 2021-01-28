<template>
  <div>
    <div>
      <div class="page__filters filter">
        <div class="filter__item" v-for="filter in filters" :key="filter.id">
          <select v-model="filter.value">
            <option disabled value="null">{{ filter.label }}</option>
            <option v-for="option in filter.options" :value="option.code" :key="option.code">{{ option.title }}</option>
          </select>
        </div>
      </div>
      <router-link class="categories__item-link" :to="{name: 'ad-form', params:{slug: this.$route.params.slug}}">
        Показать
      </router-link>
      <pre>
        {{url}}
        {{ attributes }}
      </pre>
      <component :is="resolvedComponent" :filters="filters"></component>
    </div>
  </div>
</template>

<script>

import CarFilter from '@/components/Advert/List/Filter/CarFilter'
import TruckFilter from '@/components/Advert/List/Filter/TruckFilter'
import CarPartFilter from '@/components/Advert/List/Filter/CarPartFilter'
import TruckPartFilter from '@/components/Advert/List/Filter/TruckPartFilter'

export default {
  name: 'AdvFilter',
  components: {
    CarFilter,
    TruckFilter,
    CarPartFilter,
    TruckPartFilter
  },
  data () {
    return {
      url: null,
      filters: [],
      notUpdate: false
    }
  },
  watch: {
    attributes () {
      this.update()
    }
  },
  computed: {
    attributes () {
      const attributes = {}

      this.filters
        .filter(item => item.value)
        .map(item => {
          attributes[item.attribute] = item.value
        })

      return attributes
    },
    resolvedComponent () {
      switch (this.$route.params.slug) {
        case 'legkovye-avto':
          return 'CarFilter'
      }

      return 'CarFilter'
    }
  },
  methods: {

    update () {
      if (this.notUpdate) return false

      this.$http.post(`${this.$config.host}/api/adverts/${this.$route.params.slug}/filters`, {
        params: this.attributes
      })
        .then(r => {
          this.reloadOptions(r.data)
        })
        .catch(e => {
          alert(e)
        })
    },

    async reloadOptions (data) {
      this.notUpdate = true

      await data.map((item, key) => {
        if (item.options) {
          this.filters[key].value = item.value
          this.filters[key].options = item.options

          const i = item.options.filter(option => {
            if (item.value) {
              return option.code === item.value
            }
            return false
          })
          if (!i.length) this.filters[key].value = null
        }
      })

      this.notUpdate = false
    },

    fetchFilters () {
      this.$http.post(`${this.$config.host}/api/adverts/${this.$route.params.slug}/filters`, {
        params: this.attributes
      })
        .then(r => {
          this.filters = r.data
        })
        .catch(e => {
          alert('fetch filters err')
        })
    }
  },
  created () {
    this.fetchFilters()
  },
  beforeRouteUpdate (to, from, next) {
    this.filters = []
    next()
  }
}
</script>

<style scoped lang="scss">

.filter {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin-bottom: 20px;
  padding: 12px 8px;
  background: rgba(255, 255, 255, 0.7);

  &__item {
    box-sizing: border-box;
    width: 100%;
    padding: 8px;

    select {
      box-shadow: 0 0 0 1px #d3d9df inset, 0 1px 0 rgba(24, 26, 27, 0.08);
      border-radius: 4px;
      background: none;
      border: none;
      outline: none;
      padding: 6px;
      width: 100%;

    }
  }
}
</style>
