<template>
  <a href="javascript:void(0)" @click="up" class="scroll_top" :class="{show: show}">
    <a-icon type="chevron-up" class="scroll_top__icon"/>
  </a>
</template>

<script>
import AIcon from '@/components/components/Icon/AIcon'

export default {
  name: 'AUp',
  components: {
    AIcon
  },
  data () {
    return { show: false }
  },
  methods: {
    up () {
      document.body.scrollIntoView({ block: 'start', behavior: 'smooth' })
    }
  },
  created () {
    document.addEventListener('scroll', () => {
      this.show = window.pageYOffset >= 50
    })
  }
}
</script>

<style  lang="scss">
.scroll_top {
  position: fixed;
  bottom: 50px;
  right: -50px;
  z-index: 9999;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--primary-color);
  transition: right .3s;

  cursor: pointer;
  text-decoration: none;
  color: var(--white-color);

  &__icon:before {
    font-size: 24px;
    color: var(--white-color)
  }

  &.show {
    right: 50px;
  }
}
</style>
