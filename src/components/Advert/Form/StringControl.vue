<template>
  <div class="control">
    <div class="control__title">{{ attribute.label }}:</div>
    <input class="control__input"  v-model="attribute.value" type="text" :placeholder="attribute.placeholder" @input="update"
           :class="{invalid: vee.errors.length}">
  </div>
</template>

<script>
export default {
  props: ['attribute', 'vee'],
  name: 'StringControl',
  methods: {
    update (event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>

<style scoped lang="scss">
.control {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: nowrap;
  position: relative;
  margin-bottom: 24px;

  &__title {
    font-size: 14px;
    font-weight: 500;
    color: var(--font-color);
    margin-right: 24px;
    width: 70px;
  }

  &__input {
    max-width: 185px;
    box-shadow: 0 0 0 1px #d3d9df inset, 0 1px 0 rgba(24, 26, 27, 0.08);
    padding: 8px 12px;
    border-radius: 4px;
    border: none;
    outline: none;
    color: var(--gray-color);
  }

  &__error {
    position: absolute;
    bottom: -16px;
    font-size: 12px;
    color: var(--red-color);
    text-align: right;
    flex-grow: 1;
  }
}
</style>
