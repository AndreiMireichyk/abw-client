<template>
  <div>
    <div class="control">
      <label class="control__title">{{attribute.label}}</label>
      <div class="control__group">
        <div class="control__item" v-for="option in attribute.options" :key="option.id">
          <label class="control__label" :class="{active: attribute.value && attribute.value.id === option.id}">
            {{option.title}}
            <input class="control__input" type="radio" v-model="attribute.value" :value="option">
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['attribute'],
  name: 'SwitchControl'
}
</script>

<style scoped lang="scss">
  .control {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: nowrap;
    padding: 16px 24px;

    &__title {
      font-size: 14px;
      font-weight: 500;
      color: var(--font-color);
      margin-right: 24px;
    }

    &__group {
      display: flex;
      border-radius: 8px;
      border: 1px solid #ebebeb;
      overflow: hidden;
    }

    &__item {

    }

    &__label {
      cursor: pointer;

      display: block;
      padding: 6px 12px;
      transition: all .3s;

      &:hover, &.active {
        box-shadow: 0 0 0 1px var(--primary-color) inset, 0 1px 0 rgba(24, 26, 27, 0.08);
        background: var(--primary-color);
        color: var(--white-color);
      }

    }

    &__input {
      display: none;
    }
  }
</style>
