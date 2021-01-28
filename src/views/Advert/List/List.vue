<template>
  <div class="page">
    <div class="page__content">
      <div class="page__body">

        <div class="page__result" v-if="pagination">
          Найдено объявлений - {{ pagination.total }}
        </div>

        <div class="page__listing">

          <div class="advert" v-for="(item) in items" :key="item.id">
            <div class="advert__cover">
              <cover-viewer :images="item.images"/>
            </div>
            <div class="advert__info">

              <router-link :to="{name: 'ad-detail', params:{slug: $route.params.slug, id: item.id}}" target="_blank"
                           class="advert__stretch-link"></router-link>
              <div class="advert__left">
                <div>
                  <div class="advert__title">
                    {{ item.properties.car_marka }}
                    {{ item.properties.car_model }}
                    {{ item.properties.car_generation }}
                  </div>
                  <div class="advert__location">
                    {{ item.location.country }},
                    {{ item.location.city }}
                  </div>
                </div>
                <div class="advert__properties">
                  {{ item.properties.car_engine_volume }}л.,
                  {{ item.properties.year }}г.,
                  {{ item.properties.car_engine }},
                  {{ item.properties.car_transmission }}

                </div>
                <div class="advert__description">
                  {{ item.description }}
                </div>
                <div class="advert__tags">
                  <div class="advert__tag success">
                    VIN +
                  </div>
                  <div class="advert__tag warning">
                    обмен
                  </div>
                  <div class="advert__tag danger">
                    аварийный
                  </div>
                </div>
              </div>

              <div class="advert__right">
                <div class="advert__at">
                  {{ item.created_at }}
                </div>

                <div class="advert__pricelist">
                  <div class="advert__price second">
                    ≈ {{ formatPrice(item.price.usd) }}
                    <span class="advert__currency">
                      usd
                    </span>
                  </div>
                  <div class="advert__price second">
                    ≈ {{ formatPrice(item.price.eur) }}
                    <span class="advert__currency">
                      eur
                    </span>
                  </div>
                  <div class="advert__price second">
                    ≈ {{ formatPrice(item.price.rub) }}
                    <span class="advert__currency">
                      rub
                    </span>
                  </div>
                  <div class="advert__price base">
                    {{ formatPrice(item.price.byn) }}
                    <span class="advert__currency">
                      byn
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="page__pagination" v-if="pagination">
          <div class="pagination">
            <a href="javascript:void(0)" class="pagination__btn" v-show="showNextPageBtn"
               @click.prevent="nextPage">Показать еще</a>
            <div class="pagination__total">На странице {{ showItemCount }} объявлений из {{ pagination.total }}</div>
          </div>
        </div>
      </div>
      <div class="page__aside">
        <adv-filter></adv-filter>
      </div>
    </div>
  </div>
</template>

<script>
import CoverViewer from '@/components/Advert/List/CoverViewer'
import AdvFilter from '@/components/Advert/List/Filter/Filter'

export default {
  props: ['categorySlug', 'searchParams'],
  name: 'List',
  components: { CoverViewer, AdvFilter },
  data () {
    return {
      category: null,
      items: [],
      pagination: {
        page: 1,
        per_page: 25,
        total: 0
      },
      filters: []
    }
  },
  computed: {
    showNextPageBtn () {
      return this.pagination.pages > this.pagination.page
    },
    showItemCount () {
      return this.pagination.page * this.pagination.per_page
    }
  },
  watch: {
    categorySlug () {
      this.fetch()
      this.fetchFilters()
    }
  },
  methods: {
    formatPrice (val) {
      return (new Intl.NumberFormat()).format(val)
    },
    nextPage () {
      this.fetch(this.pagination.page + 1)
    },
    fetch (page) {
      page = page || 1

      this.$http.get(`${this.$config.host}/api/adverts/${this.$route.params.slug}/list?page=${page}`)
        .then(r => {
          r.data.items.map(item => this.items.push(item))
          this.pagination = r.data.pagination
        })
        .catch(e => {
          alert('fetch err')
        })
    },
    fetchFilters () {
      this.$http.post(`${this.$config.host}/api/adverts/${this.$route.params.slug}/filters`, {
        params: {}
      })
        .then(r => {
          this.filters = r.data
        })
        .catch(e => {
          alert('fetch filters err')
        })
    }
  },
  created () {
    this.fetch()
  },
  beforeRouteUpdate (to, from, next) {
    this.items = []
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
    padding: 16px;
    margin-bottom: 4px;
  }
}

.advert {

  display: flex;

  background: rgba(255, 255, 255, .7);
  height: 200px;
  margin-bottom: 5px;

  &__cover {
    min-width: 30%;
    width: 30%;
    height: 200px;
  }

  &__info {
    position: relative;
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    flex-grow: 1;
    padding: 12px;
  }

  &__left, &__right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &__left {
    flex-grow: 1;
  }

  &__title {
    flex-grow: 1;
    color: var(--font-color);
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 8px;
  }

  &__location {
    margin-bottom: 8px;
    font-weight: 400;
    color: var(--gray-color);
    font-size: 12px;
  }

  &__at {
    text-transform: lowercase;
    white-space: nowrap;
    text-align: right;
    font-weight: 400;
    font-size: 13px;
    color: var(--gray-color);
  }

  &__price {
    white-space: nowrap;
    text-transform: uppercase;
    text-align: right;

    &.second {
      font-size: 14px;
      color: #777d82;
      font-weight: 400;
      margin-bottom: 2px;
    }

    &.base {
      font-size: 20px;
      font-weight: 600;
    }
  }

  &__properties {
    text-transform: lowercase;
    font-weight: 500;
    flex-grow: 2;
    margin-bottom: 20px;
  }

  &__description {
    color: var(--gray-color);
    font-size: 13px;
    line-height: 16px;
    padding-right: 60px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
  }

  &__tags {
    margin-top: 8px;
    display: flex;
  }

  &__tag {
    font-size: 12px;
    text-transform: uppercase;
    font-weight: 500;
    padding: 3px 5px;
    margin-right: 6px;
    border-radius: 4px;

    &.warning {
      color: var(--gray-color);
      border: 1px solid #f1bd0b;
    }

    &.success {
      color: #3d8517;
      border: 1px solid #3d8517;
    }

    &.danger {
      color: var(--red-color);
      border: 1px solid var(--red-color);
    }
  }

  &__stretch-link {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
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
    transition: all .3s;

    &:hover {
      color: var(--primary-color);
      box-shadow: 0 0 0 1px var(--primary-color) inset, 0 1px 0 rgba(24, 26, 27, 0.08);
    }
  }

  &__total {
    padding-left: 16px;
    color: var(--gray-color);
  }
}

</style>
