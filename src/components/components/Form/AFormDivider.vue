<template>
  <div class="a-form-divider"><slot></slot></div>
</template>

<script>
export default {
  props: {
    offset: {
      type: [Number, String],
      default: 12
    }
  },
  name: 'AFormDivider'
}
</script>

<style scoped lang="scss">
.a-form-divider{
  padding-left: 33.2%;
  margin-top: 36px;
  margin-bottom: 16px;
  font-weight: 500;
  font-size: 16px;
}
</style>
