<template>
  <div class="page">
    <div class="page__head">
      <div class="page__title">
        <slot name="title"></slot>
      </div>
    </div>
    <div class="page__body">
      <slot name="body"></slot>
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
    hasFooterSlot () {
      return this.$slots.footer
    }
  }
}
</script>

<style scoped lang="scss">
.page {
  &__head {
    display: flex;
    align-items: center;
    padding: 0 24px 24px 24px;
    margin: 0 -24px;
    border-bottom: 1px solid #EBEDF3;
    margin-bottom: 24px;
  }

  &__footer {
    background: #fafbfb;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: 0 -24px -24px -24px;
    border-top: 1px solid #EBEDF3;
    padding: 16px 24px;

    & > * {
      margin-left: 12px;
    }
  }

  &__title {
    flex-grow: 1;
    font-size: 18px;
    font-weight: bold;
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
