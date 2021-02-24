<template>
  <div class="phones">
    <div class="phones__list">
      <div class="phones__item" v-for="(phone, index) in profile.phones" :key="index">

        <ValidationProvider v-slot="props" tag="div" class="phones__input">
          <vue-tel-input v-model="profile.phones[index]"
                         v-bind="bindProps"
                         @validate="validatePhone"
                         :class="{invalid:props.errors.length }"
          />
        </ValidationProvider>

        <div class="phones__remove">
          <a @click="removePhone(index)" href="javascript:void(0)" class="link link-danger"
             v-if="profile.phones.length > 1">Удалить</a>
        </div>
      </div>
    </div>
    <a v-if="profile.phones.length < 3" href="javascript:void(0)" class="link link-primary"
       @click.prevent.stop="addPhone">Добавить</a>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { VueTelInput } from 'vue-tel-input'

export default {
  name: 'PhonesControl',
  components: {
    VueTelInput
  },
  data () {
    return {
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
    'profile.phones' () {
      if (!this.profile.phones.length) this.addPhone()
    }
  },
  computed: {
    ...mapGetters('profile', ['profile'])
  },
  methods: {
    ...mapMutations('profile', ['addPhone', 'removePhone']),
    validatePhone () {

    }
  },
  mounted () {
    if (!this.profile.phones.length) this.addPhone()
  }
}
</script>

<style lang="scss">
.phones {
  &__item {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
  }

  &__input {
    padding-right: 0;
    flex-grow: 1;
    max-width: none;

    .vue-tel-input {
      background: var(--white-color);
      border: 1px solid #d9deee;
      box-shadow: none !important;
      border-radius: 6px;

      input::placeholder {
        color: var(--font-muted-color);
      }

      &:focus-within {
        border: 1px solid var(--primary-color);
        box-shadow: none;
      }
    }
  }

  &__remove {
    padding-left: 12px;
  }
}
</style>
