<template>
  <i class="a-icon" :class="iconClass"></i>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: true
    },
    spin: {
      type: Boolean,
      default: false
    }
  },
  name: 'AIcon',
  computed: {
    iconClass () {
      return `${this.iconClassType} ${this.iconClassSpin}`
    },
    iconClassType () {
      return `icon-${this.type}`
    },
    iconClassSpin () {
      return this.spin ? 'spin' : ''
    }
  }
}
</script>

<style scoped lang="scss">
.a-icon {
  display: inline-block;

  &.spin {
    animation: loadingCircle 1.2s ease-in-out infinite;
  }

  @keyframes loadingCircle {
    100% {
      transform: rotate(360deg);
    }
  }
}

</style>
