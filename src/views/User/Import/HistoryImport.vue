<template>
  <div>
    <a-table :columns="columns" :data="items">
      <template #id="{row}">
        <span class="bold">{{ row.id }}</span>
      </template>
      <template #path="{row}">
        <a class="url" :href="row.path">Файл</a>
      </template>
      <template #status="{row}">
        <div class="status">
          <div class="status status-O" v-if="row.status === 0">В очереди</div>
          <div class="status status-1" v-if="row.status === 1">
            <a-icon type="loader" :spin="true"/>
            Обработка
          </div>
          <div class="status status-2" v-if="row.status === 2">
            <a-icon type="check-circle"/>
            Готово
          </div>
          <div class="status status-3" v-if="row.status === 3">
            <a-icon type="x-circle"/>
            Ошибка
          </div>
        </div>
      </template>
      <template #actions="{row, index}">
        <a class="remove" @click.prevent="remove(index, row.id)" href="javascript:void(0)">Удалить</a>
      </template>
    </a-table>
  </div>
</template>

<script>
import ATable from '@/components/components/Table/ATable'
import AIcon from '@/components/components/Icon/AIcon'

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
    key: 'path',
    title: 'Файл'
  },
  {
    key: 'rows',
    title: 'Всего'
  },
  {
    key: 'failure',
    title: 'Ошибок'
  },
  {
    key: 'success',
    title: 'Успех'
  },
  {
    key: 'status',
    title: 'Статус'
  },
  {
    key: 'createdAt',
    title: 'Дата'
  },
  {
    key: 'actions',
    title: ''
  }
]

export default {
  name: 'HistoryImport',
  components: {
    ATable,
    AIcon
  },
  data () {
    return {
      columns: columns,
      items: [],
      pagination: {}
    }
  },
  methods: {
    fetch () {
      this.$http.get(`${this.$config.host}/api/classified/import/list`)
        .then(r => {
          this.items = r.data.items
        })
        .catch(e => {
          this.$message.error(e.response.data.title)
        })
    },
    removeFromOrigin (id) {
      this.$http.post(`${this.$config.host}/api/classified/import/destroy/${id}`)
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

.status {
  display: flex;
  align-items: center;
  justify-content: center;

  i {
    position: relative;
    top: -1px;
    margin-right: 4px;
  }

  &-0 {
    color: var(--light-gray-color);
  }

  &-1 {
    color: var(--primary-color);
  }

  &-2 {
    color: var(--success-color);
  }

  &-3 {
    color: var(--red-color);
  }
}
</style>
