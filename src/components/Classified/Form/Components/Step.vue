<template>
  <div class="step">
    <a class="step__edit" v-if="stepState.complete" @click="$emit('onComplete', stepIndex, false)"></a>
    <ValidationObserver v-slot="{ handleSubmit  }" ref="vee">
      <form @submit.prevent="handleSubmit (validate)">
        <div class="step__item" v-for="attribute in step" :key="attribute.id">

          <ValidationProvider :name="attribute.label" rules="required" v-slot="props">
            <component
              v-model="attribute.value"
              :is="getComponent(attribute.type)"
              :attribute="attribute"
              :stepState="stepState"
              :vee="props"
              @input="autoSwitch"
            />
          </ValidationProvider>
        </div>
        <div class="step__footer" v-if="step.length-1 && !stepState.complete">
          <button class="step__btn" type="submit">Далее</button>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>

import ListControl from '@/components/Classified/Form/Components/ListControl'
import SelectControl from '@/components/Classified/Form/Components/SelectControl'
import SwitchControl from '@/components/Classified/Form/Components/SwitchControl'
import CheckboxControl from '@/components/Classified/Form/Components/CheckboxControl'
import InputControl from '@/components/Classified/Form/Components/InputControl'
import StringControl from '@/components/Classified/Form/Components/StringControl'
import TextControl from '@/components/Classified/Form/Components/TextControl'
import IntegerControl from '@/components/Classified/Form/Components/IntegerControl'

export default {
  props: ['stepIndex', 'step', 'stepState', 'currentStep'],
  components: {
    ListControl,
    SelectControl,
    SwitchControl,
    CheckboxControl,
    InputControl,
    StringControl,
    TextControl,
    IntegerControl
  },
  name: 'step',
  watch: {
    hasValidState () {
      return this.hasValidState ? this.$emit('onComplete', this.stepIndex, true) : this.$emit('onComplete', this.stepIndex, false)
    }
  },
  computed: {
    hasValidState () {
      return !this.step.filter(x => !x.value).length
    },
    hasInvalidState () {
      return this.step.filter(x => !x.value).length
    }
  },
  methods: {
    getComponent (type) {
      switch (type) {
        case 'select':
          return 'SelectControl'
        case 'switch':
          return 'SwitchControl'
        case 'list':
          return 'ListControl'
        case 'checkbox':
          return 'CheckboxControl'
        case 'string':
          return 'StringControl'
        case 'text':
          return 'TextControl'
        case 'integer':
          return 'IntegerControl'
      }
    },
    autoSwitch (value) {
      if (value === null) {
        this.$emit('onComplete', this.stepIndex, false)
        return
      }
      if (this.step.length === 1) {
        this.validate()
      }
    },
    validate () {
      setTimeout(() => {
        this.$refs.vee.validate().then(success => {
          this.valid = success
          this.$emit('onComplete', this.stepIndex, true)
        })
      }, 100)
    }
  }
}
</script>

<style scoped lang="scss">
.step {
  position: relative;
  padding: 14px 24px;
  border-bottom: 1px solid #ebebeb;

  &__edit {
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  &__footer {
    display: flex;
    align-items: center;
    padding: 16px 24px 0;
    border-top: 1px solid #ebebeb;
    margin: 0 -24px;
  }

  &__btn {
    display: inline-block;
    cursor: pointer;
    box-shadow: 0 0 0 1px var(--primary-color) inset, 0 1px 0 rgba(24, 26, 27, 0.08);
    padding: 8px 12px;
    border-radius: 4px;
    transition: all .3s;
    background: var(--primary-color);
    color: var(--white-color);
    text-decoration: none;
    outline: 0;
    appearance: none;
    border: 0;

    &:hover {
      background: transparent;
      box-shadow: 0 0 0 1px #d3d9df inset, 0 1px 0 rgba(24, 26, 27, 0.08);
      color: var(--font-color);
    }
  }

}
</style>
