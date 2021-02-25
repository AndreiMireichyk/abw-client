<template>
  <div class="a-form-divider"><slot></slot></div>
</template>

<script>
export default {
  name: 'AFormDivider'
}
</script>

<style scoped lang="scss">
.a-form-divider{
  padding-left: 30%;
  margin-top: 36px;
  margin-bottom: 16px;
  font-weight: 500;
  font-size: 16px;
}
</style>
