<template>
  <div class="a-repeater">
    <div class="a-repeater-list">
      <div class="a-repeater-item" v-for="(item, index) in data" :key="index">
        <slot :data="data" :index="index" :item="item"></slot>
        <div class="a-repeater-remove" v-if="data.length > 1">
          <a-link type="danger" weight="bold" @click.native.prevent="$emit('remove', index)">
            Удалить
          </a-link>
        </div>
      </div>
    </div>
    <a-link type="primary" weight="bold" v-if="data.length < limit" @click.native.prevent="$emit('add')">
      Добавить
    </a-link>
  </div>
</template>

<script>
import ALink from '@/components/components/Link/ALink'

export default {
  props: {
    data: {
      type: Array,
      default: () => []
    },
    limit: {
      type: Number,
      default: 3
    }
  },
  components: {
    ALink
  },
  watch: {
    data () {
      if (this.data.length === 0) this.$emit('add')
    }
  },
  name: 'ARepeater',
  mounted () {

  }
}
</script>

<style scoped lang="scss">
.a-repeater {
  &-item {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
  }
  &-remove {
    padding-left: 12px;
  }
}
</style>
