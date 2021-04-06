<template>
  <div class="preview" :class="{full:fullscreen}">
    <div class="preview__wrap">
      <div class="preview__header">
        <div class="preview__title">
          Выберите значения
        </div>
        <a href="javascript:void(0)" class="preview__screen">
          <a-icon type="minimize" @click.native="fullscreen = false" v-if="fullscreen"/>
          <a-icon type="maximize" @click.native="fullscreen = true" v-else/>
        </a>
      </div>
      <div class="preview__body">
        <div class="preview__controls">
          <div class="preview__control" v-for="i in columnCnt" :key="i">
            <a-select :data="column" choice-title="title" choice-value="code" placeholder="Выберите"
                      v-model="headline[i]"/>
          </div>
        </div>
        <div class="preview__table">
          <div class="preview__row" v-for="(row, key) in data" :key="key">
            <div class="preview__cell" v-for="(cell, index) in row" :key="index">
              {{ cell }}
            </div>
          </div>
        </div>
      </div>
      <div class="preview__footer">
        <a-button>Сохранить</a-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ASelect from '@/components/components/Select/ASelect'
import AIcon from '@/components/components/Icon/AIcon'
import AButton from '@/components/components/Button/AButton'

export default {
  name: 'ImportPreview',
  components: {
    ASelect,
    AIcon,
    AButton
  },
  data () {
    return {
      fullscreen: false,
      headline: []
    }
  },
  computed: {
    ...mapGetters('advImport', ['category', 'type', 'data', 'column', 'url', 'startAt', 'file']),
    columnCnt () {
      return this.data[0].length
    }
  },
  methods: {}
}
</script>

<style scoped lang="scss">
.preview {

  &.full {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9999;
    background: rgba(0, 0, 0, 0.7);
  }

  &.full &__wrap {
    margin: 50px;
    padding: 20px;
    box-sizing: border-box;
    background: var(--white-color);
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
  }

  &__body {
    overflow-x: scroll;
    margin-bottom: 24px;
  }

  &__controls {
    display: flex;
    align-items: center;
    border-top: 1px solid #0000001f;
    border-bottom: 1px solid #0000001f;
  }

  &__control {
    min-width: 150px;
    padding: 10px;
    box-sizing: border-box;
    border-right: 1px solid #0000001f;
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  &__title {
    font-size: 18px;
  }

  &__table {
    margin-bottom: 16px;
  }

  &__cell {
    padding: 10px;
    min-width: 150px;
    max-width: 150px;
    box-sizing: border-box;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    border-right: 1px solid #0000001f;
  }

  &__row {
    display: flex;
    align-items: stretch;
    border-bottom: 1px solid #0000001f;

    &:first-child {
      font-weight: bold;
    }
  }

  &__screen {
    color: var(--primary-color);
    font-size: 20px;
    text-decoration: none;
    margin-bottom: 6px;
  }
}
</style>
