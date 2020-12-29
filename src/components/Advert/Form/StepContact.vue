<template>
  <div>
    <ValidationObserver v-slot="{ handleSubmit }" ref="vee">
      <form @submit.prevent="handleSubmit(validate)">
        <div class="control-phone">
          <div class="control-phone__head">
            <div class="control-phone__title">Контакты</div>
            <div class="control-phone__value"></div>
          </div>
          <div class="control-phone__body">

            <div class="control-phone__section">
              <div class="control-phone__section-group">
                <div class="select">
                  <label class="select__label" for="country">Страна</label>
                  <ValidationProvider name="страна" rules="required" v-slot="props">
                    <select id="country"
                            class="select__input"
                            v-model="contacts.country_id"
                            :class="{invalid:props.errors.length }"
                    >
                      <option disabled value="null">Выберите страну</option>
                      <option v-for="country in countries" :key="country.id" :value="country.id">{{
                          country.title
                        }}
                      </option>
                    </select>
                  </ValidationProvider>
                </div>
                <div class="select" v-if="contacts.country_id && regions.length">
                  <label class="select__label" for="region">Регион</label>
                  <ValidationProvider name="регион" rules="required" v-slot="props">
                    <select id="region"
                            class="select__input"
                            v-model="contacts.region_id"
                            :class="{invalid:props.errors.length }"
                    >
                      <option disabled value="null">Выберите регион</option>
                      <option v-for="region in regions" :key="region.id" :value="region.id">{{ region.title }}</option>
                    </select>
                  </ValidationProvider>
                </div>
                <div class="select" v-if="contacts.region_id && cities.length">
                  <label class="select__label" for="city">Город</label>
                  <ValidationProvider name="город" rules="required" v-slot="props">
                    <select id="city"
                            class="select__input"
                            v-model="contacts.city_id"
                            :class="{invalid:props.errors.length }"
                    >
                      <option disabled value="null">Выберите город</option>
                      <option v-for="city in cities" :key="city.id" :value="city.id">{{ city.title }}</option>
                    </select>
                  </ValidationProvider>
                </div>
              </div>
            </div>
            <div class="control-phone__section">
              <div class="input">
                <label class="input__label" for="seller_name">Имя</label>
                <ValidationProvider name="имя" rules="required" v-slot="props">
                  <input id="seller_name"
                         class="input__input"
                         v-model="contacts.name"
                         placeholder="Ваше имя"
                         :class="{invalid:props.errors.length }"
                  />
                </ValidationProvider>
              </div>
            </div>
            <div class="control-phone__section">
              <div class="input">
                <label class="input__label" for="seller_email">Email</label>
                <ValidationProvider name="email" rules="email" v-slot="props">
                  <input id="seller_email"
                         class="input__input"
                         v-model="contacts.email"
                         placeholder="Ваш email"
                         :class="{invalid:props.errors.length }"
                  />
                </ValidationProvider>
              </div>
            </div>
            <div class="control-phone__section">
              <div class="phones">
                <label class="phones__label">Телефон</label>
                <div class="phones__list">
                  <div class="phones__item" v-for="(phone, key) in contacts.phones" :key="key">
                    <div class="phones__input">
                      <ValidationProvider rules="required" v-slot="props">
                        <vue-tel-input v-model="phone.value"
                                       v-bind="bindProps"
                                       @validate="validatePhone"
                                       :class="{invalid:props.errors.length }"
                        />
                      </ValidationProvider>
                    </div>
                    <div>
                      <a @click="removePhone(key)" class="phones__btn-remove"
                         v-if="contacts.phones.length > 1">Удалить</a>
                    </div>
                  </div>
                </div>
                <a v-if="contacts.phones.length < 3" class="phones__btn-add" @click.prevent.stop="addPhone">Добавить</a>
              </div>
            </div>

          </div>
          <div class="control-phone__footer" v-if="showFooter">
            <button type="submit" class="control-phone__btn">Далее</button>
          </div>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>

import { VueTelInput } from 'vue-tel-input'

export default {
  components: {
    VueTelInput
  },
  props: ['contacts'],
  name: 'step-contact',
  data () {
    return {
      countries: [],
      regions: [],
      cities: [],
      showFooter: true,
      bindProps: {
        mode: 'international',
        placeholder: 'Введите телефон',
        required: false,
        enabledCountryCode: false,
        onlyCountries: ['BY', 'RU']
      }
    }
  },
  watch: {
    'contacts.country_id' () {
      this.regions = []
      this.contacts.region_id = null
      this.cities = []
      this.contacts.city_id = null
      this.fetchRegions()
    },
    'contacts.region_id' () {
      this.contacts.city_id = null
      if (this.contacts.country_id) this.fetchCities()
    }
  },
  methods: {
    validate () {
      this.showFooter = false
      this.$emit('next')
    },
    addPhone () {
      this.contacts.phones.push({ value: null })
    },
    removePhone (index) {
      this.contacts.phones.splice(index, 1)
    },
    validatePhone () {
    },
    async fetchCountries () {
      await this.$http.get(`${this.$config.host}/api/locations/countries`)
        .then(r => {
          this.countries = r.data
        })
    },
    async fetchRegions () {
      await this.$http.get(`${this.$config.host}/api/locations/regions/${this.contacts.country_id}`)
        .then(r => {
          this.regions = r.data
        })
    },
    async fetchCities () {
      await this.$http.get(`${this.$config.host}/api/locations/cities/${this.contacts.region_id}`)
        .then(r => {
          this.cities = r.data
        })
    }
  },
  created () {
    if (!this.contacts.phones.length) this.addPhone()
    this.fetchCountries()
  }
}
</script>

<style lang="scss">
.control-phone {
  display: flex;
  flex-direction: column;

  background: #ffff;
  border-bottom: 1px solid #ebebeb;

  &__head {
    display: flex;
    align-items: center;
    padding: 12px 24px;
  }

  &__footer {
    display: flex;
    align-items: center;
    padding: 16px 24px;
    border-top: 1px solid #ebebeb;
  }

  &__body {
    padding: 12px 24px;
  }

  &__section {
    margin-bottom: 18px;
  }

  &__section-group {
    display: flex;
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
    border: none;
    outline: none;
    appearance: none;

    &:hover {
      background: transparent;
      box-shadow: 0 0 0 1px #d3d9df inset, 0 1px 0 rgba(24, 26, 27, 0.08);
      color: var(--font-color);
    }
  }

  &__title {
    font-weight: 500;
    font-size: 18px;

    &:after {
      content: ":";
    }

  }

  &__value {
    cursor: pointer;
    text-transform: uppercase;
    font-weight: 500;
    padding-left: 10px;
    font-size: 18px;
    color: var(--primary-color);

    &:hover {
      color: var(--primary-color);
    }

  }
}

.select {
  margin-right: 16px;

  &__label {
    display: block;
    margin-bottom: 8px;
    color: var(--gray-color);
  }

  &__input {
    box-sizing: border-box;
    max-width: 185px;
    box-shadow: 0 0 0 1px #d3d9df inset, 0 1px 0 rgba(24, 26, 27, 0.08);
    padding: 8px 12px;
    border-radius: 4px;
    border: none;
    outline: none;
    color: var(--gray-color);
    min-width: 180px;
  }
}

.input {

  &__label {
    display: block;
    margin-bottom: 8px;
    color: var(--gray-color);
  }

  &__input {
    box-sizing: border-box;
    max-width: 185px;
    box-shadow: 0 0 0 1px #d3d9df inset, 0 1px 0 rgba(24, 26, 27, 0.08);
    padding: 8px 12px;
    border-radius: 4px;
    border: none;
    outline: none;
    color: var(--gray-color);
  }
}

.phones {
  &__label {
    display: block;
    margin-bottom: 8px;
    color: var(--gray-color);
  }

  &__list {
    margin-bottom: 12px;
  }

  &__item {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
  }

  &__btn-add {
    cursor: pointer;
    text-decoration: none;
    font-weight: 500;
    color: var(--primary-color)
  }

  &__btn-remove {
    cursor: pointer;
    text-decoration: none;
    font-weight: 500;
    color: #f51958;
  }

  &__input {
    max-width: 185px;
    padding-right: 15px;

    .vue-tel-input {
      box-shadow: 0 0 0 1px #d3d9df inset, 0 1px 0 rgba(24, 26, 27, 0.08);
      border-radius: 4px;
      border: none;
      outline: none;
      color: var(--gray-color);

      &:focus-within {
        box-shadow: 0 0 0 1px #d3d9df inset, 0 1px 0 rgba(24, 26, 27, 0.08);
      }
    }

    .vue-tel-input input {
      background: transparent;
      color: var(--gray-color);
    }

    .vti__dropdown {
      height: 18px;
      box-shadow: none;
      border: none;
      border-right: 1px solid #ebebeb;

      &:hover, &:focus, & {
        outline: none;
        background: transparent;
      }
    }

  }
}

.invalid {
  animation: shake .8s;
  box-shadow: 0 0 0 1px var(--red-color) inset, 0 1px 0 rgba(24, 26, 27, 0.08) !important;
}
</style>
