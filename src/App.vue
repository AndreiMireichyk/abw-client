<template>
  <div class="app" id="app">
    <div class="header">
    <Header/>
    </div>
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>
<script>
import Header from '@/components/Layout/Header'

export default {
  components: { Header }
}
</script>
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
  --red-color: #f51958;
}

.app {
  min-height: 100vh;
  background: #eff2f3;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */
{
  opacity: 0;
}

@keyframes shake {
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
