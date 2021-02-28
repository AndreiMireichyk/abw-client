<template>
<span :class="tagClass">
  <slot></slot>
</span>
</template>

<script>
export default {
  name: 'ATag',
  props: {
    type: {
      type: String,
      default: 'primary'
    }
  },
  computed: {
    tagClass () {
      return `a-tag ${this.typeClass}`
    },
    typeClass () {
      return `a-tag-${this.type}`
    }
  }
}
</script>

<style scoped lang="scss">
.a-tag {
  padding: 2px 7px;
  border-radius: var(--input-sm-radius);
  font-size: 12px;
  border: 1px solid;

  &-primary {
    color: var(--primary-color);
    border-color: var(--primary-color);
    background: var(--light-primary-color);
  }

  &-success {
    color: var(--success-color);
    border-color: var(--success-color);
    background: var(--light-success-color);
  }

  &-danger {
    color: var(--red-color);
    border-color: var(--red-color);
    background: var(--light-danger-color);
  }

  &-warning {
    color: var(--warning-color);
    border-color: var(--warning-color);
    background: var(--light-warning-color);
  }
  &-default {
    color: var(--font-muted-color);
    border-color: var(--font-muted-color);
  }
}
</style>
