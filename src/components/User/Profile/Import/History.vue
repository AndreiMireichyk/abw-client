<template>
  <div>history</div>
</template>

<script>
export default {
  name: 'History',
  data () {
    return {
      columns: [
        { key: 'id', title: '#' },
        { key: 'category', title: 'Категория' },
        { key: 'total', title: 'Кол-во' }
      ]
    }
  }
}
</script>

<style scoped lang="scss">

</style>
