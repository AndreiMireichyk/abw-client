<template>
  <div class="control" :class="{disabled: !filter.options.length}">

    <div class="control__item"
         :class="{active: filter.value === null}"
    >
      <label>
        Все
        <input type="radio" v-model="filter.value" :value="null">

      </label>
    </div>
    <div class="control__item"
         :class="{active: filter.value === option.code}"
         v-for="(option, index) in filter.options" :key="index"
    >
      <label>
        {{ option.title }}
        <input type="radio" v-model="filter.value" :value="option.code">

      </label>
    </div>

  </div>
</template>

<script>
export default {
  name: 'SwitchControl',
  props: ['filter']
}
</script>

<style scoped lang="scss">
.control {

  display: flex;
  align-items: center;

  &__item {
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
