<template>
  <div class="filter__body">
    <div class="filter__item col-6">
      Состояние
    </div>

    <div class="filter__item col-6">
      Сохранить поиск
    </div>

    <div class="filter__item  col-4">
      <select-control :filter="getByCode('car_marka')" v-model="getByCode('car_marka').value"/>
    </div>
    <div class="filter__item  col-4">
      <select-control :filter="getByCode('car_model')" v-model="getByCode('car_model').value"/>
    </div>
    <div class="filter__item  col-4">
      <select-control :filter="getByCode('car_generation')" v-model="getByCode('car_generation').value"/>
    </div>
    <div class="filter__item  col-4">
      <select-control :filter="getByCode('year')" v-model="getByCode('year').value"/>
    </div>
    <div class="filter__item  col-4">
      <select-control :filter="getByCode('car_engine')" v-model="getByCode('car_engine').value"/>
    </div>
    <div class="filter__item  col-4">
      <select-control :filter="getByCode('car_transmission')" v-model="getByCode('car_transmission').value"/>
    </div>
    <div class="filter__item  col-4">
      <select-control :filter="getByCode('car_body')" v-model="getByCode('car_body').value"/>
    </div>
    <div class="filter__item  col-4">
      <select-control :filter="getByCode('car_engine_volume')" v-model="getByCode('car_engine_volume').value"/>
    </div>

    <!--<div class="filter__item" v-for="filter in filters" :key="filter.id">
      <select v-model="filter.value">
        <option disabled value="null">{{ filter.label }}</option>
        <option v-for="option in filter.options" :value="option.code" :key="option.code">{{ option.title }}</option>
      </select>
    </div>-->

  </div>
</template>

<script>

import SelectControl from '@/components/Advert/List/Filter/Control/SelectControl'

export default {
  name: 'CarFilter',
  props: ['filters'],
  components: { SelectControl },
  methods: {
    getByCode (code) {
      return this.filters.filter(item => item.attribute === code)[0]
    }
  }
}
</script>
