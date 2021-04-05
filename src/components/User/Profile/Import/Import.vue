<template>
  <div>
    <wizard v-if="showWizard" @onClose="openHistory" @onComplete="openHistory"/>
    <div class="import" v-else>
      <div class="import__header">
        <ul class="import__nav">
          <li class="import__nav-item">
            <a-link @click.native="openHistory" type="default" :active="showHistory">История</a-link>
          </li>
          <li class="import__nav-item">
            <a-link @click.native="openSchedule" type="default" :active="showSchedule">Расписание</a-link>
          </li>
        </ul>

      </div>
      <div class="import__body">
        <history v-if="showHistory"/>
        <schedule v-if="showSchedule"/>
      </div>
    </div>
  </div>
</template>

<script>

import Schedule from '@/components/User/Profile/Import/Schedule'
import History from '@/components/User/Profile/Import/History'
import Wizard from '@/components/User/Profile/Import/Wizard'

import ALink from '@/components/components/Link/ALink'

export default {
  name: 'Import',
  components: {

    ALink,
    History,
    Wizard,
    Schedule
  },
  data () {
    return {
      showHistory: true,
      showSchedule: false,
      showWizard: false
    }
  },
  methods: {
    openHistory () {
      this.showHistory = true
      this.showSchedule = false
      this.showWizard = false
    },
    openSchedule () {
      this.showHistory = false
      this.showSchedule = true
      this.showWizard = false
    },
    openWizard () {
      this.showHistory = false
      this.showSchedule = false
      this.showWizard = true
    }
  }
}
</script>

<style scoped lang="scss">
.import {
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__nav {
    display: flex;
  }

  &__nav-item {
    display: flex;

    &:last-child:after {
      display: none;
    }

    &:after {
      content: "";
      display: block;
      min-height: 100%;
      margin: 0 8px;
      border-right: 1px solid rgba(0, 0, 0, 0.18);
    }
  }

  &__add{
    display: flex;
    align-items: center;
  }
}
</style>
