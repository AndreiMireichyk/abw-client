<template>
  <div class="app" id="app">
    <div class="header">
      <div class="header__wrap">
        <div class="header__logo">

        </div>
        <ul class="header__menu">
          <li>
            <router-link class="header__add-btn" :to="{name: 'ad-category'}">Добавить</router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>

<style lang="scss">
body {

  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--font-color);
  font-size: 14px;
  --font-color: #323232;
  --primary-color: #3699FF;
  --white-color: #ffffff;
  --gray-color: #808080;
}

.app {
  min-height: 100vh;
  background: #eff2f3;
}

.header {
  background: #fff;
  margin-bottom: 24px;

  &__wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1200px;
    margin: 0 auto;
    padding: 25px 0;
  }

  &__logo {
    font-weight: bold;
    font-size: 24px;
  }

  &__add-btn {
    display: block;
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
</style>
