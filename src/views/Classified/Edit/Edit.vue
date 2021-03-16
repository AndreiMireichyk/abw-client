<template>
  <div>

    <div class="page" v-if="form.length">

      <h1 class="page__title">Изменить объявление #{{ id }}</h1>
      <div class="page__content">
        <div class="page__body" @click.ctrl.shift="showLog = !showLog">

          <div v-for="(step, index) in steps" :key="index">
            <step-section
              class="page__section"
              :step="step"
              v-show="showSteps(index-1)"
              :stepState="stepsState[index-1]"
              :stepIndex="index-1"
              @onComplete="onCompleteStep"
            />
          </div>

          <div v-show="stepsSuccess">
            <step-contact v-model="contacts" :contacts="contacts" @next="showOther=true"/>
          </div>

          <div ref="photo" v-show="stepsSuccess  && showOther">
            <image-control v-model="images" :images="images"/>
          </div>

          <div v-show="stepsSuccess  && showOther">
            <step-description v-model="description" :description="description"/>
          </div>

          <div v-show="stepsSuccess  && showOther">
            <a class="page__btn" @click="store">Изменить</a>
          </div>
        </div>
        <div class="page__aside">
          <div v-if="showLog">
            <pre>
              {{ stepsState }}
              {{ parameters }}
           </pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import StepContact from '@/components/Classified/Form/Components/StepContact'
import StepDescription from '@/components/Classified/Form/Components/StepDescription'
import ImageControl from '@/components/Classified/Form/Components/ImageControl'
import StepSection from '@/components/Classified/Form/Components/Step'

export default {
  name: 'Edit',
  props: {
    slug: {
      type: [String, Number],
      required: true
    },
    id: {
      type: String,
      required: true
    }
  },
  components: {
    StepContact,
    StepDescription,
    ImageControl,
    StepSection
  },
  data () {
    return {
      form: [],
      stepsState: [],
      showOther: true,
      notUpdate: false,
      showLog: false,
      contacts: {
        country: null,
        region: null,
        city: null,
        phones: [],
        name: null,
        email: null
      },
      images: [],
      description: {
        price: null,
        currency: 'byn',
        text: null
      }
    }
  },
  watch: {
    showOther () {
      setTimeout(() => {
        this.$refs.photo.scrollIntoView({
          block: 'start',
          behavior: 'smooth'
        })
      }, 50)
    },
    attributes () {
      this.update()
    },
    steps () {
      if (this.stepsState.length) return false

      Object.keys(this.steps).map((s) => {
        this.stepsState.push({
          complete: true,
          editable: true
        })
      })
    }
  },
  computed: {
    stepsSuccess () {
      return !this.stepsState.filter(i => i.complete === false).length
    },
    stepsLength () {
      return Object.keys(this.steps).length
    },
    steps () {
      return this.form
        .filter(item => item.step)
        .reduce(function (rv, x) {
          (rv[x.step] = rv[x.step] || []).push(x)
          return rv
        }, {})
    },
    attributes () {
      const attributes = {}

      this.form
        .filter(item => item.value)
        .map(item => {
          if (!['string', 'integer', 'text'].includes(item.type)) {
            attributes[item.attribute] = item.value
          }
        })

      return attributes
    },
    fields () {
      const fields = {}

      this.form
        .filter(item => item.value)
        .map(item => {
          if (['string', 'integer', 'text'].includes(item.type)) {
            fields[item.attribute] = item.value
          }
        })
        .filter(item => item)

      return fields
    },
    parameters () {
      const other = {
        images: this.images,
        name: this.contacts.name,
        email: this.contacts.email,
        country: this.contacts.country,
        region: this.contacts.region,
        city: this.contacts.city,
        phones: this.contacts.phones,
        price: this.description.price,
        currency: this.description.currency,
        description: this.description.text
      }

      return Object.assign(this.attributes, this.fields, other)
    }
  },
  methods: {
    onCompleteStep (index, state) {
      this.stepsState[index].complete = state
    },
    showSteps (index) {
      index = parseInt(index)

      if (index === 0) return true

      return !this.stepsState.slice(0, index).filter(i => i.complete === false).length
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
          this.$message.error(e)
        })
    },
    fetch () {
      this.$http.get(`${this.$config.host}/api/adverts/${this.slug}/form/${this.id}`)
        .then(r => {
          this.form = r.data
          this.setDefault()
        })
        .catch(e => {
          this.$message.error(e)
        })
    },
    store () {
      this.$http.post(`${this.$config.host}/api/adverts/${this.slug}/update/${this.id}`, {
        params: this.parameters
      })
        .then(r => {
          this.$router.push({
            name: 'ad-cat-list',
            params: { slug: this.slug }
          })
        })
        .catch(e => {
          this.$message.error(e.response.data.message)
        })
    },
    setDefault () {
      this.images = this.attributes.images

      this.contacts.country = this.attributes.country
      this.contacts.region = this.attributes.region
      this.contacts.city = this.attributes.city
      this.contacts.phones = this.attributes.phones
      this.contacts.name = this.attributes.name
      this.contacts.email = this.attributes.email

      this.description.price = this.attributes.price
      this.description.currency = this.attributes.currency
      this.description.text = this.attributes.description
    },
    async reloadOptions (data) {
      this.notUpdate = true

      await data.map((item, key) => {
        if (item.options) {
          this.form[key].value = item.value
          this.form[key].options = item.options

          const i = item.options.filter(option => {
            if (item.value && Array.isArray(item.value)) {
              return item.value.includes(option.id)
            } else if (item.value) {
              return option.id === item.value
            }
            return false
          })

          if (!i.length) {
            this.form[key].value = Array.isArray(this.form[key].value) ? [] : null
          }
        }
      })

      this.notUpdate = false
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
    max-width: 776px;
    border-radius: 8px;
    background: #ffffff;
    flex-grow: 1;
  }

  &__aside {
    width: 400px;
    min-width: 400px;
    margin-left: 24px;
  }

  &__section {
    transition: height .3s;
  }

  &__btn {
    margin: 16px 24px;
    display: inline-block;
    cursor: pointer;
    box-shadow: 0 0 0 1px var(--primary-color) inset, 0 1px 0 rgba(24, 26, 27, 0.08);
    background: var(--primary-color);
    color: #ffffff;
    padding: 8px 12px;
    border-radius: 4px;
    transition: all .3s;

    &:hover {
      background: transparent;
      box-shadow: 0 0 0 1px #d3d9df inset, 0 1px 0 rgba(24, 26, 27, 0.08);
      color: var(--font-color);
    }
  }
}
</style>
