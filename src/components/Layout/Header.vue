<template>
  <div class="header">
    <div class="header__wrap">

      <router-link class="header__logo" to="/">
        <img src="../../assets/logo.svg" alt="logo">
      </router-link>

      <ul class="header__menu menu">
        <li class="menu__item">
          <div class="menu__group">Новости</div>
          <ul class="menu__submenu">
            <li>
              <a class="menu__link" href="">Рубрика 1</a>
            </li>
            <li>
              <a class="menu__link" href="">Рубрика 2</a>
            </li>
            <li>
              <a class="menu__link" href="">Рубрика 3</a>
            </li>
          </ul>
        </li>
        <li class="menu__item" v-for="(group, index) in groups" :key="index">
          <div class="menu__group">{{ group.title }}</div>
          <ul class="menu__submenu">
            <li v-for="(category, key) in group.categories" :key="key">
              <router-link class="menu__link" :to="{name: 'ad-cat-list', params:{slug: category.slug}}">
                {{ category.title }}
              </router-link>
            </li>
          </ul>
        </li>
      </ul>

      <ul class="header__actions">
        <li class="header__action">
          <header-menu v-if="auth"/>
          <router-link class="header__login-btn" :to="{name: 'login'}" v-else>Войти</router-link>
        </li>
        <li class="header__action">
          <router-link class="header__add-btn" :to="{name: 'ad-category'}">Подать объявление</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import HeaderMenu from '@/components/User/HeaderMenu'

export default {
  name: 'Header',
  components: { HeaderMenu },
  data () {
    return {
      groups: []
    }
  },
  computed: {
    ...mapGetters('auth', ['token', 'auth'])
  },
  methods: {
    ...mapActions('auth', ['logOut']),
    fetch () {
      this.$http.get(`${this.$config.host}/api/adverts/categories`)
        .then(r => {
          this.groups = r.data
          if (this.groups.length) {
            this.selectedGroup = this.groups[0]
          }
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
.header {
  position: relative;
  z-index: 6;
  background: rgba(255, 255, 255, 0.7);
  margin-bottom: 24px;

  &__wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1200px;
    margin: 0 auto;
    padding: 16px 0;
  }

  &__logo {
    font-weight: bold;
    font-size: 24px;
    margin-right: 50px;

    img {
      height: 28px;
    }
  }

  &__menu {
    flex-grow: 1;
  }

  &__actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  &__action {
    margin-left: 16px;
  }

  &__login-btn {
    display: flex;
    align-items: center;
    text-decoration: none;
    font-weight: bold;
    color: var(--primary-color);

    &:before {
      margin-right: 4px;
      content: '\e990';
      font-family: icomoon, serif;
      font-size: 16px;
    }
  }

  &__add-btn {
    display: inline-block;
    font-size: 14px;
    padding: 8px 16px;
    background: var(--primary-color);
    color: var(--white-color);
    border-radius: 4px;
    text-decoration: none;
    transition: all .2s;

    &:hover {
      opacity: .8;
    }
  }
}

.menu {
  position: relative;
  top: 3px;
  display: flex;

  &__item {
    position: relative;
    cursor: pointer;
    font-weight: 500;
    margin-right: 16px;
    transition: all .2s;

    &:hover, &.active {
      color: var(--primary-color)
    }
  }

  &__item:hover &__submenu {
    display: block;
  }

  &__submenu {
    z-index: 2;
    padding-top: 22px;
    position: absolute;

    display: none;
    box-shadow: 0 8px 20px rgba(0, 0, 0, .16);
  }

  &__link {
    white-space: nowrap;
    display: block;
    color: var(--font-color);
    text-decoration: none;
    font-weight: 400;
    padding: 12px 16px;

    background: #fff;

    &:hover {
      font-weight: 500;
      background: #f1f1f1;
      color: var(--primary-color);
    }
  }
}
</style>
