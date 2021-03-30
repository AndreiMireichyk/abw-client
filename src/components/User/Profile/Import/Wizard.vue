<template>
  <div class="wizard">
    <!--    <div class="wizard__header">
          <div class="wizard__title">
            {{title}}
          </div>

        </div>-->
    <a href="javascript:void(0)" @click.prevent="$emit('onClose')" class="wizard__close">
      <a-icon type="x"/>
    </a>

    <div class="wizard__category" v-if="selectedCategory === null">
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
            <a class="categories__item-link" href="javascript:void(0)" @click="selectedCategory = category">
              {{ category.title }}
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div class="wizard__file file" v-else-if="selectedCategory">

      <div class="file__title">
        {{ selectedCategory.title }}
      </div>

      <div class="file__description">
        Выберите удобный метод импорта, загрузите файл или укажите ссылку.
      </div>

      <ul class="file__nav">
        <li class="file__nav-item">
          <a-link type="default" :active="showUploader" @click.native="openUploader">файл</a-link>
        </li>
        <li class="file__nav-item">
          <a-link type="default" :active="showSchedule" @click.native="openSchedule">ссылка</a-link>
        </li>
      </ul>

      <div class="file__upload upload" v-if="showUploader">
        <div class="upload">
          <a-upload/>
        </div>
        <div class="file__actions">
          <a-button>Далее</a-button>
        </div>
      </div>

      <div class="file__schedule schedule" v-if="showSchedule">
        <div class="schedule">
          <a-input/>
          <a-input/>
          <pre>
            Ссылка по расписанию
            1. Ссылка
            2. Время
          </pre>
        </div>
        <div class="file__actions">
          <a-button>Далее</a-button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import AUpload from '@/components/components/Upload/AUpload'
import AInput from '@/components/components/Input/AInput'
import AIcon from '@/components/components/Icon/AIcon'
import AButton from '@/components/components/Button/AButton'
import ALink from '@/components/components/Link/ALink'

export default {
  name: 'Wizard',
  components: {
    ALink,
    AIcon,
    AButton,
    AInput,
    AUpload
  },
  data () {
    return {
      showUploader: true,
      showSchedule: false,
      selectedCategory: null,
      selectedGroup: null,
      groups: []
    }
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    title () {
      if (this.selectedCategory === null) {
        return 'Выберите категорию'
      } else if (this.selectedCategory) {
        return 'Загрузите файл или ссылку'
      }
    }
  },
  methods: {
    choiceGroup (group) {
      this.selectedGroup = group
    },
    openUploader () {
      this.showUploader = true
      this.showSchedule = false
    },
    openSchedule () {
      this.showUploader = false
      this.showSchedule = true
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
.wizard {
  position: relative;
  margin-top: -24px;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
  }

  &__title {
    font-weight: 400;
    font-size: 16px;
    color: var(--gray-color);
  }

  &__close {
    position: absolute;
    top: -48px;
    right: 0;
    color: var(--font-color);
    font-size: 26px;
    line-height: 1;
  }

}

.categories {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  margin: 0px -24px;

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

.file {
  margin: auto auto;
  padding-top: 24px;

  &__title {
    text-align: center;
    font-size: 32px;
    font-weight: 500;
    margin-bottom: 16px;
  }

  &__description {
    font-size: 14px;
    text-align: center;
    margin-bottom: 16px;
    color: var(--gray-color);
  }

  &__nav {
    display: flex;
    justify-content: center;
    margin-bottom: 24px;
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

  &__actions {
    border-top: 1px solid #f1f1f1;
    padding: 16px 24px;
    margin: 24px -24px -24px -24px;
    display: flex;
    justify-content: flex-end;
  }

}
</style>
