<template>
  <div>
    <div class="page" v-if="form.length">
      <h2 class="page__title">Добавить объявление</h2>
      <div class="page__content">
        <div class="page__body">

          <div v-for="(step, index) in steps" :key="index">
            <step-section :step="step"/>
          </div>

          <div v-show="parameters.length === form.length">
            <component v-bind:is="getComponent('contacts')" v-model="contacts" :contacts="contacts"
                       @next="showOther=true"/>
          </div>
          <div v-show="parameters.length === form.length && showOther">
            <component v-bind:is="getComponent('photo')"/>
          </div>
          <div v-show="parameters.length === form.length && showOther">
            <component v-bind:is="getComponent('desc-price')"/>
          </div>
        </div>
        <div class="page__aside">
          <pre>
            {{stepsState}}
          </pre>
          <pre>
            {{parameters}}
          </pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import ContactControl from '@/components/Advert/Form/ContactControl'
import DescAndPriceControl from '@/components/Advert/Form/DescAndPriceControl'
import PhotoControl from '@/components/Advert/Form/PhotoControl'
import StepSection from '@/components/Advert/Form/Section'

export default {
  name: 'Form',
  components: {
    ContactControl,
    DescAndPriceControl,
    PhotoControl,
    StepSection
  },
  data () {
    return {
      form: [],
      stepsState: {},
      showOther: false,
      notUpdate: false,
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
    steps () {
      return this.form.reduce(function (rv, x) {
        (rv[x.step] = rv[x.step] || []).push(x)
        return rv
      }, {})
    },
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
    updateStepState (step) {
      console.log(this.stepsState[step.index])
      this.stepsState[step.index] = step.valid
      console.log(this.stepsState[step.index])
      console.log(this.stepsState)
    },
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
    async reloadOptions (data) {
      this.notUpdate = true

      await data.map((item, key) => {
        if (item.options) {
          this.form[key].value = item.value
          this.form[key].options = item.options

          const i = item.options.filter(option => {
            if (item.value) {
              return option.id === item.value.id
            }
            return false
          })
          if (!i.length) this.form[key].value = null
        }
      })

      this.notUpdate = false
    },

    update () {
      if (this.notUpdate) return false

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

      width: 400px;
      min-width: 400px;
      margin-left: 24px;
    }
  }
</style>
