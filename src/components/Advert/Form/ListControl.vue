<template>
  <div>
    <div class="control">
      <div class="control__head">
        <div class="control__title">{{ attribute.label }}</div>
        <div class="control__value" v-if="attribute.value" @click="clearValue">{{ attribute.value.title }}</div>
      </div>
      <div v-if="!attribute.value">
        <ul class="control__list" v-if="filteredOptions.length">
          <li class="control__item" v-for="option in filteredOptions" :key="option.id">
            <label class="control__label">
              <input class="control__input" type="radio" :value="option" @input="update(option)">
              {{ option.title }}
            </label>
          </li>
        </ul>
        <div class="control__not-result" v-else>
          <div class="control__not-result-title">Изиените, нет подходящих парамтров :(</div>
          <div class="control__not-result-desc">
            <a class="control__not-result-link" href="">Напишите</a> или позвоните <a class="control__not-result-link"
                                                                                      href="">749-78-97</a> <br>в Центр
            поддержки пользователей
          </div>
        </div>

        <div class="control__collapse" :class="{open : !collapse}">
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
  props: ['attribute'],
  name: 'ListInput',
  data () {
    return {
      search: null,
      collapse: true,
      listState: true
    }
  },
  computed: {
    filteredOptions () {
      if (this.collapse) {
        return this.attribute.options.slice(0, 25)
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

  methods: {
    update (option) {
      this.$emit('input', option)
    },
    clearValue () {
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
    border-bottom: 1px solid #ebebeb;

    &__head {
      display: flex;
      align-items: center;
      padding: 12px 24px;
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

    &__not-result {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 12px 24px;
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
      padding: 12px 24px;
      min-height: 250px;

    }

    &__item {
      width: 20%;
      margin-bottom: 24px;
    }

    &__label {
      cursor: pointer;
      font-weight: 500;
      font-size: 15px;
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
      position: sticky;
      bottom: 0;
      padding: 0 12px 16px 24px;

      &.open {
        padding: 16px 24px;
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
