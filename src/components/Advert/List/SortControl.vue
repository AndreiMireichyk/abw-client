<template>
  <div class="control">

    <div class="control__input" @click.stop="open">
      <span class="control__prefix">сначала</span>
      <span class="control__value">{{ selectedValue }}</span>
      <i class="icon-chevron-down"/>
    </div>
    <div class="control__list" v-show="showList">

        <label class="control__item"
               v-for="(item, index) in sort.items" :key="index"
               :class="{active: item.code === sort.value}"
               >
          {{ item.title }}
          <input type="radio" v-model="sort.value" :value="item.code">
        </label>

    </div>
  </div>
</template>

<script>

export default {
  name: 'SortControl',
  props: ['sort'],
  data () {
    return {
      value: null,
      showList: false
    }
  },
  computed: {
    selectedValue () {
      const values = this.sort.items.filter(item => {
        return item.code === this.sort.value
      })

      return values.length ? values[0].title : 'n/a'
    }
  },
  watch: {
    'sort.value' () {
      this.$emit('input', this.value)
      this.showList = false
    }
  },
  methods: {
    open () {
      this.showList = !this.showList
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
  position: relative;

  &__input {
    display: flex;
    align-items: center;
    color: var(--font-color);
    cursor: pointer;

    span {
      display: block;
      padding-right: 3px;
    }

    i {
      position: relative;
      top: 1px;
      display: block;
      font-size: 16px;
      color: var(--primary-color);
    }
  }

  &__value {
    color: var(--primary-color);
  }

  &__list {
    position: absolute;
    right: 0;
    z-index: 9999;
    background: var(--white-color);
    box-shadow: 0 8px 20px rgb(0 0 0 / 16%);
    margin-top: 5px;

  }

  &__item {
    color: var(--font-color);

    cursor: pointer;
    padding: 6px 12px;
    display: block;
    white-space: nowrap;

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
