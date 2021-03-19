<template>
  <div class="used">
    <div class="used__item" v-for="item in usedFilters" :key="item.id" @click="clearFilter(item.attribute)">
      {{ optionTitle(item.attribute, item.value) }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilterUsed',
  props: {
    filters: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    usedFilters () {
      return this.filters.filter(item => {
        if (Array.isArray(item.value)) return item.value.length
        return item.value !== null
      })
    }
  },
  methods: {
    filterByCode (code) {
      return this.filters.find(x => x.attribute === code)
    },
    optionTitle (property, code) {
      let options

      const filter = Object.assign({}, this.filterByCode(property))

      if (Array.isArray(code)) {
        options = filter.options.filter(x => code.indexOf(x.code) >= 0)
      } else {
        options = this.filterByCode(property).options.filter(x => x.code === code)
      }

      if (filter.type === 'range') {
        const from = options[0]

        const to = options[1]

        if (from.code !== '' && to.code !== '') return `${from.title} - ${to.title}${filter.postfix}`

        if (from.code !== '') return `c ${from.title}${filter.postfix}`

        if (to.code !== '') return `по ${to.title}${filter.postfix}`
      } else if (filter.type === 'multiple') {
        return options.map(x => x.title).join(', ')
      } else {
        return options.map(x => x.title).join()
      }
    },
    clearFilter (property, code) {
      this.filterByCode(property).value = Array.isArray(this.filterByCode(property)) ? [] : null
    }
  }
}
</script>

<style scoped lang="scss">
.used {

  display: flex;
  margin-top: 2px;

  &__item {
    white-space: nowrap;
    background: rgba(255, 255, 255, .7);
    display: flex;
    align-items: center;
    font-size: 13px;
    padding: 4px 4px;
    cursor: pointer;
    border-radius: 4px;
    border: 1px solid #0000001f;
    color: var(--gray-color);
    margin-right: 8px;
    transition: color .2s;

    &:hover {
      color: var(--primary-color);
    }
    &:hover:after {
      color: var(--red-color);
    }

    &:after {
      font-family: icomoon, serif;
      content: "\ea11";
      margin-left: 4px;
      transition: color .2s;

    }
  }
}
</style>
