<template>
  <page-content class="personal">
    <template #title>
      Персональные данные
    </template>
    <template #body>
      <ValidationObserver ref="form" v-slot="s" :key="1">
        <form id="form" @submit.prevent="s.passes(submit)">

          <ValidationProvider name="photo">
            <a-form-item>
              <photo-control/>
            </a-form-item>
          </ValidationProvider>

          <a-form-divider>Личные данные</a-form-divider>

          <ValidationProvider v-slot="{errors}" rules="required" name="lastName">
            <a-form-item label="Фамилия" :errors="errors">
              <a-input v-model="profile.lastName" placeholder="Ваша фамилия"/>
            </a-form-item>
          </ValidationProvider>

          <ValidationProvider v-slot="{errors}" rules="required" name="firstName">
            <a-form-item label="Имя" :errors="errors">
              <a-input v-model="profile.firstName" placeholder="Ваше Имя"/>
            </a-form-item>
          </ValidationProvider>

          <ValidationProvider v-slot="{errors}" rules="required" name="middleName">
            <a-form-item label="Отчество" :errors="errors">
              <a-input v-model="profile.middleName" placeholder="Ваше отчество"/>
            </a-form-item>
          </ValidationProvider>

          <a-form-divider>Контакты</a-form-divider>

          <ValidationProvider v-slot="{errors}" name="phones">
            <a-form-item label="Телефоны" :errors="errors">
              <a-repeater :data="profile.phones" @remove="removePhone" @add="addPhone">
                <template #default="{data, index}">
                  <a-tel-input v-model="data[index]" placeholder="Введите email"/>
                </template>
              </a-repeater>
            </a-form-item>
          </ValidationProvider>

          <ValidationProvider v-slot="{errors}" name="emails">
            <a-form-item label="Email" :errors="errors">
              <a-repeater :data="profile.emails" @remove="removeEmail" @add="addEmail">
                <template #default="{data, index}">
                  <a-input type="email" v-model="data[index]" placeholder="Введите email"/>
                </template>
              </a-repeater>
            </a-form-item>
          </ValidationProvider>

          <a-form-divider>Адрес</a-form-divider>

          <ValidationProvider v-slot="{errors}" rules="required" name="country">
            <a-form-item label="Страна" :errors="errors">
              <a-select :data="countries" v-model="profile.location.country" placeholder="Выберите регион"/>
            </a-form-item>
          </ValidationProvider>

          <ValidationProvider v-slot="{errors}" rules="required" name="region">
            <a-form-item label="Область" :errors="errors">
              <a-select :data="regions"
                        v-model="profile.location.region"
                        placeholder="Выберите регион"
                        :disabled="!profile.location.country && !regions.length"/>
            </a-form-item>
          </ValidationProvider>

          <ValidationProvider v-slot="{errors}" rules="required" name="city">
            <a-form-item label="Город" :errors="errors">
              <a-select :data="cities"
                        v-model="profile.location.city"
                        placeholder="Выберите город"
                        :disabled="!profile.location.region && !cities.length"/>
            </a-form-item>
          </ValidationProvider>
        </form>
      </ValidationObserver>
    </template>
    <template #footer>
      <a-button type="primary" form="form" :loading="loading">Сохранить</a-button>
      <a-button type="default" @click.native.stop="fetchProfile">Отменить</a-button>
    </template>
  </page-content>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import PageContent from '@/components/User/Profile/PageContent'
import PhotoControl from '@/components/User/Profile/Settings/PhotoControl'
import AInput from '@/components/components/Input/AInput'
import AButton from '@/components/components/Button/AButton'
import ASelect from '@/components/components/Select/ASelect'
import ARepeater from '@/components/components/Repeater/ARepeater'
import ATelInput from '@/components/components/Input/ATelInput'
import AFormItem from '@/components/components/Form/AFormItem'
import AFormDivider from '@/components/components/Form/AFormDivider'

export default {
  name: 'Personal',
  data () {
    return {
      loading: false,
      countries: [],
      regions: [],
      cities: [],
      countryUpd: false,
      regionUpd: false
    }
  },
  components: {
    PhotoControl,
    PageContent,
    AInput,
    AButton,
    ASelect,
    ARepeater,
    ATelInput,
    AFormItem,
    AFormDivider
  },
  watch: {
    'profile.location.country' () {
      if (this.countryUpd) {
        this.regions = []
        this.profile.location.region = null
        this.cities = []
        this.profile.location.city = null
      }
      this.countryUpd = true
      this.fetchRegions()
    },
    'profile.location.region' () {
      if (this.regionUpd) {
        this.profile.location.city = null
      }
      this.regionUpd = true
      if (this.profile.location.region) this.fetchCities()
    }
  },
  computed: {
    ...mapGetters('profile', ['profile'])
  },
  methods: {
    ...mapMutations('profile', ['addEmail', 'removeEmail', 'addPhone', 'removePhone']),
    ...mapActions('profile', {
      fetchProfile: 'profile',
      applyChanges: 'applyChanges'
    }),
    reset () {
      alert('asd')
      this.countryUpd = this.regionUpd = false
      this.fetchProfile()
    },
    submit () {
      this.loading = true
      this.applyChanges()
        .then(r => {
          this.loading = false
          this.$message.success(r.data.message)
        })
        .catch(e => {
          this.loading = false
          if (e.response.status === 422) {
            this.$refs.form.setErrors(e.response.data)
          } else if ('message' in e.response.data) {
            this.$message.error(e.response.data.message)
          }
        })
    },
    async fetchCountries () {
      await this.$http.get(`${this.$config.host}/api/locations/countries`)
        .then(r => {
          this.countries = r.data
        })
    },
    async fetchRegions () {
      await this.$http.get(`${this.$config.host}/api/locations/regions/${this.profile.location.country}`)
        .then(r => {
          this.regions = r.data
        })
    },
    async fetchCities () {
      await this.$http.get(`${this.$config.host}/api/locations/cities/${this.profile.location.region}`)
        .then(r => {
          this.cities = r.data
        })
    }
  },
  created () {
    this.fetchCountries()
    if (this.profile.location.country) this.fetchRegions()
    if (this.profile.location.region) this.fetchCities()
    if (this.profile.id) this.countryUpd = this.regionUpd = true
  }
}
</script>

<style scoped lang="scss">
</style>
