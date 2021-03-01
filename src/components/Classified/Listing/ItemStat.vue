<template>
  <div class="stat">
    <div class="stat__head">
      <div class="stat__title">
        Статистика (0.48%)
      </div>
      <div class="stat__period">
        <a-select placeholder="Месяц" size="xsmall" :data="range"/>
      </div>
    </div>

    <div class="stat__wrap">

      <div class="stat__item">
        <vue-frappe
          :id="`char-${item.id}`"
          type="line"
          :height="180"
          :labels="['12.', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']"
          :colors="['red']"
          :dataSets="this.data"
          :loading="true"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ASelect from '@/components/components/Select/ASelect'

export default {
  name: 'ItemStat',
  props: ['item'],
  components: {
    ASelect
  },
  data () {
    return {
      range: [
        { id: 1, title: 'Неделя' },
        { id: 2, title: 'Месяц' }
      ],
      data: [
        {
          name: 'Просмотр телефона',
          chartType: 'line',
          values: [25, 50, -10, 15, 18, 32, 27, 14]
        },
        {
          name: 'Просмотр объявления',
          chartType: 'line',
          values: [15, 20, -3, -15, 58, 12, -17, 37]
        }]
    }
  }
}
</script>

<style scoped lang="scss">
.stat {
  padding: 16px;
  margin-top: -6px;
  background: var(--white-bg);
  min-height: 180px;
  border-top: 1px solid #f1f1f1;
  border-bottom: 1px solid #f1f1f1;

  &__head {
    display: flex;
    align-items: center;
  }

  &__title {
    font-size: 18px;
    font-weight: bold;
    flex-grow: 1;
  }

  &__group {
    display: flex;
    align-items: center;
  }

  &__period {
    max-width: 100px;
  }

  &__nav {
    margin-right: 16px;

    & a:first-child:after {
      padding: 0 6px;
      content: "|";
      color: var(--font-muted-color);
    }
  }

  &__wrap {
    margin: 0 -28px;
  }

}
</style>
