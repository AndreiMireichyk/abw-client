<template>
  <div>
    <div> hello, im switch {{attribute()}}</div>
  </div>
</template>

<script>
export default {
  props: ['attribute'],
  name: 'SwitchControl'
}
</script>

<style scoped>

</style>
