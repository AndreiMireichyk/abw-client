<template>
  <div class="a-input-affix-wrapper" v-if="hasSlotPrefix || hasSlotPostfix">
    <span  class="a-input-prefix" v-if="hasSlotPostfix">
          <slot name="prefix"></slot>
    </span>
    <input :type="inputType"
           @input="$emit('input', value)"
           v-model="value" :class="inputClass"
           :placeholder="placeholder"
           :disabled="disabled"
    >
    <span  class="a-input-postfix" v-if="hasSlotPostfix">
          <slot name="postfix"></slot>
    </span>

  </div>
  <input :type="inputType"
         @input="$emit('input', value)"
         v-model="value" :class="inputClass"
         :placeholder="placeholder"
         :disabled="disabled"
         v-else
  >
</template>

<script>
export default {
  name: 'AInput',
  props: {
    type: {
      type: String,
      default: 'text'
    },
    size: {
      type: String,
      default: 'normal'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      value: null
    }
  },
  computed: {
    inputType () {
      switch (this.type) {
        case 'password':
          return 'password'
        case 'number':
          return 'number'
        case 'email':
          return 'email'
        default :
          return 'text'
      }
    },
    inputClass () {
      return `a-input ${this.inputSizeClass}`
    },
    inputSizeClass () {
      switch (this.size) {
        case 'small':
          return 'a-input-sm'
        case 'large':
          return 'a-input-lg'
        default:
          return ''
      }
    },
    hasSlotPrefix () {
      return this.$slots.prefix
    },
    hasSlotPostfix () {
      return this.$slots.postfix
    }
  }
}
</script>

<style scoped lang="scss">

.a-input-affix-wrapper {
  position: relative;
}

.a-input-affix-wrapper .a-input:not(:first-child){
  padding-left: 30px;
}
.a-input-affix-wrapper .a-input:not(:last-child){
  padding-right: 30px;
}

.a-input {
  display: block;
  box-sizing: border-box;
  width: 100%;
  padding: 8px 12px;
  border-radius: var(--input-radius);
  border: 1px solid var(--light-gray-color);
  background-color: var(--white-color);
  outline: none;
  appearance: none;
  color: var(--gray-color);
  transition: all .3s ease-in-out;

  &-postfix, &-prefix{
    position: absolute;
    top: 50%;
    z-index: 2;
    display: flex;
    align-items: center;
    color: rgba(0,0,0,.65);
    line-height: 0;
    transform: translateY(-50%);
  }
  &-prefix{
    left: 12px;
  }
  &-postfix{
    right: 12px;
  }

  &::placeholder {
    color: var(--font-muted-color);
  }

  &:disabled {
    cursor: not-allowed;
    background-color: #f6f6f6;
  }

  &:focus {
    border: 1px solid var(--primary-color);
    background-color: #f6f6f6;
  }

  &-sm {
    padding: 6px 10px;
    border-radius: var(--input-sm-radius);
  }

  &-lg {
    padding: 10px 14px;
    border-radius: var(--input-lg-radius);
  }
}
</style>
