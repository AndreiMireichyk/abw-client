<template>
  <div class="control" :class="{disabled: !filter.options.length, active: filter.value}">

    <div class="control__input"
         :class="{open: showList}"
         @click.stop="showList = !showList">
      <span class="control__value">
              {{ selectedValue }}
      </span>
      <span class="control__value-count">

      </span>
      <i class="icon-chevron-down"/>
    </div>

    <div class="control__list scrollbar" v-if="showList">

      <div class="control__search" @click.stop>
        <input type="text" v-model="search" placeholder="Поиск...">
      </div>

      <div class="control__item clear" @click="clear">Любая <i class="icon-x"/></div>

      <div class="control__item"
           v-for="(option, index) in filteredList"
           :key="index"
           :class="{active: filter.value === option.code}"
           @click.stop="select"
      >
        <label>
          {{ option.title }}
          <input type="radio" v-model="filter.value" :value="option.code">
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
    showList () {
      this.search = null
    }
  },
  computed: {
    filteredList () {
      if (this.search) {
        return this.filter.options.filter(item => item.title.toLowerCase().indexOf(this.search.toLowerCase()) >= 0)
      }
      return this.filter.options
    },
    selectedValue () {
      if (this.filter.value) {
        const selectedOption = this.filter.options.filter(item => item.code === this.filter.value)[0]
        return selectedOption.title
      }

      return this.filter.placeholder
    }
  },
  methods: {
    select () {
      // eslint-disable-next-line no-return-assign
      setTimeout(() => this.showList = false, 10)
    },
    clear () {
      this.filter.value = null
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

  &__value-count{
    color: var(--gray-color);
    font-size: 12px;
  }
  &__value{
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
      display: block;
    }

    input {
      display: none;
    }

    &:hover, &.active {
      background: var(--primary-color);
      color: var(--white-color);
    }
  }
}
</style>
