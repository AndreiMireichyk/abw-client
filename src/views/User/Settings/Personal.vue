<template>
  <div class="personal">
    <div class="personal__head">
      <div class="personal__title">Персональные данные</div>

    </div>
    <div class="personal__body">

      <ValidationObserver ref="form" v-slot="s" :key="1123">

        <form id="form" @submit.prevent="s.passes(submit)">
          <div class="control">
            <div class="control__label"></div>
            <div class="control__group">
              <photo-control/>
            </div>
          </div>
          <div class="personal__divider">Личные данные</div>

          <ValidationProvider v-slot="{errors}" rules="required" tag="div" class="control">
            <label for="last_name" class="control__label">Фамилия</label>
            <div class="control__group">
              <input id="last_name" type="text" v-model="profile.lastName" class="control__input"
                     placeholder="Ваша фамилия">
              <small class="control__error" v-if="errors.length">{{ errors[0] }}</small>
            </div>
          </ValidationProvider>

          <ValidationProvider v-slot="{errors}" rules="required" tag="div" class="control">
            <label for="first_name" class="control__label">Имя</label>
            <div class="control__group">
              <input id="first_name" type="text" v-model="profile.firstName" class="control__input"
                     placeholder="Ваше Имя">
              <small class="control__error" v-if="errors.length">{{ errors[0] }}</small>
            </div>
          </ValidationProvider>

          <ValidationProvider v-slot="{errors}" rules="required" tag="div" class="control">
            <label for="middleName" class="control__label">Отчество</label>
            <div class="control__group">
              <input id="middleName" type="text" v-model="profile.middleName" class="control__input"
                     placeholder="Ваше отчество">
              <small class="control__error" v-if="errors.length">{{ errors[0] }}</small>
            </div>
          </ValidationProvider>

          <div class="personal__divider">Контакты</div>

          <ValidationProvider v-slot="{errors}" tag="div" class="control">
            <div class="control__label p-top">Телефоны</div>
            <div class="control__group">
              <small class="control__error" v-if="errors.length">{{ errors[0] }}</small>
              <phones-control/>
            </div>
          </ValidationProvider>

          <ValidationProvider v-slot="{errors}" rules="email" tag="div" class="control">
            <div class="control__label">Email</div>
            <div class="control__group">
              <emails-control/>
              <small class="control__error" v-if="errors.length">{{ errors[0] }}</small>
            </div>
          </ValidationProvider>

          <div class="personal__divider">Адрес</div>

          <ValidationProvider v-slot="{errors}" rules="required" tag="div" class="control">
            <label for="country" class="control__label">Страна</label>
            <div class="control__group">
              <select id="country" type="text" v-model="profile.location.country" class="control__input">
                <option disabled value="null">Выберите страну</option>
                <option v-for="country in countries" :key="country.id" :value="country.id">
                  {{ country.title }}
                </option>
              </select>
              <small class="control__error" v-if="errors.length">{{ errors[0] }}</small>
            </div>
          </ValidationProvider>

          <ValidationProvider v-slot="{errors}" rules="required" tag="div" class="control"
                              v-if="profile.location.country && regions.length">
            <label for="region" class="control__label">Область</label>
            <div class="control__group">
              <select id="region" type="text" v-model="profile.location.region" class="control__input">
                <option disabled value="null">Выберите регион</option>
                <option v-for="region in regions" :key="region.id" :value="region.id">{{ region.title }}</option>
              </select>
              <small class="control__error" v-if="errors.length">{{ errors[0] }}</small>
            </div>
          </ValidationProvider>

          <ValidationProvider v-slot="{errors}"  rules="required" tag="div" class="control"
                              v-if="profile.location.region && cities.length">
            <label for="city" class="control__label">Город</label>
            <div class="control__group">
              <select id="city" type="text" v-model="profile.location.city" class="control__input">
                <option disabled value="null">Выберите город</option>
                <option v-for="city in cities" :key="city.id" :value="city.id">{{ city.title }}</option>
              </select>
              <small class="control__error" v-if="errors.length">{{ errors[0] }}</small>
            </div>
          </ValidationProvider>
        </form>
      </ValidationObserver>
    </div>
    <div class="personal__footer">
      <button class="btn btn-primary" form="form">Сохранить</button>
      <a href="javascript:void(0)" @click="fetchProfile" class="btn btn-default">Отменить</a>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import PhotoControl from '@/components/User/Profile/PhotoControl'
import PhonesControl from '@/components/User/Profile/PhonesControl'
import EmailsControl from '@/components/User/Profile/EmailsControl'

export default {
  name: 'Personal',
  data () {
    return {
      countries: [],
      regions: [],
      cities: []
    }
  },
  components: {
    PhotoControl,
    PhonesControl,
    EmailsControl
  },
  watch: {
    'profile.location.country' () {
      this.regions = []
      this.profile.location.region = null
      this.cities = []
      this.profile.location.city = null
      this.fetchRegions()
    },
    'profile.location.region' () {
      this.profile.location.city = null
      if (this.profile.location.country) this.fetchCities()
    }
  },
  computed: {
    ...mapGetters('profile', ['profile'])
  },
  methods: {
    ...mapActions('profile', {
      fetchProfile: 'profile',
      applyChanges: 'applyChanges'
    }),
    submitForm () {
      this.$refs.form.submit()
    },
    submit () {
      this.applyChanges
        .then(r => {
          this.$message.success(r.data.message)
        })
        .catch(e => {
          if (e.response.code === 422) {
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
  }
}
</script>

<style scoped lang="scss">
.personal {
  &__head {
    display: flex;
    align-items: center;
    padding: 0 24px 24px 24px;
    margin: 0 -24px;
    border-bottom: 1px solid #EBEDF3;
    margin-bottom: 24px;
  }

  &__footer {
    background: #fafbfb;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: 0 -24px -24px -24px;
    border-top: 1px solid #EBEDF3;
    padding: 16px 24px;

    & > * {
      margin-left: 12px;
    }
  }

  &__title {
    flex-grow: 1;
    font-size: 18px;
    font-weight: bold;
  }

  &__actions {

  }

  &__divider {
    padding-left: 30%;
    margin-top: 36px;
    margin-bottom: 16px;
    font-weight: 500;
    font-size: 16px;
  }
}

.control {
  display: flex;
  align-items: stretch;
  margin-bottom: 16px;

  &__label {
    position: relative;
    top: 9px;
    box-sizing: border-box;
    width: 30%;
    text-align: right;
    padding-right: 24px;
    height: 100%;
  }

  &__group {
    width: 40%;
  }

  &__input {
    box-sizing: border-box;
    display: block;
    width: 100%;
    background-color: var(--white-color);
    outline: none;
    appearance: none;
    border: 1px solid #d9deee;
    padding: 8px 12px;
    border-radius: 6px;
    color: var(--gray-color);
    transition: color 0.15s ease, background-color 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease, -webkit-box-shadow 0.15s ease;

    &::placeholder {
      color: var(--font-muted-color);
    }

    &:focus {
      border: 1px solid var(--primary-color);
      background-color: #f6f6f6;
    }
  }

  &__error {
    margin-top: 6px;
    display: block;
    font-size: 12px;
    color: var(--red-color);
  }
}
</style>
