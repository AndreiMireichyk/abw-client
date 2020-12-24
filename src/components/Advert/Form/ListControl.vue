<template>
  <div>
    <div class="control">
      <div class="control__head">
        <div class="control__title">{{ attribute.label }}</div>
        <div class="control__value" v-if="attribute.value" @click="clearValue">{{ attribute.value.title }}</div>
      </div>
      <ul class="control__list" v-if="!attribute.value">
        <li class="control__item" v-for="option in attribute.options" :key="option.id">
          <label class="control__label">
            <input class="control__input" type="radio" :value="option" @input="update(option)">
            {{ option.title }}
          </label>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ['attribute'],
  name: 'ListInput',
  data () {
    return {
      listState: true
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

  &__list {
    display: flex;
    align-items: center;
    padding: 12px 24px;
  }

  &__item {
    width: 20%;
  }

  &__label {
    cursor: pointer;
    font-weight: 500;
    font-size: 16px;
    color: var(--primary-color);

    &::first-letter {
      text-transform: uppercase;
    }
  }

  &__labe::first-letter {
    text-transform: uppercase;
  }

  &__input {
    display: none
  }
}
</style>
