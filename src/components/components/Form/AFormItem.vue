<template>
  <div class="a-form-item">
    <label class="a-form-item-label">{{ label }}</label>
    <div class="a-form-item-group">
      <slot></slot>
      <small v-if="errors.length" class="a-form-item-error">{{ errors[0] }}</small>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AFormItem',
  props: {
    label: {
      type: String,
      default: ''
    },
    labelCol: {
      type: Number,
      default: 12
    },
    labelAlign: {
      type: String,
      default: 'left'
    },
    inputCol: {
      type: Number,
      default: 12
    },
    errors: {
      type: Array,
      default: () => []
    }
  }

}
</script>

<style scoped lang="scss">
.a-form-item {
  display: flex;
  align-items: stretch;
  margin-bottom: 16px;

  &-label {
    position: relative;
    top: 9px;
    box-sizing: border-box;
    width: 30%;
    text-align: right;
    padding-right: 24px;
    height: 100%;
    color: var(--font-color);
  }

  &-group {
    width: 40%;
  }

  &-error {
    margin-top: 6px;
    display: block;
    font-size: 12px;
    color: var(--red-color);
  }

}
</style>
