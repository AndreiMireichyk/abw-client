<template>
  <div class="item">
    <div class="advert">
      <div class="advert__cover">

        <div class="advert__favorite">
          <a href="javascript:void(0)" @click="favorite" :class="{active: hasFavorite}" class="advert__favorite-btn"/>
        </div>

        <div class="advert__share">
          <a-dropdown>
            <a href="javascript:void(0)" class="advert__share-btn"/>
            <template #list>
              <div>old# {{ item.old_id }}</div>
              <div>2</div>
              <div>3</div>
              <div>4</div>
            </template>
          </a-dropdown>
        </div>
        <div class="advert__share">

        </div>
        <cover-viewer :images="item.images"/>
      </div>
      <div class="advert__info">
        <router-link :to="`/prodaja/${slug}/${esProperties.car_marka}/${esProperties.car_model}/${esProperties.car_generation}/${item.id}`"
                     target="_blank" class="advert__stretch-link"/>
        <div class="advert__left">
          <div>
            <div class="advert__title">
              {{ properties.car_marka }}
              {{ properties.car_model }}
              {{ properties.car_generation }}
            </div>
            <div class="advert__location">
              {{ item.location.country }},
              {{ item.location.city }}
            </div>
          </div>
          <div class="advert__properties">
            {{ properties.car_run_value / 1000 }} тыс.,
            {{ properties.car_engine_volume }}л.,
            {{ properties.year }}г.,
            {{ properties.car_engine }},
            {{ properties.car_transmission }}
          </div>
          <div class="advert__description">
            {{ item.description }}
          </div>
          <div class="advert__tags">
            <div class="advert__tag success" v-if="item.vinVerifed">
              VIN +
            </div>
            <div class="advert__tag primary" v-if="esProperties.car_condition === 'noviy'">
              новый
            </div>
            <div class="advert__tag warning" v-if="item.exchange">
              обмен
            </div>
            <div class="advert__tag danger"  v-if="esProperties.car_condition === 's-povrezhdeniyami'">
              c повреждениями
            </div>
          </div>

        </div>
        <div class="advert__right">

          <div class="advert__actions" v-if="profile.id === item.user_id">

            <div class="advert__action">
              <router-link :to="{name : 'edit-form', params:{slug: slug, id: item.id}}" class="advert__btn">
                <a-icon type="edit"/>
              </router-link>
            </div>

            <div class="advert__action">
              <a href="javascript:void(0)" class="advert__btn" @click.prevent="showStat = !showStat">
                <a-icon type="activity" style="margin-right: 4px"/>
                {{ item.views.detail }}/{{ item.views.phone }}
              </a>
            </div>

            <div class="advert__action">
              <a-dropdown>
                <a href="javascript:void(0)" class="advert__btn">
                  <a-icon type="trash"/>
                </a>
                <template #list>
                  <div>Скрыть</div>
                  <div>Удалить</div>
                </template>
              </a-dropdown>

            </div>
          </div>

          <div class="advert__at">
            {{ 'updated_at' in item ? item.updated_at : null }}
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
    <item-stats v-if="showStat" :item="item" :key="item.id"/>
  </div>
</template>

<script>
import CoverViewer from '@/components/Classified/Listing/Item/CoverViewer'
import AIcon from '@/components/components/Icon/AIcon'
import ItemStats from '@/components/Classified/Listing/ItemStats'
import ADropdown from '@/components/components/Dropdown/ADropdown'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Item',
  props: ['item', 'slug'],
  components: {
    CoverViewer,
    AIcon,
    ItemStats,
    ADropdown
  },
  data () {
    return {
      showStat: false
    }
  },
  computed: {
    ...mapGetters('profile', ['favoriteIds', 'profile']),
    properties () {
      return this.item.properties
    },
    esProperties () {
      return this.item.esProperties
    },
    hasFavorite () {
      return this.favoriteIds.includes(this.item.id)
    }
  },
  methods: {
    ...mapActions('profile', ['toggleFavorite']),
    formatPrice (val) {
      return (new Intl.NumberFormat()).format(val)
    },
    favorite () {
      this.toggleFavorite(this.item.id)
        .then(r => {
          this.$message.success(r.data.message)
        })
        .catch(e => {
          if ('message' in e.request.data) this.$message.success(e.request.data.message)
        })
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
    position: relative;
    min-width: 30%;
    width: 30%;
    height: 200px;
  }

  &__favorite {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 3;
  }

  &__share {
    position: absolute;
    top: 10px;
    left: 40px;
    z-index: 3;
  }

  &__favorite-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    background: var(--white-color);
    padding: 5px;
    border-radius: 4px;
    border: 1px solid var(--light-gray-color);
    color: var(--font-muted-color);
    transition: all .3s;

    &:hover, &.active {
      color: var(--white-color);
      background: var(--primary-color);
      border: 1px solid var(--primary-color);
    }

    &:before {
      font-family: icomoon, serif;
      font-weight: bold;

      content: "\e924";
    }
  }

  &__btn {
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    background: var(--white-color);
    padding: 5px;
    border-radius: 4px;
    border: 1px solid var(--light-gray-color);
    color: var(--font-muted-color);
    transition: all .3s;

    &:hover, &.active {
      color: var(--white-color);
      background: var(--primary-color);
      border: 1px solid var(--primary-color);
    }
  }

  &__share-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    background: var(--white-color);
    padding: 5px;
    border-radius: 4px;
    border: 1px solid var(--light-gray-color);
    color: var(--font-muted-color);
    transition: all .3s;

    &:hover {
      color: var(--white-color);
      background: var(--primary-color);
    }

    &:before {
      font-family: icomoon, serif;
      font-weight: bold;

      content: "\e9d0";
    }
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
    max-width: 460px;
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
    line-height: 1;
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

    &.primary {
      color: var(--primary-color);
      border: 1px solid var(--primary-color);
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
    justify-content: flex-end;
  }

  &__action {
    margin-left: 6px;
  }
}
</style>
