<template>
  <div>
    <div class="control">
      <label class="control__title">{{ attribute.label }}:</label>
      <div class="control__group" :class="{invalid: vee.errors.length}">
        <label class="control__item"  v-for="option in attribute.options" :key="option.id" :class="{active: attribute.value && attribute.value === option.id}">
          {{ option.title }}
          <input class="control__input" type="radio" v-model="attribute.value" :value="option.id">
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['attribute', 'vee'],
  name: 'SwitchControl'
}
</script>

<style scoped lang="scss">
.control {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: nowrap;
  margin-bottom: 24px;

  &__title {
    font-size: 14px;
    font-weight: 500;
    color: var(--font-color);
    margin-right: 24px;
    width: 70px;
  }

  &__group {
    display: flex;
    overflow: hidden;
  }

  &__item {
    display: block;
    border: 1px solid rgba(0, 0, 0, .12);
    transition: background-color 0.3s;

    &:first-child {
      border-radius: 4px 0 0 4px;
    }

    &:last-child {
      border-radius: 0 4px 4px 0;
    }

    label {
      white-space: nowrap;
      display: block;
      cursor: pointer;
      color: var(--gray-color);
      padding: 8px 8px;
    }

    input {
      display: none;
    }

    &:hover, &.active {
      border-color: var(--primary-color);
      background: rgba(54, 153, 255, 0.2);
    }
  }

}
</style>
