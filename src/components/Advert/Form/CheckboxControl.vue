<template>
  <div class="control">
    <div class="control__head">
      <div class="control__title">{{ attribute.label }}</div>
      <div class="control__value" v-if="attribute.value">{{ selectedOptions }}</div>
    </div>

    <div>
      <ul class="control__list" v-if="attribute.options.length">
        <li class="control__item" v-for="option in attribute.options" :key="option.id">
          <input :id="`${attribute.id + option.id}`" v-model="attribute.value" class="control__input" type="checkbox"
                 :value="option.id">
          <label class="control__label" :for="`${attribute.id + option.id}`"> {{ option.title }}{{
              attribute.postfix
            }} </label>
        </li>
      </ul>

      <div class="control__footer">
        <a class="control__btn" type="submit" @click="update">Далее</a>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  props: ['attribute', 'vee'],
  name: 'CheckboxControl',
  data () {
    return {
      values: []
    }
  },
  computed: {
    selectedOptions () {
      return this.attribute.options
        .filter(item => {
          return this.attribute.value.includes(item.id)
        })
        .map(item => item.title)
        .join(', ')
    }
  },
  methods: {
    update () {
      // this.$emit('input', this.attribute.value)
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
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
    flex-wrap: wrap;
    align-items: flex-start;
    margin-top: 24px;
    min-height: 250px;

  }

  &__item {
    box-sizing: border-box;
    margin-bottom: 24px;
    padding: 6px;
    width: 50%;

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
    display: flex;
    align-items: center;

    cursor: pointer;
    font-weight: 500;
    font-size: 14px;
    color: var(--font-color);
    text-transform: capitalize;
    transition: all .2s;

    &:before {
      display: block;
      font-size: 18px;
      content: "\e9e0";
      font-family: icomoon, serif;
      padding-right: 4px;
      color: var(--gray-color);
      position: relative;
      top: -2px;
    }

    &:hover, &.active {
      color: var(--primary-color);
    }
  }

  &__input:checked + label {

    color: var(--primary-color);

    &:before {
      display: block;
      font-size: 18px;
      content: "\e92d";
      font-family: icomoon, serif;
      padding-right: 4px;
      color: var(--primary-color);
      position: relative;
      top: -2px;
    }
  }

  &__input {
    display: none;
  }

  &__footer {
    display: flex;
    align-items: center;
    padding: 16px 24px 0;
    border-top: 1px solid #ebebeb;
    margin: 0 -24px;
  }

  &__btn {
    display: inline-block;
    cursor: pointer;
    box-shadow: 0 0 0 1px var(--primary-color) inset, 0 1px 0 rgba(24, 26, 27, 0.08);
    padding: 8px 12px;
    border-radius: 4px;
    transition: all .3s;
    background: var(--primary-color);
    color: var(--white-color);
    text-decoration: none;
    outline: 0;
    appearance: none;
    border: 0;

    &:hover {
      background: transparent;
      box-shadow: 0 0 0 1px #d3d9df inset, 0 1px 0 rgba(24, 26, 27, 0.08);
      color: var(--font-color);
    }
  }
}
</style>
