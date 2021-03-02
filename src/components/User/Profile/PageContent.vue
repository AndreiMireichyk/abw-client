<template>
  <div class="page">
    <div class="page__head">
      <div class="page__title">
        <slot name="title"></slot>
      </div>
      <slot name="sort">

      </slot>
    </div>
    <div class="page__body" v-if="hasBodySlot">
      <slot name="body"></slot>
    </div>
    <div class="page__body full" v-if="hasFullBodySlot">
      <slot name="fullBody"></slot>
    </div>
    <div class="page__pagination" v-if="hasPaginationSlot">
      <slot name="pagination"></slot>
    </div>
    <div class="page__footer" v-if="hasFooterSlot">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageContent',
  computed: {
    hasBodySlot () {
      return this.$slots.body
    },
    hasFullBodySlot () {
      return this.$slots.fullBody
    },
    hasFooterSlot () {
      return this.$slots.footer
    },
    hasPaginationSlot () {
      return this.$slots.pagination
    }
  }
}
</script>

<style scoped lang="scss">
.page {
  &__head {
    display: flex;
    align-items: center;
    padding: 24px;
    border-bottom: 1px solid #EBEDF3;

  }

  &__body {
    padding: 24px;
    box-sizing: border-box;

    &.full {
      padding: 0;
    }
  }

  &__pagination {
    padding: 16px;
  }

  &__footer {
    background: #fafbfb;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    border-top: 1px solid #EBEDF3;
    padding: 16px 24px;

    & > * {
      margin-left: 12px;
    }
  }

  &__title {
    flex-grow: 1;
    color: var(--font-color);
    font-weight: 500;
    font-size: 18px;
  }

  &__divider {
    padding-left: 30%;
    margin-top: 36px;
    margin-bottom: 16px;
    font-weight: 500;
    font-size: 16px;
  }
}
</style>
