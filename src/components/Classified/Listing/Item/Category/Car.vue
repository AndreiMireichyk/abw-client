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
export default {
  name: 'Car'
}
</script>

<style scoped>

</style>
