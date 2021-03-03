<template>
  <div class="detail">
    <div class="detail__header">
      <h1 class="detail__title">
        {{ data.properties.car_marka }}
        {{ data.properties.car_model }}
        {{ data.properties.car_generation }},
        {{ data.properties.year }} г.в.,
        в {{ data.location.city }}e
      </h1>
      <div class="detail__info">
        <div class="detail__info-item">
          {{ data.updated_at }}
        </div>
        <div class="detail__info-item">
          <a-icon type="eye" style="margin-right: 6px"/>
          {{ data.views.detail }}/{{ data.views.phone }}
        </div>
        <div class="detail__info-item">
          #{{ data.id }}
        </div>
      </div>
    </div>
    <div class="detail__body">
      <div class="detail__group">

        <div class="detail__props">
          <div class="props">
            <div class="props__title">Параметры</div>
            <div class="props__list">
              <div class="props__item">
                <div class="props__label">Год</div>
                <div class="props__value"> {{ data.properties.year }}г.в.</div>
              </div>
              <div class="props__item">
                <div class="props__label">Марка</div>
                <div class="props__value">{{ data.properties.car_marka }}</div>
              </div>
              <div class="props__item">
                <div class="props__label">Модель</div>
                <div class="props__value"> {{ data.properties.car_model }}</div>
              </div>
              <div class="props__item">
                <div class="props__label">Поколение</div>
                <div class="props__value"> {{ data.properties.car_generation }}</div>
              </div>
              <div class="props__item">
                <div class="props__label">Двигатель</div>
                <div class="props__value"> {{ data.properties.car_engine }}</div>
              </div>
              <div class="props__item">
                <div class="props__label">Привод</div>
                <div class="props__value"> {{ data.properties.car_drive }}</div>
              </div>
              <div class="props__item">
                <div class="props__label">Кузов</div>
                <div class="props__value"> {{ data.properties.car_body }}</div>
              </div>
              <div class="props__item">
                <div class="props__label">Коробка</div>
                <div class="props__value"> {{ data.properties.car_transmission }}</div>
              </div>
              <div class="props__item">
                <div class="props__label">Модификация</div>
                <div class="props__value"> {{ data.properties.car_modification }}</div>
              </div>
            </div>
          </div>
          <div class="detail__actions actions">
            <a class="actions__call">
              Контакты
            </a>
            <a class="actions__message">
              Сообщение
            </a>
          </div>
        </div>
        <div class="detail__cover">
          <detail-cover :images="data.images"/>
        </div>
      </div>
      <div class="detail__description description">
        <h2 class="description__title">Комментарий продавца</h2>
        <div class="description__text" v-html="data.description"> </div>
      </div>
      <div class="detail__description description">
        <h2 class="description__title">Дополнительные параметры</h2>
        <div class="description__text" v-html="data.description"> </div>
      </div>
      <pre>
  {{ data }}
</pre>
    </div>
  </div>
</template>

<script>
import DetailCover from '@/components/Classified/Detail/DetailCover'
import AIcon from '@/components/components/Icon/AIcon'

export default {
  name: 'DetailBase',
  props: ['data'],
  components: {
    DetailCover,
    AIcon
  }
}
</script>

<style scoped lang="scss">
.detail {
  &__header {
    padding: 24px;
    border-bottom: 1px solid #f1f1f1;
  }

  &__body {
  }

  &__group {
    display: flex;
    border-bottom: 1px solid #f1f1f1;
  }

  &__title {
    font-weight: bold;
    font-size: 26px;
    margin-bottom: 8px;
  }

  &__info {
    display: flex;
    align-items: center;
  }

  &__info-item {
    display: flex;
    align-items: stretch;
    font-size: 13px;
    color: var(--gray-color);

    &:last-child:after {
      display: none;
    }

    &:after {
      display: block;
      min-height: 100%;
      content: "";
      margin: 0 9px;
      border-right: 1px solid var(--font-muted-color);
      background: #000;
    }
  }

  &__cover {
    flex-grow: 1;
  }

  &__props {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-width: 282px;
    padding: 12px 24px;
    box-sizing: border-box;
  }

  &__description {
    padding: 24px;
  }

  &__actions{
    margin: 0 -24px -12px -24px;
  }

  .props {
    &__title {
      font-weight: bold;
      margin-bottom: 8px;
    }

    &__list {
    }

    &__item {
      display: flex;
      align-items: center;
      padding: 8px 0;
      border-bottom: 1px solid #f1f1f1;
    }

    &__label {
      width: 120px;
      color: var(--gray-color);
    }

    &__value {
    }
  }

  .description {
    &__title {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 12px;
    }

    &__text {
      line-height: 1.3;
      color: var(--font-color);
    }
  }

  .actions {
    display: flex;
    align-items: center;

    &__call, &__message {
      cursor: pointer;
      line-height: 1;
      font-weight: bold;
      color: var(--white-color);
      display: block;
      text-align: center;
      flex-grow: 1;
      padding: 12px;
    }

    &__call{
      background: var(--success-color);
    }
    &__message{
      background: var(--primary-color);
    }
  }
}
</style>
