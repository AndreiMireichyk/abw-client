<template>
  <div class="schedule">
    <div class="schedule__title">
      {{ category.title }}
    </div>
    <div class="schedule__description">
      Выберите удобный метод импорта, загрузите файл или укажите ссылку.
    </div>
    <ul class="schedule__nav">
      <li class="schedule__nav-item">
        <a-link type="default" :to="{name: 'user.import.file'}">файл</a-link>
      </li>
      <li class="schedule__nav-item">
        <a-link type="default" :to="{name: 'user.import.schedule'}">ссылка</a-link>
      </li>
    </ul>
    <div class="schedule__form">
      <ValidationObserver ref="form" v-slot="{passes}">
        <form class="form" @submit.prevent="passes(getPreview)">

          <ValidationProvider name="ссылка" rules="required" v-slot="{errors}" class="form__item url" html="div">
            <a-form-item :errors="errors" input-align="center">
              <a-input v-model="url" placeholder="https://..."/>
            </a-form-item>
          </ValidationProvider>

          <ValidationProvider name="время" rules="required" v-slot="{errors}" class="form__item time" html="div">
            <a-form-item :errors="errors" input-align="center">
              <a-input type="time" v-model="startAt"/>
            </a-form-item>
          </ValidationProvider>
          <a-form-item class="form__actions">
            <a-button block :loading="loading">Далее</a-button>
          </a-form-item>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>
<script>

import { mapGetters, mapMutations } from 'vuex'
import ALink from '@/components/components/Link/ALink'
import AInput from '@/components/components/Input/AInput'
import AFormItem from '@/components/components/Form/AFormItem'
import AButton from '@/components/components/Button/AButton'

export default {
  name: 'ImportSchedule',
  components: {
    ALink,
    AInput,
    AFormItem,
    AButton
  },
  data () {
    return {
      loading: false,
      url: null,
      startAt: '12:00'
    }
  },
  computed: {
    ...mapGetters('advImport', ['category', 'type'])
  },
  methods: {
    ...mapMutations('advImport', {
      setType: 'type',
      setData: 'data',
      setColumn: 'column',
      setStartAt: 'startAt',
      setUrl: 'url'
    }),
    getPreview () {
      this.loading = true
      const data = new URLSearchParams()
      data.append('form[url]', this.url)
      data.append('form[category]', this.category.id)

      this.$http.post(`${this.$config.host}/api/classified/import_schedule/preview`, data)
        .then(r => {
          this.loading = false
          this.setColumn(r.data.columns)
          this.setData(r.data.data)
          this.setStartAt(this.startAt)
          this.setUrl(this.url)
          this.$router.push({ name: 'user.import.preview' })
        })
        .catch(e => {
          this.loading = false
          this.$message.error(e.response.data.message)
        })
    }
  },
  mounted () {
    this.setType('schedule')
  }
}
</script>

<style scoped lang="scss">
.schedule {
  min-height: 50vh;
  margin: auto auto;
  padding-top: 24px;

  &__title {
    text-align: center;
    font-size: 32px;
    font-weight: 500;
    margin-bottom: 16px;
  }

  &__description {
    font-size: 14px;
    text-align: center;
    margin-bottom: 16px;
    color: var(--gray-color);
  }

  &__nav {
    display: flex;
    justify-content: center;
    margin-bottom: 24px;
  }

  &__nav-item {
    display: flex;

    &:last-child:after {
      display: none;
    }

    &:after {
      content: "";
      display: block;
      min-height: 100%;
      margin: 0 8px;
      border-right: 1px solid rgba(0, 0, 0, 0.18);
    }
  }

  &__form {
    display: flex;
    justify-content: center;
  }

}

.form {
  display: flex;
  flex-wrap: wrap;

  &__item.url {
    width: 300px;
  }

  &__item.time {
    width: 150px;
  }

  &__item {
    margin-right: 16px;
  }

  &__actions {

  }
}
</style>
