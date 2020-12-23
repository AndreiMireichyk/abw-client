<template>
  <div>
    <div class="page" v-if="form.length">
      <h2 class="page__title">Добавить обьявление</h2>
      <div v-for="row in form" :key="row.id">

        <div>
          <h3>{{row.label}}</h3>
          <ul>
            <li v-for="option in row.options" :key="option.id">
              <label>
                <input type="radio" v-model="row.value" :value="option.id" @change="update">
                {{option.title}}
              </label>
            </li>
          </ul>
        </div>
      </div>
      <pre>
        {{parameters}}
      </pre>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Form',
  data () {
    return {
      form: []
    }
  },
  computed: {
    parameters () {
      const props = {}

      this.form.forEach(item => {
        props[item.attribute] = item.value
      })

      return props
    }
  },
  methods: {
    update () {
      this.$http.post(`${this.$config.host}/api/adverts/${this.$route.params.slug}/form`, {
        params: this.parameters
      })
        .then(r => {
          this.form = r.data
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
    background: #ffffff;
    min-height: 100vh;

    &__title {
      margin-bottom: 32px;
      line-height: 1;
    }
  }
</style>
