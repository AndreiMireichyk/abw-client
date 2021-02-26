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
    },
    weight: {
      type: String,
      default: 'normal'
    },
    elStyle: {
      type: String,
      default: 'btn'
    }
  },
  name: 'AButton',
  components: {
    AIcon
  },
  computed: {
    btnClass () {
      return `${this.btnBaseClass} ${this.btnClassType} ${this.btnClassBlock} ${this.btnClassSize} ${this.btnClassLoading} ${this.btnWeightClass}`
    },
    btnBaseClass () {
      switch (this.elStyle) {
        case 'link': return 'a-btn-link'
        default: return 'a-btn'
      }
    },
    btnClassType () {
      switch (this.type) {
        case 'primary':
          return `${this.btnBaseClass}-primary`
        case 'success':
          return `${this.btnBaseClass}-success`
        case 'danger':
          return `${this.btnBaseClass}-danger`
        case 'default':
          return `${this.btnBaseClass}-default`
        default:
          return `${this.btnBaseClass}-default`
      }
    },

    btnClassSize () {
      switch (this.size) {
        case 'small':
          return `${this.btnBaseClass}-xs`
        case 'large':
          return `${this.btnBaseClass}-lg`
        default:
          return ''
      }
    },
    btnClassLoading () {
      return this.loading ? `${this.btnBaseClass}-loading` : ''
    },
    btnClassBlock () {
      return this.block ? `${this.btnBaseClass}-block` : ''
    },
    btnWeightClass () {
      switch (this.weight) {
        case 'bold':
          return `${this.btnBaseClass}-bold`
        default:
          return `${this.btnBaseClass}-normal`
      }
    }

  }
}
</script>

<style scoped lang="scss">
.a-btn-link {
  display: flex;
  align-items: center;

  box-sizing: border-box;
  border: none;
  border-radius: 0;
  padding: 0;
  background: transparent;

  font-family: var(--font);
  font-size: 14px !important;
  line-height: 1;
  text-decoration: none;
  appearance: none;
  outline: none;
  cursor: pointer;

  transition: all .3s cubic-bezier(.645, .045, .355, 1);
  text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
  user-select: none;

  &:hover {
    color: var(--font-color);
  }

  &-default {
    color: var(--gray-color);
  }

  &-primary {
    color: var(--primary-color);
  }

  &-success {
    color: var(--success-color);
  }

  &-danger {
    color: var(--danger-color);
  }
}

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

  &-success {
    background: var(--success-color);
    border-color: var(--success-color);
    color: var(--white-color);
  }

  &-danger {
    background: var(--danger-color);
    border-color: var(--danger-color);
    color: var(--white-color);
  }
}

.a-btn, .a-btn-link {
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

  &-normal {
    font-weight: 400;
  }

  &-bold {
    font-weight: 500;
  }
}
</style>
