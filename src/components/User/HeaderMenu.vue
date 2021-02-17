<template>
  <ul class="menu">
    <li class="menu__item">
      <router-link class="menu__link" :to="{}">
        <i class="menu__icon  icon-message-square badge"></i>
      </router-link>
    </li>
    <li class="menu__item">
      <router-link class="menu__link" :to="{}">
        <i class="menu__icon icon-bell badge"></i>
      </router-link>
    </li>
    <li class="menu__item">
      <div class="dropdown">
        <div class="dropdown__head">
          <a class="menu__link" @click.stop="showUserMenu = !showUserMenu" href="javascript:void(0)">
            <i class="menu__icon icon-user"></i>
          </a>
        </div>
        <div class="dropdown__list" v-if="showUserMenu">
          <router-link class="dropdown__item" :to="{name: 'user'}">
            <i class="icon-list"></i>
            <span class="dropdown__title">Объявления</span>
            <i class="dropdown__badge">12</i>
          </router-link>
          <a class="dropdown__item">
            <i class="icon-bookmark"></i>
            <span class="dropdown__title">Избранное</span>
            <i class="dropdown__badge">2</i>
          </a>
          <a class="dropdown__item">
            <i class="icon-dollar-sign"></i>
            <span class="dropdown__title">Пополнить</span>
            <i class="dropdown__ie">15,44</i>
          </a>
          <a class="dropdown__item">
            <i class="icon-settings"></i>
            <span class="dropdown__title">Настройки</span>
          </a>
          <a class="dropdown__item" @click="logOut">
            <i class="icon-log-out"></i>
            <span class="dropdown__title">Выйти</span>
          </a>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'HeaderMenu',
  data () {
    return {
      showUserMenu: false,
      showMessageMenu: false,
      showNotificationMenu: false
    }
  },
  methods: {
    ...mapActions('auth', ['logOut'])
  },
  created () {
    document.body.addEventListener('click', () => {
      this.showUserMenu = false
      this.showMessageMenu = false
      this.showNotificationMenu = false
    })
  }
}
</script>

<style scoped lang="scss">
.menu {
  &__item {
    display: flex;
    margin-left: 10px;
  }

  &__link {
    text-decoration: none;
    color: var(--primary-color);

    &:hover {
      color: var(--gray-color);
    }
  }

  &__icon {
    position: relative;
    font-weight: bold;
    font-size: 18px;

    &.badge:after {
      position: absolute;
      top: 0;
      right: 0;
      content: '';
      display: block;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--red-color);
    }
  }
}

.dropdown {
  position: relative;

  &__list {
    min-width: 150px;
    background: var(--white-color);
    box-shadow: 0 8px 20px rgb(0 0 0 / 16%);
    position: absolute;
    top: 20px;
    right: 0;
  }

  &__item {
    text-decoration: none;
    display: flex;
    align-items: center;
    color: var(--font-color);

    cursor: pointer;
    padding: 6px 12px;

    white-space: nowrap;

    i {
      padding-right: 6px;
    }

    &:hover, &.active, &:hover i {
      background: var(--primary-color);
      color: var(--white-color);
    }
  }

  &__title {
    min-width: 95px;
    flex-grow: 1;
  }

  &__badge {
    display: flex;
    align-items: center;
    justify-content: center;

    height: 10px;
    width: 10px;

    font-size: 9px;
    font-weight: bold;
    padding: 3px 3px !important;
    border-radius: 50%;

    color: var(--white-color);
    background: var(--red-color);
  }

  &__ie {
    font-size: 12px;
    font-weight: bold;
    color: var(--gray-color);
    padding-right: 0 !important;
  }
}
</style>
