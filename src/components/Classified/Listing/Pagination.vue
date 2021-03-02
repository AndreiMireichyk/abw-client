<template>
  <div class="pagination">
    <a href="javascript:void(0)" class="pagination__btn" v-show="showNextPageBtn"
       @click.prevent="$emit('nextPage')">Показать еще</a>
    <div class="pagination__total">На странице {{ showItemCount }} объявлений из {{ pagination.total }}</div>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: ['pagination'],
  computed: {
    showNextPageBtn () {
      return this.pagination.pages > this.pagination.page
    },
    showItemCount () {
      if (this.pagination.total < this.pagination.per_page) {
        return this.pagination.total
      }
      if (this.pagination.page * this.pagination.per_page > this.pagination.total) {
        return this.pagination.total
      }

      return this.pagination.page * this.pagination.per_page
    }
  }
}
</script>

<style scoped lang="scss">
.pagination {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, .7);

  &__btn {
    font-weight: 500;
    color: var(--font-color);
    border-radius: 8px;
    padding: 12px;
    text-decoration: none;
    box-shadow: 0 0 0 1px #d3d9df inset, 0 1px 0 rgba(24, 26, 27, 0.08);
    transition: all .3s;
    margin-right: 16px;

    &:hover {
      color: var(--primary-color);
      box-shadow: 0 0 0 1px var(--primary-color) inset, 0 1px 0 rgba(24, 26, 27, 0.08);
    }
  }

  &__total {
    color: var(--gray-color);
  }
}
</style>
