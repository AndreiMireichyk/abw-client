<template>
  <div class="control" :class="{disabled: !filter.options.length, active: isActive}">

    <div class="control__input"
         :class="{open: showList}"
         @click.stop="showList = !showList">
      <span class="control__value">
        {{ selectedValue }}
      </span>
      <span class="control__value-count" v-if="selectedValueCount">
        ({{ selectedValueCount }})
      </span>
      <i class="icon-chevron-down"/>
    </div>

    <div class="control__list scrollbar" v-if="showList">

      <label class="control__search" @click.stop>
        <input type="text" v-model="search" placeholder="Поиск...">
      </label>

      <div class="control__item clear" @click="clear">Любая <i class="icon-x"/></div>

      <div class="control__item"
           v-for="(option, index) in filteredList"
           :key="index"
           :class="{active: optionIsActive(option), range:optionIsRange(option)}"
           @click.stop="select"
      >
        <label>
          {{ option.title }}
          <input :type="inputType" v-model="filter.value" :value="option.code">
          <i class="icon-check" v-if="optionIsActive(option)"/>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SelectControl',
  props: ['filter'],
  data () {
    return {
      search: null,
      showSearch: true,
      showList: false
    }
  },
  watch: {
    'filter.value' () {
      if (this.isRange && this.filter.value.length === 3) {
        this.filter.value = this.filter.value.slice(2, 3)
      }
    },
    showList () {
      this.search = null
    }
  },
  computed: {
    isRange () {
      return this.filter.type === 'range'
    },
    isMultiple () {
      return this.filter.type === 'multiple'
    },
    isEqual () {
      return this.filter.type === 'equal'
    },
    inputType () {
      switch (this.filter.type) {
        case 'range':
          return 'checkbox'
        case 'multiple':
          return 'checkbox'
        case 'equal':
          return 'radio'
      }

      return 'radio'
    },
    filteredList () {
      if (this.search) {
        return this.filter.options
          .filter(item => item.title
            .toLowerCase()
            .indexOf(this.search.toLowerCase()) >= 0)
      }
      return this.filter.options
    },
    isActive () {
      if (['multiple', 'range'].includes(this.filter.type) && this.filter.value.length) {
        return true
      }

      return !!(this.filter.type === 'equal' && this.filter.value)
    },
    selectedValueCount () {
      if (this.filter.type === 'multiple' && this.filter.value.length) {
        return this.filter.value.length
      }

      return false
    },
    selectedValue () {
      if (this.filter.type === 'equal' && this.filter.value) {
        const option = this.filter.options.filter(item => item.code === this.filter.value)
        return option.length ? option[0].title : this.filter.placeholder
      }

      if (this.filter.type === 'range' && this.filter.value.length) {
        const selectedOptions = this.filter.options
          .filter(item => this.filter.value.includes(item.code))
          .filter(item => item.code)

        if (selectedOptions.length > 1) {
          const start = selectedOptions.slice(0)[0]

          const end = selectedOptions.slice(-1)[0]

          return `${start.title} - ${end.title}${this.filter.postfix}`
        } else {
          const start = selectedOptions.slice(0)[0]

          return `${start.title}${this.filter.postfix}`
        }
      }

      if (this.filter.type === 'multiple' && this.filter.value.length) {
        const selectedOption = this.filter.options.filter(item => this.filter.value.includes(item.code))
        return selectedOption.map(item => {
          return item.title
        }).join(', ')
      }

      return this.filter.placeholder
    }
  },
  methods: {
    select () {
      if (['range', 'multiple'].includes(this.filter.type)) {
        return false
      }

      // eslint-disable-next-line no-return-assign
      setTimeout(() => this.showList = false, 10)
    },
    optionIsRange (option) {
      if (!this.isRange) return

      return true
    },
    optionIsActive (option) {
      if (this.filter.type === 'range') {
        return this.filter.value.includes(option.code)
      }
      if (this.filter.type === 'multiple') {
        return this.filter.value.includes(option.code)
      }
      if (this.filter.type === 'equal') {
        return this.filter.value === option.code
      }
    },
    clear () {
      if (['range', 'multiple'].includes(this.filter.type)) {
        this.filter.value = []
      } else {
        this.filter.value = null
      }
    }
  },
  created () {
    // eslint-disable-next-line no-return-assign
    document.body.addEventListener('click', () => this.showList = this.showList ? false : this.showList)
  }
}
</script>

<style scoped lang="scss">
.control {
  min-width: 100%;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, .12);
  position: relative;
  transition: border-color, background .3s;

  &.active {
    color: var(--font-color);
    border-color: var(--primary-color);
    background: rgba(54, 153, 255, 0.15);
  }

  &:hover {
    border: 1px solid var(--primary-color)
  }

  &.disabled {
    opacity: .7;
    background: #f1f1f1;
    pointer-events: none;
  }

  &__input {
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 8px 8px;

    i {
      transition: transform .3s;
    }

    &.open i {
      transform: rotate(180deg);

    }
  }

  &__value-count {
    color: var(--gray-color);
    font-size: 12px;
  }

  &__value {
    flex-grow: 1;
    cursor: pointer;
    color: var(--gray-color);
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  &__list {
    min-width: 100%;
    position: absolute;
    z-index: 9999;
    background: var(--white-color);
    max-height: 300px;
    overflow-y: scroll;
    box-shadow: 0 8px 20px rgb(0 0 0 / 16%);
    margin-top: 5px;
  }

  &__search {
    display: block;
    background: var(--white-color);
    padding: 12px 12px 6px 12px;
    position: sticky;
    top: 0;
  }

  &__search input {
    box-sizing: border-box;
    min-width: 100%;
    padding: 6px 6px;
    border-radius: 4px;
    border: 1px solid rgba(0, 0, 0, .12);
    outline: none;
    color: var(--gray-color);
  }

  &__item {
    color: var(--font-color);
    cursor: pointer;

    &.clear {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 6px 12px;
      border-bottom: 1px solid rgba(0, 0, 0, .12);

      i {
        color: var(--font-color);
      }
    }

    label {
      cursor: pointer;
      padding: 6px 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    input {
      display: none;
    }

    &.range {
      background: rgba(54, 153, 255, 0.15);
    }

    &:hover, &.active {
      background: var(--primary-color);
      color: var(--white-color);
    }
  }
}
</style>
