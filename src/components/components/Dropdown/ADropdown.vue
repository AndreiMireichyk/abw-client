<template>
  <div class="a-dropdown">
    <div class="a-dropdown-head" @click.stop="open = !open">
      <slot></slot>
    </div>
    <div class="a-dropdown-list-wrap">
      <ul class="a-dropdown-list scrollbar" v-if="open" @click.stop>
        <slot name="list"></slot>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ADropdown',
  data () {
    return {
      open: false
    }
  },
  watch: {
    open () {
      this.$emit('onToggleList', this.open)
    }
  },
  created () {
    /*    document.body.addEventListener('click', () => {
      this.open = false
    }, true) */
  }
}
</script>

<style scoped lang="scss">
.a-dropdown {

  &-head {
  }

  &-list-wrap {
    position: relative;
    width: 100%;
    height: 0;
  }

  &-list {
    width: 100%;
    min-width: 150px;
    background: var(--white-color);
    box-shadow: 0 8px 20px rgb(0 0 0 / 16%);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    max-height: 300px;
    overflow-y: auto;
  }
}
</style>
