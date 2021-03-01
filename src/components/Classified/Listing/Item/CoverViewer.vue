<template>
  <div class="cover" :style="{ 'background-image': 'url(' + this.$config.host+ cover + ')' }">

    <div class="cover__pins" v-if="images.length > 1">
      <div class="cover__pin"
           :class="{active: index === selectedIndex}"
           v-for="(image, index) in images" :key="image.id"
           @mouseover="selectedIndex = index"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ['images'],
  name: 'CoverViewer',
  data () {
    return {
      selectedIndex: null
    }
  },
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
  position: relative;
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 100%;

  &__pins {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: stretch;
  }

  &__pin {
    margin: 2px;
    flex-grow: 1;
    border-bottom: 3px solid var(--white-color);
    transition: border-bottom-color .2s;

    &.active {
      border-color: var(--primary-color);
    }
  }
}
</style>
