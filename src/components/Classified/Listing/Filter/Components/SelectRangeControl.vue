<template>
  <div class="control" :class="{disabled: !filter.options.length, active: isActive}">

    <div class="control__input"
         :class="{open: showList}"
         @click.stop="showList = !showList">
      <span class="control__value">
        {{ selectedValue }}
      </span>
      <i class="icon-chevron-down"/>
    </div>

    <div class="control__list scrollbar" v-show="showList">

      <label class="control__search" @click.stop>
        <input :ref="`input`" type="text" v-model="search" placeholder="Поиск...">
      </label>

      <div class="control__item clear" @click="clear">Любая <i class="icon-x"/></div>

      <div class="control__wrap">

        <div class="control__from scrollbar">
          <div class="control__item"
               v-for="(option, index) in filteredList"
               :key="index"
               :class="{active: filter.value[0] === option.code}"
               @click.stop="select"
          >
            <label>
              {{ option.title }}
              <input type="radio" v-model="filter.value[0]" :value="option.code">
              <i class="icon-check" v-if="filter.value[0] === option.code"/>
            </label>
          </div>
        </div>

        <div class="control__to scrollbar">
          <div class="control__item"
               v-for="(option, index) in toFilteredList"
               :key="index"
               :class="{active: filter.value[1] === option.code}"
               @click.stop="select"
          >
            <label>
              {{ option.title }}
              <input type="radio" v-model="filter.value[1]" :value="option.code">
              <i class="icon-check" v-if="filter.value[1] === option.code"/>
            </label>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'SelectRangeControl',
  props: ['filter', 'reverse'],
  data () {
    return {
      search: null,
      showSearch: false,
      showList: false
    }
  },
  watch: {
    controls () {
      this.filter.value = [this.controls.from, this.controls.to]
      this.$emit('input', [this.controls.from, this.controls.to])
    },
    showList () {
      this.search = null

      if (this.showList) {
        setTimeout(() => {
          this.$refs.input.focus()
        }, 10)
      }
    }
  },
  computed: {
    fromValueIndex () {
      return this.filter.options.indexOf(this.fromOption)
    },
    toValueIndex () {
      return this.filter.options.indexOf(this.toOption)
    },
    fromOption () {
      return this.filter.options.find(i => i.code === this.filter.value[0])
    },
    toOption () {
      return this.filter.options.find(i => i.code === this.filter.value[1])
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
    toFilteredList () {
      if (this.fromValueIndex === -1) return this.filteredList

      return this.filteredList.filter((item, index) => {
        if (this.reverse) {
          return index >= this.fromValueIndex
        } else {
          return index <= this.fromValueIndex
        }
      })
    },
    isActive () {
      return this.filter.value.length
    },
    selectedValue () {
      if (this.filter.value[0] && this.filter.value[1]) {
        return `${this.filter.value[0]} - ${this.filter.value[1]} ${this.filter.postfix}`
      } else if (this.filter.value[0]) {
        return `c ${this.filter.value[0]}${this.filter.postfix}`
      } else if (this.filter.value[1]) {
        return `по ${this.filter.value[1]}${this.filter.postfix}`
      }
      return this.filter.placeholder
    }
  },
  methods: {
    select (index) {

    },
    clear () {
      this.filter.value = []
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
  cursor: pointer;
  min-width: 100%;
  border-radius: 4px;
  border: 1px solid #0000001f;
  position: relative;
  transition: border .2s, background .3s;

  &.active {
    color: var(--font-color);
    border-color: var(--primary-color);
    background: rgba(54, 153, 255, 0.15);
  }

  &:hover {
    border-color: var(--primary-color)
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

    box-shadow: 0 8px 20px rgb(0 0 0 / 16%);
    margin-top: 5px;
  }

  &__wrap {
    display: flex;
  }

  &__from, &__to {
    width: 50%;
    max-height: 235px;
    overflow-y: scroll;
  }

  &__to {
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
