<template>
  <vue-tel-input :class="inputClass" v-model="internalValue" v-bind="config"/>
</template>

<script>
import { VueTelInput } from 'vue-tel-input'

export default {
  name: 'ATelInput',
  props: {
    value: {},
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
  components: {
    VueTelInput
  },
  data () {
    return {
      config: {
        mode: 'international',
        placeholder: 'Введите телефон',
        required: false,
        enabledCountryCode: false,
        onlyCountries: ['BY', 'RU']
      }
    }
  },
  computed: {
    internalValue: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    },
    inputClass () {
      return `a-tel-input ${this.inputSizeClass}`
    },
    inputSizeClass () {
      switch (this.size) {
        case 'small':
          return 'a-tel-input-sm'
        case 'large':
          return 'a-tel-input-lg'
        default:
          return ''
      }
    }
  }
}
</script>

<style lang="scss">
.a-tel-input {
  box-sizing: border-box;
  width: 100%;
  position: relative;
  border: none !important;

  &:focus-within {
    box-shadow: none !important;
  }

  input {
    display: block;
    box-sizing: border-box;
    width: 100%;
    padding: 8px 12px 8px 60px;
    border-radius: var(--input-radius);
    border: 1px solid var(--light-gray-color);
    background-color: var(--white-color);
    outline: none;
    appearance: none;
    color: var(--gray-color);
    transition: all .3s ease-in-out;

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
  }

  &-sm {
    padding: 6px 10px;
    border-radius: var(--input-sm-radius);
  }

  &-lg {
    padding: 10px 14px;
    border-radius: var(--input-lg-radius);
  }

  .vti__dropdown {
    position: absolute;
    top: 0;
    left: 0;
    padding: 0;
    margin: 8px 0 8px 12px;
    background: none !important;
    border-right: 1px solid rgba(0, 0, 0, 0.18);

    &:focus {
      outline: none;
    }
  }

  .vti__selection {
    height: 15px;
    padding-right: 6px;
  }

  .vti__flag {
    margin-left: 0;
  }
}
</style>
