<template>
  <div>
    <div class="page" v-if="form.length">
      <h2 class="page__title">Добавить объявление</h2>
      <div class="page__content">
        <div class="page__body" @click.ctrl.shift="showLog = !showLog">

          <div v-for="(step, index) in steps" :key="index">
            <step-section
              v-show="currentStep >= index"
              :step="step"
              :currentStep="currentStep"
              :stepIndex="index"
              @state="updateStepState"/>
          </div>

          <div v-show="stepsSuccess">
            <step-contact v-model="contacts" :contacts="contacts" @next="showOther=true"/>
          </div>

          <div ref="photo" v-show="stepsSuccess  && showOther">
            <image-control v-model="images" :images="images"/>
          </div>

          <div v-show="stepsSuccess  && showOther">
            <component :is="getComponent('desc-price')"/>
          </div>
        </div>
        <div class="page__aside">
          <div v-if="showLog">
            <div>
              шаг = {{ currentStep }}
            </div>
            <hr>
            <div>
              Шаг Стейп
              <pre>
             {{ stateSteps }}
          </pre>
            </div>
            <hr>
            <div>
              Контакты
              <pre>
             {{ contacts }}
          </pre>
            </div>
            <hr>
            <div>
              Фотографии
              <pre>
             {{ images }}
          </pre>
            </div>
            <hr>
            <div>
              Цена описание
              <pre>
             {{ images }}
          </pre>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>

import StepContact from '@/components/Advert/Form/StepContact'
import DescAndPriceControl from '@/components/Advert/Form/DescAndPriceControl'
import ImageControl from '@/components/Advert/Form/ImageControl'
import StepSection from '@/components/Advert/Form/Step'

export default {
  name: 'Form',
  components: {
    StepContact,
    DescAndPriceControl,
    ImageControl,
    StepSection
  },
  data () {
    return {
      form: [],
      currentStep: 1,
      stateSteps: [],
      showOther: false,
      notUpdate: false,
      showLog: false,
      contacts: {
        country_id: null,
        region_id: null,
        city_id: null,
        phones: [],
        name: null,
        email: null
      },
      images: [],
      descAndPrice: {
        description: null
      }
    }
  },
  watch: {
    contacts () {
      this.showOther = false
    },
    showOther () {
      setTimeout(() => {
        this.$refs.photo.scrollIntoView({
          block: 'start',
          behavior: 'smooth'
        })
      }, 50)
    },
    parameters () {
      this.update()
    }
  },
  computed: {
    stepsSuccess () {
      return this.currentStep > this.stepsLength
    },
    stepsLength () {
      return Object.keys(this.steps).length
    },
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
          if (['string', 'integer', 'text'].includes(item.type)) {
            return {
              id: item.value,
              name: item.attribute
            }
          } else {
            return {
              id: item.value.id,
              name: item.attribute
            }
          }
        })
    }
  },
  methods: {
    updateStepState (step) {
      this.stateSteps.splice(step.index, 1, step.valid)

      if (step.valid) {
        this.currentStep = step.index + 1
      } else {
        this.currentStep = step.index
      }
    },
    getComponent (type) {
      switch (type) {
        case 'desc-price' :
          return 'DescAndPriceControl'
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
    align-items: flex-start;
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
