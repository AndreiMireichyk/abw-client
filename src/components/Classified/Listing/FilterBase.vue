<template>
  <div class="filter" v-if="filters.length">

    <component :is="resolvedComponent" :filters="filters" :showAllFilters="showAllFilters"></component>

    <div class="filter__footer">
      <div class="filter__actions">
        <div class="filter__action">
          <a class="filter__btn-all" href="javascript:void(0)" @click="allFilters" v-if="showAllFilters">
            Меньше параметров
          </a>
          <a class="filter__btn-all" href="javascript:void(0)" @click="allFilters" v-else>
            Больше параметров
          </a>
        </div>
        <div class="filter__action" v-if="paramsPath">
          <a class="filter__btn-clear" href="javascript:void(0)" @click="clearFilters">Сбросить</a>
        </div>
      </div>
      <router-link :to="resultsUrl" @click.native="showResults" class="filter__btn-results">Показать {{ advCount }}
        предложений
      </router-link>
    </div>
  </div>
</template>

<script>

import CarFilter from '@/components/Classified/Listing/Filter/Categories/Car'

export default {
  props: ['categorySlug'],
  name: 'FilterBase',
  components: {
    CarFilter
  },
  data () {
    return {
      url: null,
      filters: [],
      notUpdate: false,
      showAllFilters: false,
      advCount: 0
    }
  },
  watch: {
    attributes () {
      this.update()
    },
    categorySlug () {
      this.filters = []
      this.fetchFilters()
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

    resultsUrl () {
      return `/${this.categorySlug}/prodaja${this.paramsPath}`
    },

    routeParamsPath () {
      if (this.$route.params.params) {
        return `/${this.$route.params.params}`
      }
      return ''
    },

    paramsPath () {
      let string = ''

      this.filters
        .filter(item => item.value)
        .filter(item => item.value.length)
        .map(item => {
          switch (item.type) {
            case 'equal' :
              string += `/${item.attribute}_${item.value}`
              break
            case 'range' :
              string += `/${item.attribute}_${item.value.join(':')}`
              // если 1 элемент, выбоано только с, добавляем разделитель
              string += item.value.length === 1 ? ':' : ''
              break
            case 'multiple' :
              string += `/${item.attribute}_${item.value.join(',')}`
              break
          }
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

      this.$http.get(`${this.$config.host}/api/adverts/${this.$route.params.slug}/filters${this.paramsPath}`)
        .then(r => {
          this.reloadOptions(r.data.filters)
          this.advCount = r.data.advCount
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
          if (!i.length) {
            //   this.filters[key].value = ['range', 'multiple'].includes(this.filters[key].type) ? [] : null
          }
        }
      })

      this.notUpdate = false
    },

    async fetchFilters () {
      this.notUpdate = true

      await this.$http.get(`${this.$config.host}/api/adverts/${this.$route.params.slug}/filters${this.routeParamsPath}`)
        .then(r => {
          this.filters = r.data.filters
          this.advCount = r.data.advCount
        })
        .catch(e => {
          alert('fetch filters err')
        })
      this.notUpdate = false
    },
    allFilters () {
      this.showAllFilters = !this.showAllFilters
    },
    async clearFilters () {
      this.notUpdate = true

      await this.$http.get(`${this.$config.host}/api/adverts/${this.$route.params.slug}/filters`)
        .then(r => {
          this.filters = r.data.filters
          this.advCount = r.data.advCount
        })
        .catch(e => {
          alert('fetch filters err')
        })
      this.$router.push(this.resultsUrl)
      this.notUpdate = false
    },
    showResults () {
      this.showAllFilters = false
      this.$emit('showResults')
    }
  },
  created () {
    this.fetchFilters()
  }

}
</script>

<style lang="scss">

.filter {

  &__body {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -8px;
  }

  &__title {
    font-weight: bold;
  }

  &__divider {
    min-width: 100%;
    border-top: 1px solid rgba(0, 0, 0, .05);
    margin-bottom: 12px;
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__collapse {
    padding-top: 12px;
    width: 100%;

    display: flex;
    flex-wrap: wrap;

    justify-content: flex-start;
    border-top: 1px solid rgba(0, 0, 0, 0.05);
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    margin-bottom: 12px;

  }

  &__actions {
    display: flex;
  }

  &__action {
    display: flex;

    &:after {
      content: "";
      display: block;
      height: 100%;
      margin: 0 8px;
      border-right: 1px solid rgba(0, 0, 0, .18);
    }

    &:last-child:after {
      display: none;
    }
  }

  &__btn-save {
    color: var(--primary-color);
    text-decoration: none;
  }

  &__btn-all {
    color: var(--primary-color);
    text-decoration: none;
  }

  &__btn-clear {
    color: var(--primary-color);
    text-decoration: none;
  }

  &__btn-results {
    color: var(--white-color);
    background: var(--primary-color);
    padding: 8px 16px;
    border-radius: 4px;
    text-decoration: none;
  }

  &__item {
    box-sizing: border-box;
    padding: 0 8px;
    margin-bottom: 16px;

    &--save {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }

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

    &.col-3 {
      max-width: 25%;
      min-width: 25%;
      width: 25%;
    }

    &.col-2 {
      max-width: 16.666%;
      min-width: 16.666%;
      width: 16.666%;
    }
  }

  @keyframes slide {
    from {height: 0;}
    to {height: 300px;}
  }
}
</style>
