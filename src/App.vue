<template>
  <div class="app" id="app">

    <div class="header">
      <div class="header__wrap">
        <div class="header__logo">logo</div>
        <ul class="header__menu">
          <li>
            <router-link :to="{name: 'ad-category'}">Добавить</router-link>
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
    margin: 0;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
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
    }
  }
</style>
