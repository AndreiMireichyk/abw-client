<template>
  <div>
    <div class="page" v-if="form.length">
      <h2 class="page__title">Добавить объявление</h2>
      <div class="page__content">
        <div class="page__body">
          <div v-for="attribute in form" :key="attribute.id">
            <component v-bind:is="getComponent(attribute.type)" :attribute="attribute" v-model="attribute.value"/>
          </div>
          <div>
            <component v-bind:is="getComponent('contacts')" v-model="contacts" :contacts="contacts"/>
          </div>
          <div>
            <component v-bind:is="getComponent('desc-price')"/>
          </div>
          <div>
            <component v-bind:is="getComponent('photo')"/>
          </div>
        </div>
        <div class="page__aside">
          <pre>{{ parameters }}</pre>
          <pre>{{ contacts }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import ListControl from '@/components/Advert/Form/ListControl'
import SelectControl from '@/components/Advert/Form/SelectControl'
import SwitchControl from '@/components/Advert/Form/SwitchControl'
import CheckboxControl from '@/components/Advert/Form/CheckboxControl'
import InputControl from '@/components/Advert/Form/InputControl'
import ContactControl from '@/components/Advert/Form/ContactControl'
import DescAndPriceControl from '@/components/Advert/Form/DescAndPriceControl'
import PhotoControl from '@/components/Advert/Form/PhotoControl'

export default {
  name: 'Form',
  components: {
    ListControl,
    SelectControl,
    SwitchControl,
    CheckboxControl,
    InputControl,
    ContactControl,
    DescAndPriceControl,
    PhotoControl
  },
  data () {
    return {
      form: [],
      watch: true,
      contacts: {
        country_id: null,
        region_id: null,
        city_id: null,
        phones: [],
        name: null,
        email: null
      }

    }
  },
  watch: {
    parameters () {
      this.update()
    }
  },
  computed: {
    parameters () {
      return this.form
        .filter(item => item.value)
        .map(item => {
          return {
            id: item.value.id,
            name: item.attribute
          }
        })
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
        case 'contacts':
          return 'ContactControl'
        case 'desc-price' :
          return 'DescAndPriceControl'
        case 'photo' :
          return 'PhotoControl'
      }
    },
    reloadOptions (data) {
      data.map((item, key) => {
        this.form[key].options = item.options
      })
    },
    update () {
      this.$http.post(`${this.$config.host}/api/adverts/${this.$route.params.slug}/form`, {
        params: this.parameters
      })
        .then(r => {
          this.reloadOptions(r.data)
        })
        .catch(e => {
          alert(e)
        })
    },
    fetch () {
      this.$http.get(`${this.$config.host}/api/adverts/${this.$route.params.slug}/form`)
        .then(r => {
          this.form = r.data
        })
        .catch(e => {
          alert(e)
        })
    }
  },
  created () {
    this.fetch()
  }
}
</script>

<style scoped lang="scss">
  .page {
    padding: 25px;
    max-width: 1200px;
    margin: 0 auto;

    min-height: 80vh;

    &__title {
      font-size: 44px;
      font-weight: bold;
      line-height: 1;
      margin: 0 0 40px 0;
    }

    &__content {
      display: flex;
      justify-content: space-between;
    }

    &__body {
      border-radius: 8px;
      background: #ffffff;
      flex-grow: 1;
    }

    &__aside {
      background: #ffffff;
      width: 400px;
      min-width: 400px;
      margin-left: 24px;
    }
  }
</style>
