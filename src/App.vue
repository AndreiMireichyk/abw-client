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
@import "assets/font/Icon/style.css";
@import 'assets/messages.css';

body {

  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--font-color);
  font-size: 14px;
  --font-color: rgb(63, 66, 84);
  --font-muted-color: #a7a7ac;
  //--primary-color: #3699ff;
  --primary-color: #1890e7;
  --white-color: #ffffff;
  --success-color: rgb(27, 197, 189);
  --gray-color: #808080;
  --red-color: #f51958;
  --white-bg: rgba(255, 255, 255, 0.7);

  --input-radius: 4px;
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

.scrollbar::-webkit-scrollbar-track {

  background: rgba(0, 0, 0, 0.01);

}

.scrollbar::-webkit-scrollbar {
  width: 5px;
  background-color: #F5F5F5;
}

.scrollbar::-webkit-scrollbar-thumb {
  background: var(--primary-color);
}

.scrollbar::-webkit-scrollbar-thumb:hover {
  background: var(--primary-color);
}

.scrollbar::-webkit-scrollbar-thumb:active {
  background: var(--primary-color);
}

.scrollbar-gray::-webkit-scrollbar-track {

  background: rgba(0, 0, 0, 0.01);

}

.scrollbar-gray::-webkit-scrollbar {
  width: 5px;
  background-color: #F5F5F5;
}

.scrollbar-gray::-webkit-scrollbar-thumb {
  background: #C4C4C4;
}

.scrollbar-gray::-webkit-scrollbar-thumb:hover {
  background: #C4C4C4;
}

.scrollbar-gray::-webkit-scrollbar-thumb:active {
  background: #C4C4C4;
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

.btn {
  display: flex;
  align-items: center;
  font-size: 14px;
  padding: 8px 16px;
  border-radius: 4px;
  text-decoration: none;
  transition: all 0.2s;
  appearance: none;
  border: 0;
  outline: none;
  cursor: pointer;

  i {
    padding-right: 8px;
  }

  &-block {
    width: 100%;
    display: block;
  }
  &-default {
    color: var(--gray-color);
    border: 1px solid #d9deee;
  }

  &-primary {
    background: var(--primary-color);
    color: var(--white-color);
  }
}

.link {
  display: flex;
  cursor: pointer;
  align-items: center;
  text-decoration: none;
  font-weight: 500;
  padding: 0;
  transition: all 0.2s;
  outline: none;
  border: none;
  background: none;
  appearance: none;
  font-family: 'Roboto', sans-serif;

  &-primary {
    color: var(--primary-color);

    &:hover {
      color: var(--font-color);
    }

    &.hw:hover {
      color: var(--white-color);
    }
  }

  &-muted {
    color: var(--font-muted-color);

    &:hover {
      color: var(--font-color);
    }

    &.hw:hover {
      color: var(--white-color);
    }
  }

  &-danger {
    color: var(--red-color);

    &:hover {
      color: var(--font-color);
    }

    &.hw:hover {
      color: var(--white-color);
    }
  }
}

</style>
