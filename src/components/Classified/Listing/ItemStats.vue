<template>
  <div class="stats" v-if="labels.length">
    <div class="stats__head">
      <div class="stats__title">
        Статистика {{ totalViews }}/{{ totalPhone }} ({{ conversion }})
      </div>
      <div class="stats__period">
        <a-select placeholder="Месяц" size="xsmall" :data="rangeData" v-model="range"/>
      </div>
    </div>

    <div class="stats__wrap">

      <div class="stats__item">
        <vue-frappe
          :id="`char-${item.id}`"
          type="line"
          :height="180"
          :labels="labels"
          :colors="['red']"
          :dataSets="this.data"
          v-if="labels.length"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ASelect from '@/components/components/Select/ASelect'

export default {
  name: 'ItemStats',
  props: ['item'],
  components: {
    ASelect
  },
  data () {
    return {
      range: 'week',
      rangeData: [
        {
          id: 'week',
          title: 'Неделя'
        },
        {
          id: 'month',
          title: 'Месяц'
        }
      ],
      labels: [0],
      data: [
        {
          name: 'Просмотр телефона',
          chartType: 'line',
          values: [0]
        },
        {
          name: 'Просмотр объявления',
          chartType: 'line',
          values: [0]
        }]
    }
  },
  computed: {
    totalViews () {
      return this.data[1].values.reduce((a, b) => a + b, 0)
    },
    totalPhone () {
      return this.data[0].values.reduce((a, b) => a + b, 0)
    },
    conversion () {
      if (!this.totalViews || !this.totalPhone) return '0%'

      return `${(this.totalPhone / this.totalViews * 100).toFixed(2)}%`
    }
  },
  watch: {
    range () {
      this.fetch()
    }
  },
  methods: {
    fetch () {
      this.$http.get(`${this.$config.host}/api/adverts/stats/${this.item.id}?range=${this.range}`)
        .then(r => {
          this.labels = r.data.labels.length ? r.data.labels : ['0']
          this.data[0].values = r.data.phone.length ? r.data.phone : [0]
          this.data[1].values = r.data.view.length ? r.data.view : [0]
        })
        .catch(e => {
          alert('error fetch statistic')
        })
    }
  },
  created () {
    this.fetch()
  }
}
</script>

<style scoped lang="scss">
.stats {
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
