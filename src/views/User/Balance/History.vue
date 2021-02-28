<template>
  <page-content>
    <template v-slot:title>
      История пополнений и платежей
    </template>
    <template v-slot:body>
      <a-table :columns="columns" :data="data">
        <template #id="{row}">
          <div class="text-center text-primary">
            {{ row.id }}
          </div>
        </template>
        <template #date="{row}">
          <div class="text-center">
            {{ row.date }}
          </div>
        </template>
        <template #sum="{row}">
          <div class="text-center ">+{{ row.sum }} BYN</div>
        </template>
        <template #type="{row}">
          <div class="text-center text-danger">{{ row.type }}</div>
        </template>
        <template #desc="{row}">
          <div class="text-center">{{ row.desc }}</div>
        </template>
        <template #status="{row}">
          <div class="text-center">
            <a-tag type="danger">
              {{ row.status }}
            </a-tag>
            </div>
        </template>

      </a-table>
    </template>
  </page-content>
</template>

<script>
import PageContent from '@/components/User/Profile/PageContent'
import ATable from '@/components/components/Table/ATable'
import ATag from '@/components/components/Tag/ATag'
export default {
  name: 'History',
  components: {
    PageContent,
    ATable,
    ATag
  },
  data () {
    return {
      columns: [
        { key: 'id', title: 'Номер' },
        { key: 'date', title: 'Дата' },
        { key: 'sum', title: 'Сумма' },
        { key: 'desc', title: 'Описание' },
        { key: 'status', title: 'Статус' }
      ],
      data: [
        { id: '78542', date: '12/11/91 10:11', type: 'Списание', sum: 3.15, desc: 'Зачисление (ipay)', status: 'Ожидает' },
        { id: '78542', date: '12/11/91 10:11', type: 'Списание', sum: 3.15, desc: 'Зачисление (ipay)', status: 'Оплачено' },
        { id: '78542', date: '12/11/91 10:11', type: 'Списание', sum: 3.15, desc: 'Зачисление (ipay)', status: 'Ожидает' },
        { id: '78542', date: '12/11/91 10:11', type: 'Списание', sum: 3.15, desc: 'Зачисление (ipay)', status: 'Ожидает' },
        { id: '78542', date: '12/11/91 10:11', type: 'Списание', sum: 3.15, desc: 'Зачисление (ipay)', status: 'Ожидает' },
        { id: '78542', date: '12/11/91 10:11', type: 'Списание', sum: 3.15, desc: 'Зачисление (ipay)', status: 'Ожидает' },
        { id: '78542', date: '12/11/91 10:11', type: 'Списание', sum: 3.15, desc: 'Зачисление (ipay)', status: 'Ожидает' },
        { id: '78542', date: '12/11/91 10:11', type: 'Списание', sum: 3.15, desc: 'Зачисление (ipay)', status: 'Ожидает' },
        { id: '78542', date: '12/11/91 10:11', type: 'Списание', sum: 3.15, desc: 'Зачисление (ipay)', status: 'Ожидает' },
        { id: '78542', date: '12/11/91 10:11', type: 'Списание', sum: 3.15, desc: 'Зачисление (ipay)', status: 'Ожидает' },
        { id: '78542', date: '12/11/91 10:11', type: 'Списание', sum: 3.15, desc: 'Зачисление (ipay)', status: 'Ожидает' },
        { id: '78542', date: '12/11/91 10:11', type: 'Списание', sum: 3.15, desc: 'Зачисление (ipay)', status: 'Ожидает' }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
.table {
  display: table;
}
</style>
