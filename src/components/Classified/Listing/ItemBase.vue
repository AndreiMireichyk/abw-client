<template>
  <div class="item">
    <div class="advert">
      <div class="advert__cover">
        <cover-viewer :images="item.images"/>
      </div>
      <div class="advert__info">
        <router-link :to="{name: 'ad-detail', params:{slug: slug, id: item.id}}" target="_blank"
                     class="advert__stretch-link"/>
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
          <div class="advert__actions">

            <div class="advert__action">
              <a-button type="default" size="small">
                <a-icon type="edit"/>
              </a-button>
            </div>
            <div class="advert__action">
              <a-button type="default" size="small" @click.native="showStat = !showStat">
                <a-icon type="activity"/>
                117/12
              </a-button>
            </div>
            <div class="advert__action">
              <a-button type="default" size="small">
                <a-icon type="trash"/>
              </a-button>
            </div>
          </div>
          <div class="advert__at">
            {{ 'created_at' in item ? item.created_at : null }}
          </div>
          <div class="advert__price-list">

            <div class="advert__price second">
              ≈ {{ formatPrice('usd' in item.price ? item.price.usd : null) }}
              <span class="advert__currency">usd</span>
            </div>
            <div class="advert__price second">
              ≈ {{ formatPrice(item.price.eur) }}
              <span class="advert__currency">eur</span>
            </div>
            <div class="advert__price second">
              ≈ {{ formatPrice(item.price.rub) }}
              <span class="advert__currency">rub</span>
            </div>

            <div class="advert__price base">
              {{ formatPrice(item.price.byn) }}
              <span class="advert__currency">byn</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <item-stat v-if="showStat"  :item="item" :key="item.id"/>
  </div>
</template>

<script>
import CoverViewer from '@/components/Classified/Listing/Item/CoverViewer'
import AIcon from '@/components/components/Icon/AIcon'
import AButton from '@/components/components/Button/AButton'
import ItemStat from '@/components/Classified/Listing/ItemStat'

export default {
  name: 'Item',
  props: ['item', 'slug'],
  components: {
    CoverViewer,
    AIcon,
    AButton,
    ItemStat
  },
  data () {
    return {
      showStat: false
    }
  },
  methods: {
    formatPrice (val) {
      return (new Intl.NumberFormat()).format(val)
    }
  }
}
</script>

<style scoped lang="scss">
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
    z-index: 1;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
  }

  &__actions {
    position: relative;
    z-index: 2;
    display: flex;
  }

  &__action {
    margin-left: 6px;
  }
}
</style>
