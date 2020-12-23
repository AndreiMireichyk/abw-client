<template>
  <div>
    <div class="page" v-if="categories.length">
      <h1 class="page__title">Выберите категорию</h1>
      <ul>
        <li v-for="category in categories" :key="category.id">
          <router-link :to="{name: 'ad-form', params:{slug: category.slug}}">{{category.title}}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Categories',
  data () {
    return {
      categories: []
    }
  },
  methods: {
    fetch () {
      this.$http.get(`${this.$config.host}/api/adverts/categories`)
        .then(r => {
          this.categories = r.data
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
      line-height: 1;
    }
  }
</style>
