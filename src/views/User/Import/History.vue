<template>
  <page-content>
    <template #title>
      Импорт объявлений
    </template>
    <template #sort>
      <a-link class="add-btn" type="primary" :to="{name: 'user.import.category'}">
        <a-icon type="plus"/>
        Добавить
      </a-link>
    </template>
    <template #body>
      <div class="history">
        <div class="history__header">
          <ul class="history__nav">
            <li class="history__nav-item">
              <a-link :to="{name: 'user.import.history'}" type="default">История</a-link>
            </li>
            <li class="history__nav-item">
              <a-link :to="{name: 'user.import.history.schedule'}" type="default">Расписание</a-link>
            </li>
          </ul>

        </div>
        <div class="history__body">
          <router-view/>
        </div>
      </div>
    </template>
  </page-content>
</template>

<script>
import PageContent from '@/components/User/Profile/PageContent'
import ALink from '@/components/components/Link/ALink'
import AIcon from '@/components/components/Icon/AIcon'

export default {
  name: 'History',
  components: {
    PageContent,
    ALink,
    AIcon
  }
}
</script>

<style scoped lang="scss">
.add-btn {
  display: flex;
  align-items: center;
}

.history {
min-height: 50vh;
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
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

  &__add {
    display: flex;
    align-items: center;
  }
}
</style>
