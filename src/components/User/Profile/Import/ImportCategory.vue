<template>
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
        <a class="categories__item-link" href="javascript:void(0)" @click="choiceCategory(category)">
          {{ category.title }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>

import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'ImportCategory',
  data () {
    return {
      selectedGroup: null,
      groups: []
    }
  },
  computed: {
    ...mapGetters('advImport', ['category'])
  },
  methods: {
    ...mapMutations('advImport', { setCategory: 'category' }),
    choiceGroup (group) {
      this.selectedGroup = group
    },
    choiceCategory (category) {
      this.setCategory(category)
      this.$router.push({
        name: 'user.import.file',
        props: { category: category.slug }
      })
    },
    fetchCategories () {
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
    this.fetchCategories()
  }
}
</script>

<style scoped lang="scss">
.categories {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
min-height: 50vh;
  margin: -24px;
  padding-bottom: 24px;

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
      background: #eff2f3;
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
    width: 50%;
    max-width: 50%;
    margin-bottom: 24px;
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
