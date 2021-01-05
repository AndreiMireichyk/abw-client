<template>
  <div>
    <div class="page" v-if="groups.length">
      <h1 class="page__title">Выберите категорию</h1>

      <div class="categories">
        <ul class="categories__groups">
          <li class="categories__group-item"
              v-for="group in groups"
              :key="group.id"
              :class="{active : group === selectedGroup}"
              @click="choiceGroup(group)"
          >
            {{ group.title }}
          </li>
        </ul>
        <ul class="categories__list" v-if="selectedGroup">
          <li class="categories__item" v-for="category in selectedGroup.categories" :key="category.id">
            <router-link class="categories__item-link" :to="{name: 'ad-form', params:{slug: category.slug}}">
              {{ category.title }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Categories',
  data () {
    return {
      selectedGroup: null,
      groups: []
    }
  },
  methods: {
    choiceGroup (group) {
      this.selectedGroup = group
    },
    fetch () {
      this.$http.get(`${this.$config.host}/api/adverts/categories`)
        .then(r => {
          this.groups = r.data
          if (this.groups.length) {
            this.selectedGroup = this.groups[0]
          }
        })
        .catch(e => {
          alert(e)
        })
    }
  },
  created () {
    this.fetch()
  }
}
</script>

<style scoped lang="scss">
.page {
  padding: 25px;
  max-width: 1200px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.7);
  min-height: 80vh;

  &__title {
    font-size: 44px;
    font-weight: bold;
    line-height: 1;
    margin: 15px 0 40px 0;
  }
}

.categories {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  border-top: 1px solid #ebebeb;
  min-height: 400px;

  &__groups {
    width: 300px;
    min-width: 300px;
    border-right: 1px solid #ebebeb;
  }

  &__group-item {
    padding: 16px 24px;
    color: var(--font-color);
    transition: background-color 0.2s;
    cursor: pointer;

    &.active {
      font-weight: 500;
    }

    &.active, &:hover {
      color: var(--primary-color);
      background: #F1F1F1;
    }
  }

  &__list {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    flex-grow: 1;
    padding: 16px 24px;
  }

  &__item {
    flex-grow: 1;
    width: 25%;
    max-width: 25%;
    margin-bottom: 16px;
  }

  &__item-link {
    text-decoration: none;
    color: var(--gray-color);
    transition: color .2s;

    &:hover {
      font-weight: 500;
      color: var(--primary-color)
    }
  }

}
</style>
