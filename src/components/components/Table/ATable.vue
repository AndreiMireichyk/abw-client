<template>
  <div>

    <table class="a-table">
      <thead class="a-table-head">
      <tr class="a-table-row">
        <th class='a-table-cell' v-for="(column, index) in columns" :key="index">
          <slot :name="`h-${column.key}`" v-bind:column="column"> {{ column.title }}</slot>
        </th>
      </tr>
      </thead>

      <tbody class="a-table-body" v-if="data.length">
      <tr class="a-table-row" v-for="(item, indexRow) in data" :key="indexRow">
        <td class="a-table-cell" v-for="(column, index) in columns" :key="index">
          <slot :name="`${column.key}`" v-bind:row="item" v-bind:index="indexRow">{{ item[column.key] }}</slot>
        </td>
      </tr>
      </tbody>
      <tbody class="a-table-body" v-else>
      <tr class="a-table-row">
        <td class="a-table-cell not-data" :colspan="columns.length">
          Не данных
        </td>
      </tr>
      </tbody>
    </table>
  </div>

</template>

<script>
export default {
  name: 'ATable',
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped lang="scss">
.a-table {
  font-size: 14px;
  width: 100%;

  &-search {
    display: flex;
    margin-bottom: 24px;
  }

  &-head {
    background: #f3f3f3;
  }

  &-head &-row {
    border-top: 1px solid #f1f1f1;
    border-bottom: 1px solid #f1f1f1;

    &:hover {
      background: transparent;
    }

    &:last-child {
      border-bottom: 1px solid #ededed;
    }
  }

  &-head &-cell {
    font-weight: bold;
  }

  &-row {

    transition: all .3s;

    &:hover {
      background: var(--light-primary-color);
    }

    &:last-child {
      border-bottom: none;
    }

    &:nth-child(2n) {
      background: #f3f3f3;
    }
  }

  &-cell {
    padding: 10px 12px;
    border-right: 1px solid #ededed;
    text-align: center;

    &.not-data {
      padding: 20px;
    }

    &:last-child {
      border-right: none;
    }
  }
}
</style>
