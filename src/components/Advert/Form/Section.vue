<template>
  <div class="section">
    <ValidationObserver v-slot="{ passes }" ref="vee">
      <form ref="form" @submit.prevent="passes(validate)" >
        <div class="section__item" v-for="attribute in step" :key="attribute.id">
          <ValidationProvider :name="attribute.label" rules="required" v-slot="props">
            <component v-bind:is="getComponent(attribute.type)" :attribute="attribute" :vee="props" v-model="attribute.value"/>
          </ValidationProvider>
        </div>
        <div class="section__footer" >
          <button class="section__btn" type="submit" ref="submit">Далее</button>
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
  props: ['stepIndex', 'step', 'stepState'],
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
  name: 'Section',
  data () {
    return {}
  },
  computed: {
    requireAttributes () {
      return this.step.filter(item => item.required)
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
    updateStep () {
      if (this.step.length === 1) this.$refs.form.dispatchEvent(new Event('submit'))
    },
    validate () {
      this.$refs.vee.validate().then(success => {
        this.stepState = success
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .section {
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
