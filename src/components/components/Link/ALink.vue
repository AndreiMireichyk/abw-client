<template>
  <router-link :to='to' :class="linkClass" exact-active-class="active">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'primary'
    },
    weight: {
      type: String,
      default: 'normal'
    },
    active: {
      type: Boolean,
      default: false
    },
    to: {
      type: [String, Object],
      default: '#'
    }
  },
  name: 'ALink',
  computed: {
    linkClass () {
      return `a-link ${this.linkTypeClassType} ${this.linkWeightClass} ${this.linkActiveClass}`
    },
    linkTypeClassType () {
      switch (this.type) {
        case 'primary':
          return 'a-link-primary'
        case 'success':
          return 'a-link-success'
        case 'danger':
          return 'a-link-danger'
        case 'muted':
          return 'a-link-muted'
        case 'default':
          return 'a-link-default'
        default:
          return 'a-link-default'
      }
    },
    linkWeightClass () {
      switch (this.weight) {
        case 'bold':
          return 'a-link-bold'
        default:
          return 'normal'
      }
    },
    linkActiveClass () {
      return this.active ? 'a-link-active' : ''
    }
  }
}
</script>

<style scoped lang="scss">
.a-link {
  display: inline-block;
  cursor: pointer;
  align-items: center;
  text-decoration: none;
  transition: all .3s cubic-bezier(.645, .045, .355, 1);
  text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
  user-select: none;

  &:hover{
    color: var(--font-color);
  }

  &.active {
    color: var(--primary-color);
  }

  &-default {
    color: var(--gray-color);

    &:hover, &.a-link-active {
      color: var(--primary-color);
    }
  }

  &-primary {
    color: var(--primary-color);
  }

  &-success {
    color: var(--success-color);
  }

  &-muted {
    color: var(--font-muted-color);
  }

  &-danger {
    color: var(--danger-color);
  }

  &-normal {
    font-weight: 400;
  }

  &-bold {
    font-weight: 500;
  }
}
</style>
