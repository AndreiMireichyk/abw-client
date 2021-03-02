<template>
  <div class="user">
    <div class="user__aside aside">

      <div class="aside__header header">
        <div class="header__avatar" :style="avaSrc"></div>
        <div class="header__info">
          <div class="header__login">{{ profile.username }}</div>
          <div class="header__name">{{ profile.firstName }} {{ profile.lastName }}</div>
        </div>
      </div>

      <ul class="aside__info info">
        <li class="info__item">
          <span class="info__title">Баланс</span>
          <span class="info__value">{{ profile.balance }} и.е</span>
        </li>
        <li class="info__item">
          <span class="info__title">Телефон</span>
          <span class="info__value">{{ formattedPhone }}</span>
        </li>
        <li class="info__item" v-if="profile.address">
          <span class="info__title">Адрес</span>
          <span class="info__value">{{ profile.address }}</span>
        </li>
        <li class="info__item" v-if="profile.email">
          <span class="info__title">Email</span>
          <span class="info__value">{{ profile.email }}</span>
        </li>
      </ul>

      <ul class="aside__menu menu">
        <li class="menu__item" :class="{active:menuShowAdverts}" @click="showAdverts">
          <i class="icon-list"></i>
          <span class="menu__title">Мои объявления</span>
          <span class="menu__badge">{{ totalAdverts }}</span>
          <i class="icon-chevron-right"></i>
        </li>
        <li class="menu__submenu" :class="{open: menuShowAdverts}">
          <router-link :to="{name: 'user.adverts', params:{slug: item.slug}}"
                       class="menu__item"
                       v-for="(item, index) in advertCategories"
                       :key="index"
          >
            <i class="icon-minus"/>
            <span class="menu__title">{{ item.title }}</span>
            <span class="menu__badge">{{ item.total }}</span>
          </router-link>
        </li>

        <li class="menu__item" :class="{active:menuShowFavorite}" @click="showFavorites">
          <i class="icon-bookmark"/>
          <span class="menu__title">Избранное</span>
          <span class="menu__badge">15</span>
          <i class="icon-chevron-right"></i>
        </li>
        <li class="menu__submenu" :class="{open: menuShowFavorite}">
          <router-link :to="{name: 'user.personal'}" class="menu__item">
            <i class="icon-minus"/>
            <span class="menu__title">Легковые авто</span>
            <span class="menu__badge">5</span>
          </router-link>
          <router-link :to="{name: 'user.security'}" class="menu__item">
            <i class="icon-minus"/>
            <span class="menu__title">Легковые запчасти</span>
            <span class="menu__badge">5</span>
          </router-link>
          <router-link :to="{name: 'user.notification'}" class="menu__item">
            <i class="icon-minus"/>
            <span class="menu__title">Диски</span>
            <span class="menu__badge">5</span>
          </router-link>
        </li>

        <li class="menu__item" :class="{active:menuShowSetting}" @click="showSettings">
          <i class="icon-settings"/>
          <span class="menu__title">Настройки</span>
          <i class="icon-chevron-right"></i>
        </li>
        <li class="menu__submenu" :class="{open: menuShowSetting}">
          <router-link :to="{name: 'user.personal'}" class="menu__item">
            <i class="icon-user"/>
            <span class="menu__title">Персональные данные</span>
          </router-link>
          <router-link :to="{name: 'user.security'}" class="menu__item">
            <i class="icon-shield"/>
            <span class="menu__title">Безопасность</span>
          </router-link>
          <router-link :to="{name: 'user.notification'}" class="menu__item">
            <i class="icon-bell"/>
            <span class="menu__title">Уведомления</span>
          </router-link>
        </li>

        <li class="menu__item" :class="{active:menuShowBalance}" @click="showBalance">
          <i class="icon-credit-card"/>
          <span class="menu__title">Баланс</span>
          <i class="icon-chevron-right"></i>
        </li>
        <li class="menu__submenu" :class="{open: menuShowBalance}">
          <router-link :to="{name: 'user.balance.refill'}" class="menu__item">
            <i class="icon-plus-square"/>
            <span class="menu__title">Пополнить</span>
          </router-link>
          <router-link :to="{name: 'user.balance.history'}" class="menu__item">
            <i class="icon-activity"/>
            <span class="menu__title">История</span>
          </router-link>
        </li>

        <li class="menu__item" :class="{active:menuShowOther}" @click="showOther">
          <i class="icon-archive"/>
          <span class="menu__title">Импорт / Экспорт</span>
          <i class="icon-chevron-right"></i>
        </li>
        <li class="menu__submenu" v-if="menuShowOther">
          <router-link :to="{name: 'user.personal'}" class="menu__item">
            <i class="icon-user"/>
            <span class="menu__title">Персональные данные</span>
          </router-link>
          <router-link :to="{name: 'user.security'}" class="menu__item">
            <i class="icon-shield"/>
            <span class="menu__title">Безопасность</span>
          </router-link>
          <router-link :to="{name: 'user.notification'}" class="menu__item">
            <i class="icon-bell"/>
            <span class="menu__title">Уведомления</span>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="user__body">
      <router-view/>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'User',
  data () {
    return {
      value: null,
      menuShowAdverts: false,
      menuShowFavorite: false,
      menuShowSetting: false,
      menuShowOther: false,
      menuShowBalance: false,
      data: [
        {
          id: 1,
          title: 'РБ'
        },
        {
          id: 2,
          title: 'РФ'
        },
        {
          id: 3,
          title: 'БУ'
        },
        {
          id: 4,
          title: 'РБ'
        },
        {
          id: 5,
          title: 'РБ'
        },
        {
          id: 7,
          title: 'РБ'
        }
      ]
    }
  },
  computed: {
    ...mapGetters('profile', ['profile', 'formattedPhone', 'advertCategories', 'totalAdverts']),
    avaSrc () {
      // eslint-disable-next-line quotes
      return `background-image: url(${this.$config.host}${this.profile.photo})`
    }
  },
  methods: {
    ...mapActions('profile', {
      fetchProfile: 'profile',
      fetchAdvertCategories: 'advertCategories'
    }),
    showAdverts () {
      this.menuShowAdverts = !this.menuShowAdverts
      this.menuShowFavorite = false
      this.menuShowSetting = false
      this.menuShowOther = false
      this.menuShowBalance = false
    },
    showFavorites () {
      this.menuShowAdverts = false
      this.menuShowFavorite = !this.menuShowFavorite
      this.menuShowSetting = false
      this.menuShowOther = false
      this.menuShowBalance = false
    },
    showSettings () {
      this.menuShowAdverts = false
      this.menuShowFavorite = false
      this.menuShowSetting = !this.menuShowSetting
      this.menuShowOther = false
      this.menuShowBalance = false
    },
    showOther () {
      this.menuShowAdverts = false
      this.menuShowFavorite = false
      this.menuShowSetting = false
      this.menuShowOther = !this.menuShowOther
      this.menuShowBalance = false
    },
    showBalance () {
      this.menuShowAdverts = false
      this.menuShowFavorite = false
      this.menuShowSetting = false
      this.menuShowOther = false
      this.menuShowBalance = !this.menuShowBalance
    }
  },
  created () {
    if (this.$route.path.indexOf('/user/adverts') >= 0) this.showAdverts()
    if (this.$route.path.indexOf('/user/settings') >= 0) this.showSettings()
    if (this.$route.path.indexOf('/user/favorites') >= 0) this.showFavorites()
    if (this.$route.path.indexOf('/user/balance') >= 0) this.showBalance()
    if (this.$route.path.indexOf('/user/other') >= 0) this.showOther()

    this.fetchProfile()
    this.fetchAdvertCategories()
  }
}
</script>

<style scoped lang="scss">
.user {
  display: flex;
  box-sizing: border-box;
  align-items: flex-start;
  margin: 0 auto;
  max-width: 1200px;
  padding: 24px;
  min-height: 80vh;

  &__aside {
    min-width: 300px;
    max-width: 300px;
    box-sizing: border-box;
    background: var(--white-bg);
    margin-right: 24px;
    padding: 24px;
    position: sticky;
    top: 15px;
  }

  &__body {
    background: var(--white-bg);
    flex-grow: 1;
    align-self: stretch;
  }

  .aside {

    &__header {
      margin-bottom: 24px;
    }

    &__info {
      margin-bottom: 24px;
    }

    &__menu {

    }

  }

  .header {
    display: flex;

    &__avatar {
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
      border-radius: 9px;
      min-width: 90px;
      min-height: 90px;
      margin-right: 18px;
      box-shadow: 0 3px 6px rgb(0 0 0 / 8%);
    }

    &__info {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      overflow: hidden;

    }

    &__login {
      font-size: 20px;
      font-weight: bold;
      line-height: 1;
      margin-bottom: 8px;
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &__name {
      color: var(--font-muted-color);
      font-size: 13px;
      margin-bottom: 6px;
    }

    &__link {
      cursor: pointer;
      font-size: 13px;
      text-align: center;
      padding: 6px 2px;;
      text-decoration: none;
      color: var(--white-color);
      background: var(--success-color);
      border-radius: 4px;
    }
  }

  .info {

    &__item {
      font-size: 12px;
      display: flex;
      align-items: center;
      margin-bottom: 12px;
    }

    &__title {
      display: flex;
      font-weight: 500;
      color: var(--font-color);
      flex-grow: 1;
    }

    &__value {
      color: var(--font-muted-color);
    }
  }

  .menu {
    margin: 0 -24px;

    &__item {
      text-decoration: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      padding: 12px 24px;
      color: var(--font-color);

      i:first-child {
        position: relative;
        top: -1px;
        font-size: 16px;
        padding-right: 8px;
      }

      &:hover, &.active, &.router-link-active, &.router-link-exact-active {
        background: #eff2f3;
        color: var(--primary-color);
      }

      .icon-chevron-right {
        transition: all .3s;
      }

      &.active .icon-chevron-right {
        transform: rotate(90deg);
      }
    }

    &__submenu {
      background: #eff2f3;
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.35s ease-out;

      &.open {
        max-height: 500px;
        transition: max-height 0.35s ease-in;
      }
    }

    &__submenu .menu__badge {
      padding-right: 16px;
    }

    &__badge {
      font-size: 13px;
      color: var(--primary-color);
      padding-right: 3px;
    }

    &__title {
      flex-grow: 1;
    }
  }
}

.fade-enter-active, .fade-leave-active {

}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
{
  height: 0;
}
</style>
