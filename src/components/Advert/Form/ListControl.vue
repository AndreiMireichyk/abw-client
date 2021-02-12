<template>
  <div>
    <div class="control" v-if="attribute.options.length">
      <div class="control__head">
        <div class="control__title">{{ attribute.label }}</div>
        <div class="control__value" v-if="attribute.value" @click="clearValue">{{ selectedOption.title }}</div>
      </div>
      <div v-if="!attribute.value">
        <ul class="control__list" v-if="filteredOptions.length">
          <li class="control__item" :class="itemClassCol" v-for="option in filteredOptions" :key="option.id">
            <label class="control__label">
              <input class="control__input" type="radio" :value="option.id" @change="update(option.id)">
              {{ option.title }}{{ attribute.postfix }}
            </label>
          </li>
        </ul>
        <div class="control__not-result" v-else>
          <div class="control__not-result-title">Изиените, нет подходящих парамтров :(</div>
          <div class="control__not-result-desc">
            <a class="control__not-result-link" href="">Напишите</a> или позвоните
            <a class="control__not-result-link" href="">749-78-97</a> <br>в Центр поддержки пользователей
          </div>
        </div>

        <div class="control__collapse" :class="{open : !collapse}" v-if="showCollapseBlock">
          <div>
            <a @click="collapse = !collapse" v-if="collapse" class="control__show-all">Показать все</a>
            <a @click="collapse = !collapse" v-else class="control__show-all">Свернуть все</a>
          </div>
          <div class="control__search" v-if="!collapse">
            <input class="control__search-input" type="text" v-model="search" placeholder="Поиск...">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['attribute', 'vee'],
  name: 'ListInput',
  data () {
    return {
      search: null,
      collapse: true
    }
  },
  computed: {
    itemClassCol () {
      if (this.maxTitleLen > 40) return 'cols-2'
      if (this.maxTitleLen >= 30) return 'cols-2'
      if (this.maxTitleLen > 20) return 'cols-2'
      if (this.maxTitleLen >= 15) return 'cols-4'
      return 'cols-5'
    },
    maxTitleLen () {
      const titles = this.attribute.options.map(item => item.title.length)
      return Math.max(...titles)
    },
    showCollapseBlock () {
      return this.attribute.options.length > 20
    },
    selectedOption () {
      return this.attribute.options.filter(item => {
        return item.id === this.attribute.value
      })[0]
    },
    filteredOptions () {
      if (this.collapse) {
        return this.attribute.options.slice(0, 20)
      } else {
        if (this.search) {
          return this.attribute.options.filter(item => {
            return item.title.toLowerCase().indexOf(this.search.toLowerCase()) + 1
          })
        }
        return this.attribute.options
      }
    }
  },
  watch: {
    'attribute.options' () {
      // if (this.attribute.options.length === 1) this.update(this.attribute.options[0].id)
    }
  },
  methods: {
    update (option) {
      this.$emit('input', option)
    },
    clearValue () {
      this.$emit('input', null)
      this.attribute.value = null
    }
  }
}
</script>

<style scoped lang="scss">
.control {
  display: flex;
  flex-direction: column;

  background: #ffff;

  &__head {
    display: flex;
    align-items: center;
  }

  &__title {
    font-weight: 500;
    font-size: 18px;

    &:after {
      content: ":";
    }
  }

  &__value {
    cursor: pointer;
    text-transform: uppercase;
    font-weight: 500;
    padding-left: 10px;
    font-size: 18px;
    color: var(--primary-color);

    &:hover {
      color: var(--primary-color);
    }
  }

  &__error {
    font-size: 12px;
    color: var(--red-color);
    text-align: right;
    flex-grow: 1;
  }

  &__not-result {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    min-height: 250px;

    &-title {
      font-size: 18px;
      font-weight: 500;
      color: var(--gray-color);
      margin-bottom: 12px;
    }

    &-desc {
      line-height: 1.4;
      color: var(--gray-color);
    }

    &-link {
      text-decoration: none;
      font-weight: 500;
      color: var(--primary-color);
    }
  }

  &__list {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    margin-top: 24px;
    min-height: 250px;

  }

  &__item {
    box-sizing: border-box;
    margin-bottom: 24px;
    padding: 6px;

    &.cols-2 {
      width: 100%;
    }

    &.cols-2 {
      width: 50%;
    }

    &.cols-3 {
      width: 33.333%;
    }

    &.cols-4 {
      width: 25%;
    }

    &.cols-5 {
      width: 20%;
    }
  }

  &__label {
    cursor: pointer;
    font-weight: 500;
    font-size: 14px;
    color: var(--primary-color);
    text-transform: capitalize;
    transition: all .2s;

    &:hover {
      color: var(--font-color);
    }
  }

  &__input {
    display: none
  }

  &__collapse {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #ffffff;
    padding: 0 12px 0 0;

    &.open {
      position: sticky;
      bottom: 0;
      margin: 0 -24px;
      padding: 16px 24px 16px;
      border-top: 1px solid #ebebeb;
    }
  }

  &__show-all {
    display: inline-block;
    cursor: pointer;
    box-shadow: 0 0 0 1px var(--primary-color) inset, 0 1px 0 rgba(24, 26, 27, 0.08);
    background: var(--primary-color);
    color: #ffffff;
    padding: 8px 12px;
    border-radius: 4px;
    transition: all .3s;

    &:hover {
      background: transparent;
      box-shadow: 0 0 0 1px #d3d9df inset, 0 1px 0 rgba(24, 26, 27, 0.08);
      color: var(--font-color);
    }
  }

  &__search-input {
    box-shadow: 0 0 0 1px #d3d9df inset, 0 1px 0 rgba(24, 26, 27, 0.08);
    padding: 6px 12px;
    border-radius: 4px;
    border: none;
    outline: none;
    appearance: none;
    color: var(--gray-color);
  }
}
</style>
