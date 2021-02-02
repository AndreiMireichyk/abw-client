<template>
  <div class="filter" v-if="filters.length">
    <div>    {{paramsPath}}</div>
    <component :is="resolvedComponent" :filters="filters"></component>
    <div class="filter__footer">
      <div class="filter__actions">
        <a class="filter__btn-all" href="">Все параметры</a>
        <a class="filter__btn-clear" href="javascript:void(0)" @click="clearFilters">Сбросить</a>
      </div>
      <a href="" class="filter__btn-results">Показать 6 предложений</a>
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

    paramsPath () {
      let string = ''

      this.filters
        .filter(item => item.value)
        .map(item => {
          string += `/${item.attribute}_${item.value}`
        })

      return string
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
    getFilterByCode (code) {
      this.filters.filter(item => item.attribute === code)
    },
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
    },

    clearFilters () {
      this.$http.post(`${this.$config.host}/api/adverts/${this.$route.params.slug}/filters`, {
        params: {}
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

<style  lang="scss">

.filter {

  &__body{
    display: flex;
    flex-wrap: wrap;
    margin: 0 -8px;
  }

  &__footer{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__btn-all{
    color: var(--primary-color);
    text-decoration: none;
    margin-right: 16px;
  }
  &__btn-clear{
    color: var(--primary-color);
    text-decoration: none;
  }
  &__btn-results{
    color: var(--white-color);
    background: var(--primary-color);
    padding: 8px 16px;
    border-radius: 4px;
    text-decoration: none;
  }

  &__item {
    box-sizing: border-box;
    padding: 0 8px;
    margin-bottom: 12px;

    &.col-6 {
      max-width: 50%;
      min-width: 50%;
      width: 50%;
    }
    &.col-4 {
      max-width: 33.3333333%;
      min-width: 33.3333333%;
      width: 33.3333333%;
    }
    &.col-4 {
      max-width: 25%;
      min-width: 25%;
      width: 25%;
    }
  }

}
</style>
