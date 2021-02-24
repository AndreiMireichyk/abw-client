<template>
  <button :class="btnClass" :disabled="disabled">
    <a-icon v-if="loading" type="loader" :spin="true"/>
    <span v-if="loading" class="a-btn-loading-text">Загрузка</span>
    <slot v-else></slot>
  </button>
</template>

<script>
import AIcon from '@/components/components/Icon/AIcon'

export default {
  props: {
    type: {
      type: String,
      default: 'primary'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'normal'
    },
    block: {
      type: Boolean,
      default: false
    }
  },
  name: 'AButton',
  components: {
    AIcon
  },
  computed: {
    btnClass () {
      return `a-btn ${this.btnClassType} ${this.btnClassBlock} ${this.btnClassSize} ${this.btnClassLoading}`
    },
    btnClassType () {
      switch (this.type) {
        case 'primary':
          return 'a-btn-primary'
        case 'success':
          return 'a-btn-success'
        case 'danger':
          return 'a-btn-danger'
        case 'default':
          return 'a-btn-default'
        default:
          return 'a-btn-default'
      }
    },

    btnClassSize () {
      switch (this.size) {
        case 'small':
          return 'a-btn-xs'
        case 'large':
          return 'a-btn-lg'
        default:
          return ''
      }
    },
    btnClassLoading () {
      return this.loading ? 'a-btn-loading' : ''
    },
    btnClassBlock () {
      return this.block ? 'a-btn-block' : ''
    }

  }
}
</script>

<style scoped lang="scss">
.a-btn {
  display: flex;
  align-items: center;

  height: 30px;
  padding: 0 15px;
  box-sizing: border-box;
  border: 1px solid;
  border-radius: var(--input-sm-radius);

  font-size: 14px;
  line-height: 1;
  text-decoration: none;
  appearance: none;
  outline: none;
  cursor: pointer;

  transition: all .3s cubic-bezier(.645, .045, .355, 1);
  text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
  user-select: none;

  &-default {
    background: var(--white-color);
    color: var(--gray-color);
    border-color: var(--light-gray-color);
  }

  &-primary {
    background: var(--primary-color);
    border-color: var(--primary-color);
    color: var(--white-color);
  }

  &-success{
    background: var(--success-color);
    border-color: var(--success-color);
    color: var(--white-color);
  }

  &-danger {
    background: var(--danger-color);
    border-color: var(--danger-color);
    color: var(--white-color);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &-block {
    width: 100%;
    display: block;
  }

  &-xs {
    height: 24px;
  }

  &-lg {
    height: 38px;
  }

  &-loading {
    opacity: 0.6;
    pointer-events: none;
  }

  &-loading-text {
    margin-left: 4px;
  }

}
</style>
