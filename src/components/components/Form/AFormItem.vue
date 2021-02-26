<template>
  <div class="a-form-item">
    <label :class="labelClass" v-if="label">{{ label }}</label>
    <div :class="inputClass">
      <slot></slot>
      <small v-if="errors.length" class="a-form-item-error">
        {{ errors[0] }}
      </small>
      <small v-if="hasErrorSlot" class="a-form-item-error">
        <slot name="error"></slot>
      </small>
      <small v-if="hasDescSlot" class="a-form-item-desc">
        <slot name="desc"></slot>
      </small>
      <small v-if="hasActionsSlot" class="a-form-item-actions">
        <slot name="actions"></slot>
      </small>
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
      type: [Number, String],
      default: 12
    },
    labelAlign: {
      type: String,
      default: 'left'
    },
    inputAlign: {
      type: String,
      default: 'left'
    },
    inputCol: {
      type: [Number, String],
      default: 12
    },
    errors: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    labelClass () {
      return `a-form-item-label ${this.labelSizeClass}  ${this.labelAlignClass}`
    },
    labelSizeClass () {
      return `col-${this.labelCol}`
    },
    labelAlignClass () {
      return `text-${this.labelAlign}`
    },
    inputClass () {
      return `a-form-item-group ${this.inputSizeClass} ${this.inputAlignClass}`
    },
    inputSizeClass () {
      return `col-${this.inputCol}`
    },
    inputAlignClass () {
      return `text-${this.inputAlign}`
    },
    hasDescSlot () {
      return this.$slots.desc
    },
    hasActionsSlot () {
      return this.$slots.actions
    },
    hasErrorSlot () {
      return this.$slots.error
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
    text-align: right;
    padding-right: 24px;
    height: 100%;
    color: var(--font-color);
  }

  &-group {

  }

  &-actions {
    display: flex;
    align-items: center;
    margin-top: 8px;

    & > * {
      margin-right: 10px;
    }
  }

  &-desc {
    display: block;
    margin-top: 6px;
    font-size: 12px;
    line-height: 1.2;
    color: var(--font-muted-color);
  }

  &-error {
    margin-top: 6px;
    display: block;
    font-size: 12px;
    line-height: 1.2;
    color: var(--red-color);
  }
}
</style>
