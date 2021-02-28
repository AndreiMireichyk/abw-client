<template>
  <div class="app" id="app">

    <Header class="header"/>

    <router-view class="content"/>

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

  &>*{
    font-family: var(--font-family) !important;
  }
  text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--font-color);
  font-size: 14px;
  --font-color: rgb(63, 66, 84);
  --font-muted-color: #a7a7ac;
  //--primary-color: #3699ff;
  --primary-color: #1890e7;
  --warning-color: #fa8c16;
  --light-warning-color: #fff7e6;
  --light-primary-color: rgba(54, 153, 255, 0.2);
  --white-color: #ffffff;
  --success-color: #52c41a;
  //--success-color: rgb(27, 197, 189);
  --gray-color: #808080;
  --red-color: #f51958;
  --white-bg: rgba(255, 255, 255, 0.7);
  --input-radius: 4px;

  --input-sm-radius: 4px;
  --input-lg-radius: 6px;

  --danger-color: #ff4d4f;
  --light-danger-color: #fff1f0;
  --light-success-color: #f6ffed;
  --light-gray-color: #d9deee;
  --font-family: 'Roboto', sans-serif;
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

.col {

  &-0 {
    padding: 0 !important;
    width: 0;
  }

  &-1 {
    width: 8.3%;
  }

  &-2 {
    width: 16.6%;
  }

  &-3 {
    width: 24.9%;
  }

  &-4 {
    width: 33.2%;
  }

  &-5 {
    width: 41.5%;
  }

  &-6 {
    width: 50%;
  }

  &-7 {
    width: 58.3%;
  }

  &-8 {
    width: 66.63%;
  }

  &-9 {
    width: 75%;
  }

  &-10 {
    width: 83.3%;
  }

  &-11 {
    width: 91.3%;
  }

  &-12 {
    width: 100%;
  }
}

.text {
  &-left {
    text-align: left;
  }

  &-center {
    text-align: center;
  }

  &-right {
    text-align: right;
  }

  &-primary{
    color: var(--primary-color);
  }
  &-success{
    color: var(--success-color);
  }
  &-danger{
    color: var(--danger-color);
  }
  &-warning{
    color: var(--warning-color);
  }
  &-muted{
    color: var(--font-muted-color);
  }
  &-gray{
    color: var(--gray-color);
  }

  &-bold{
    font-weight: 500;
  }
}
</style>
