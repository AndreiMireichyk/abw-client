<template>
  <div class="page">
    <div class="page__body">
      <detail-base :data="data" v-if="data"></detail-base>
    </div>
    <div class="page__aside">
      Новости
    </div>

  </div>
</template>

<script>
import DetailBase from '@/components/Classified/Detail/DetailBase'

export default {
  name: 'Detail',
  props: ['slug', 'id'],
  components: {
    DetailBase
  },
  data () {
    return {
      data: null
    }
  },
  methods: {
    fetchDetail () {
      this.$http.get(`${this.$config.host}/api/adverts/${this.id}`)
        .then(r => {
          this.data = r.data
        })
        .catch()
    }
  },
  created () {
    this.fetchDetail()
  }
}
</script>

<style scoped lang="scss">
.page {
  padding: 25px;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 80vh;
  box-sizing: border-box;

  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  &__body {
    border-radius: 8px;
    flex-grow: 1;
    background: var(--white-bg);
    max-width: calc(1200px - 280px - 24px);
  }

  &__aside {
    width: 280px;
    min-width: 280px;
    margin-left: 24px;
    background: var(--white-bg);
  }
}
</style>
