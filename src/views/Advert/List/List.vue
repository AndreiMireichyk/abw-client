<template>
  <div class="page" :key="$route.params.slug">
    <div class="page__content">
      <div class="page__body">
        <div class="page__filters">

        </div>

        <div class="page__result">
          Найдено объявлений - {{ items.length }}
        </div>

        <div class="page__listing">

          <div class="advert" v-for="(item) in items" :key="item.id">
            <div class="advert__cover">
              <cover-viewer :images="item.images"/>
            </div>
            <div class="advert__info">
              <div class="advert__head">
                <div class="advert__title">
                  {{ item.title }}
                </div>
                <div class="advert__at">
                  {{ item.created_at }}
                </div>
              </div>

              <div class="advert__location">
                {{ item.location.country }},
                {{ item.location.city }}
              </div>

            </div>
          </div>
        </div>
        <div class="page__pagination">
          <div class="pagination">
            <a href="" class="pagination__btn">Показать еще</a>
            <div class="pagination__total">На странице 50 объявлений из 126</div>
          </div>
        </div>
      </div>
      <div class="page__aside">
        реклама + перелинковка
      </div>
    </div>
  </div>
</template>

<script>
import CoverViewer from '@/components/Advert/List/CoverViewer'

export default {
  name: 'List',
  components: { CoverViewer },
  data () {
    return {
      category: null,
      items: []
    }
  },
  watch: {
    category () {
      this.fetch()
    }
  },
  methods: {
    fetch () {
      this.$http.get(`${this.$config.host}/api/adverts/${this.$route.params.slug}/list`)
        .then(r => {
          this.items = r.data
        })
        .catch(e => {
          alert('fetch err')
        })
    }
  },
  created () {
    this.fetch()
  },
  beforeRouteUpdate (to, from, next) {
    this.category = to.params.slug
    next()
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
    font-size: 32px;
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

    flex-grow: 1;
  }

  &__aside {
    width: 300px;
    min-width: 300px;
    margin-left: 24px;
  }

  &__listing {
  }

  &__result {
    color: var(--font-color);
    font-weight: 500;
    font-size: 18px;
    background: rgba(255, 255, 255, .7);
    padding: 12px;
    margin-bottom: 4px;
  }
}

.advert {

  display: flex;

  background: rgba(255, 255, 255, .7);
  height: 200px;
  margin-bottom: 5px;

  &__cover {
    width: 30%;
    height: 200px;
  }

  &__info {
    flex-grow: 1;
    padding: 12px;
  }

  &__head {
    display: flex;
    justify-content: space-between;
  }

  &__title {
    flex-grow: 1;
    color: var(--font-color);
    font-size: 18px;
    font-weight: 600;
  }

  &__location {
    font-weight: 400;
    color: var(--gray-color);
    font-size: 12px;
  }

  &__at {
    font-weight: 400;
    font-size: 13px;
    color: var(--gray-color);
  }
}

.pagination {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, .7);
  padding: 16px;

  &__btn {
    font-weight: 500;
    color: var(--font-color);
    border-radius: 8px;
    padding: 12px;
    text-decoration: none;
    box-shadow: 0 0 0 1px #d3d9df inset, 0 1px 0 rgba(24, 26, 27, 0.08);
    transition: box-shadow .3s;

    &:hover {
      box-shadow: 0 0 0 1px var(--primary-color) inset, 0 1px 0 rgba(24, 26, 27, 0.08);
    }
  }

  &__total {
    padding-left: 16px;
    color: var(--gray-color);
  }
}
</style>
