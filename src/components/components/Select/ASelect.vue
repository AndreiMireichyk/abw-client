<template>
  <a-dropdown class="a-select" @onToggleList="onToggleList">

    <template #default>
      <div class="a-select-affix-wrapper">
        <span class="a-input-prefix" v-if="hasSlotPrefix">
          <slot name="prefix"></slot>
        </span>

        <input type="text" class="a-select-input" :value="selectedValue" readonly :placeholder="placeholder"
               :disabled="disabled">
        <span class="a-select-postfix" :class="{open : open}" v-if="hasSlotPostfix">
          <slot name="postfix"></slot>
      </span>
        <span class="a-select-postfix" :class="{open : open}" v-else>

          <a-icon type="chevron-down"/>
      </span>
      </div>
    </template>

    <template #list>
      <label class="a-select-item" @click.stop=""
             :class="{active: internalValue === item[choiceValue]}"
             v-for="(item, index) in data"
             :key="index">
        <input type="radio" v-model="internalValue" :value="item[choiceValue]">
        {{ item[choiceTitle] }}
      </label>
    </template>
  </a-dropdown>
</template>

<script>

import ADropdown from '@/components/components/Dropdown/ADropdown'
import AIcon from '@/components/components/Icon/AIcon'

export default {
  props: {
    value: {},
    type: {
      type: String,
      default: 'text'
    },
    data: {
      type: Array,
      default: () => []
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
      type: String
    },
    choiceValue: {
      type: String,
      default: 'id'
    },
    choiceTitle: {
      type: String,
      default: 'title'
    }
  },
  name: 'ASelect',
  components: {
    ADropdown,
    AIcon
  },
  data () {
    return {
      searchValue: null,
      open: false
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
    selectClass () {
      return `a-select ${this.inputSizeClass}`
    },
    inputSizeClass () {
      switch (this.size) {
        case 'small':
          return 'a-select-sm'
        case 'large':
          return 'a-select-lg'
        default:
          return ''
      }
    },
    hasSlotPrefix () {
      return this.$slots.prefix
    },
    hasSlotPostfix () {
      return this.$slots.postfix
    },
    selectedValue () {
      const values = this.data.filter(i => i[this.choiceValue] === this.internalValue)

      return values.length ? values[0][this.choiceTitle] : null
    }
  },
  methods: {
    onToggleList (state) {
      this.open = state
    }
  }
}
</script>

<style scoped lang="scss">
.a-select-affix-wrapper {
  position: relative;
}

.a-select-affix-wrapper .a-input:not(:first-child) {
  padding-left: 30px;
}

.a-select-affix-wrapper .a-input:not(:last-child) {
  padding-right: 30px;
}

.a-select {

  &-input {
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

    &[readonly] {
      cursor: pointer;
    }

    &:disabled {
      cursor: not-allowed;
      background-color: #f6f6f6;
    }
  }

  &-list {
    top: 34px;
    z-index: 3;
  }

  &-item {
    display: flex;
    align-items: center;
    padding: 8px 12px;
    color: var(--gray-color);
    cursor: pointer;

    &:hover, &.active {
      background: var(--primary-color);
      color: var(--white-color);
    }

    input {
      display: none;
    }
  }

  &-postfix, &-prefix {
    position: absolute;
    top: 50%;
    z-index: 1;
    display: flex;
    align-items: center;
    color: rgba(0, 0, 0, .65);
    line-height: 0;
    transform: translateY(-50%);

    text-decoration: none;
  }

  &-prefix {
    left: 12px;
  }

  &-postfix {
    right: 12px;
  }

  &-postfix.open {
    transform: rotate(180deg) translateY(50%);
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
