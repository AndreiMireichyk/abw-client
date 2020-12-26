<template>
  <div>
    <div v-for="attribute in step" :key="attribute.id">
      <component v-bind:is="getComponent(attribute.type)" :attribute="attribute" v-model="attribute.value"/>
    </div>
  </div>
</template>

<script>

import ListControl from '@/components/Advert/Form/ListControl'
import SelectControl from '@/components/Advert/Form/SelectControl'
import SwitchControl from '@/components/Advert/Form/SwitchControl'
import CheckboxControl from '@/components/Advert/Form/CheckboxControl'
import InputControl from '@/components/Advert/Form/InputControl'

export default {
  props: ['step'],
  components: {
    ListControl,
    SelectControl,
    SwitchControl,
    CheckboxControl,
    InputControl
  },
  name: 'Section',
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
        case 'contacts':
          return 'ContactControl'
        case 'desc-price' :
          return 'DescAndPriceControl'
        case 'photo' :
          return 'PhotoControl'
      }
    }
  }
}
</script>

<style scoped>

</style>
