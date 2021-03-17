<template>
  <div class="filter__body">
    <div class="filter__item col-6">
      <switch-control :filter="getByCode('car_condition')" v-model="getByCode('car_marka').value"/>
    </div>

    <div class="filter__item filter__item--save col-6">
      <div class="filter__actions">
        <div class="filter__action">
          <a href="javascript:void(0)" class="filter__btn-save" @click="$emit('saveFilter')">Сохранить поиск</a>
        </div>
        <div class="filter__action">
          <a class="filter__btn-clear" href="javascript:void(0)">История</a>
        </div>
      </div>

    </div>

    <div class="filter__item  col-4" v-if="getByCode('car_marka')">
      <select-control :filter="getByCode('car_marka')" v-model="getByCode('car_marka').value"/>
    </div>
    <div class="filter__item  col-4" v-if="getByCode('car_model')">
      <select-control :filter="getByCode('car_model')" v-model="getByCode('car_model').value"/>
    </div>
    <div class="filter__item  col-4" v-if="getByCode('car_generation')">
      <select-control :filter="getByCode('car_generation')" v-model="getByCode('car_generation').value"/>
    </div>
<!--    <div class="filter__item  col-2" v-if="getByCode('year')">
      <select-control :filter="getByCode('year')" v-model="getByCode('year').value"/>
    </div>-->
    <div class="filter__item  col-2" v-if="getByCode('year')">
      <select-range-control :filter="getByCode('year')" v-model="getByCode('year').value"/>
    </div>

    <div class="filter__item  col-2" v-if="getByCode('price')">
      <select-range-control :filter="getByCode('price')" reverse="true"  v-model="getByCode('price').value"/>
    </div>
    <div class="filter__item  col-2" v-if="getByCode('car_engine_volume')">
      <select-range-control :filter="getByCode('car_engine_volume')" :reverse="true" v-model="getByCode('car_engine_volume').value"/>
    </div>
    <div class="filter__item  col-2" v-if="getByCode('car_engine')">
      <select-control :filter="getByCode('car_engine')" v-model="getByCode('car_engine').value"/>
    </div>
    <div class="filter__item  col-2" v-if="getByCode('car_transmission')">
      <select-control :filter="getByCode('car_transmission')" v-model="getByCode('car_transmission').value"/>
    </div>
    <div class="filter__item  col-2" v-if="getByCode('foto')">
      <select-control :filter="getByCode('foto')" v-model="getByCode('foto').value"/>
    </div>
    <div class="filter__item  col-2" v-if="getByCode('obmen')">
      <select-control :filter="getByCode('obmen')" v-model="getByCode('obmen').value"/>
    </div>

    <div class="filter__collapse" v-show="showAllFilters">
      <div class="filter__item  col-4" v-if="getByCode('car_body')">
        <select-control :filter="getByCode('car_body')" v-model="getByCode('car_body').value"/>
      </div>
      <div class="filter__item  col-4" v-if="getByCode('car_drive')">
        <select-control :filter="getByCode('car_drive')" v-model="getByCode('car_drive').value"/>
      </div>
    </div>
  </div>
</template>

<script>

import SelectControl from '@/components/Classified/Listing/Filter/Components/SelectControl'
import SwitchControl from '@/components/Classified/Listing/Filter/Components/SwitchControl'
import SelectRangeControl from '@/components/Classified/Listing/Filter/Components/SelectRangeControl'

export default {
  name: 'Car',
  props: ['filters', 'showAllFilters'],
  components: {
    SelectControl,
    SelectRangeControl,
    SwitchControl
  },
  methods: {
    getByCode (code) {
      return this.filters.filter(item => item.attribute === code)[0] || false
    }
  }
}
</script>
