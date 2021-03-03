<template>
  <div class="cover">
    <div class="cover__view" :class="{empty: !images.length}" :style="{ 'background-image': 'url(' + this.$config.host+ cover + ')' }"></div>
    <div class="cover__nav"></div>
  </div>
</template>

<script>
export default {
  name: 'DetailCover',
  props: ['images'],
  computed: {
    cover () {
      if (this.images.length) {
        return this.images[this.selectedIndex].src
      } else {
        return '/no-image.jpg'
      }
    }
  },
  created () {
    if (this.images.length) this.selectedIndex = 0
  }
}
</script>

<style scoped lang="scss">
.cover {
  background: #f1f1f1;
  width: 100%;
  height: 400px;

  &__view {
    height: 100%;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;

    &.empty {

    }
  }
}
</style>
