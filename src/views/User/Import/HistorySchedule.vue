<template>
  <div>
    <a-table :columns="columns" :data="items">
      <template #id="{row}">
        <span class="bold">{{ row.id }}</span>
      </template>
      <template #url="{row}">
        <a class="url" :href="row.url">Файл</a>
      </template>
      <template #actions="{row, index}">
        <a class="remove" @click.prevent="remove(index, row.id)" href="javascript:void(0)">Удалить</a>
      </template>
    </a-table>
  </div>
</template>

<script>
import ATable from '@/components/components/Table/ATable'

const columns = [
  {
    key: 'id',
    title: '#'
  },
  {
    key: 'category',
    title: 'Категория'
  },
  {
    key: 'url',
    title: 'Файл'
  },
  {
    key: 'startAt',
    title: 'Время'
  },
  {
    key: 'createdAt',
    title: 'Дата добавления'
  },
  {
    key: 'actions',
    title: ''
  }
]
export default {
  name: 'HistorySchedule',
  components: {
    ATable
  },
  data () {
    return {
      columns: columns,
      items: []
    }
  },
  methods: {
    fetch () {
      this.$http.get(`${this.$config.host}/api/classified/import_schedule/list`)
        .then(r => {
          this.items = r.data.items
        })
        .catch(e => {
          this.$message.error(e.response.data.title)
        })
    },
    removeFromOrigin (id) {
      this.$http.post(`${this.$config.host}/api/classified/import_schedule/destroy/${id}`)
        .then(r => {
          this.$message.success(r.data.message)
        })
        .catch(e => {
          this.fetch()
          this.$message.error(e.response.data.title)
        })
    },
    remove (index, id) {
      this.items.splice(index, 1)
      this.removeFromOrigin(id)
    }
  },
  created () {
    this.fetch()
  }
}
</script>

<style scoped lang="scss">
.bold {
  font-weight: bold;
}

.url {
  text-decoration: none;
  color: var(--primary-color);
}

.remove {
  text-decoration: none;
  color: var(--red-color);
}
</style>
