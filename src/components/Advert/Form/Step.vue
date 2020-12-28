<template>
  <div class="step">
    <ValidationObserver v-slot="{ handleSubmit  }" ref="vee">
      <form @submit.prevent="handleSubmit (validate)">
        <div class="step__item" v-for="attribute in step" :key="attribute.id">
          <ValidationProvider :name="attribute.label" rules="required" v-slot="props">
            <component
              v-model="attribute.value"
              :is="getComponent(attribute.type)"
              :attribute="attribute"
              :vee="props"
              @input="autoSwitch"
            />
          </ValidationProvider>
        </div>
        <div class="step__footer" v-if="step.length-1 && stepIndex == currentStep">
          <button class="step__btn" type="submit">Далее</button>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>

import ListControl from '@/components/Advert/Form/ListControl'
import SelectControl from '@/components/Advert/Form/SelectControl'
import SwitchControl from '@/components/Advert/Form/SwitchControl'
import CheckboxControl from '@/components/Advert/Form/CheckboxControl'
import InputControl from '@/components/Advert/Form/InputControl'
import StringControl from '@/components/Advert/Form/StringControl'
import TextControl from '@/components/Advert/Form/TextControl'
import IntegerControl from '@/components/Advert/Form/IntegerControl'

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
    autoSwitch () {
      if (this.step.length === 1) {
        this.validate()
      }
    },
    validate () {
      setTimeout(() => {
        this.$refs.vee.validate().then(success => {
          this.valid = success
          this.$emit('state', {
            index: parseInt(this.stepIndex),
            valid: success
          })
        })
      }, 100)
    }
  }
}
</script>

<style scoped lang="scss">
.step {
  padding: 14px 24px;
  border-bottom: 1px solid #ebebeb;

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
