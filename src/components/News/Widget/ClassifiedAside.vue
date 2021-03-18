<template>
  <div class="widget">
    <div class="widget__title">
      Новости
    </div>
    <div class="widget__item news">
      <div class="news__cover"
           :style="`background-image: url('https://www.abw.by/images/news_photo/219665_1615815232_top.jpg')`"/>
      <div class="news__title">
        Как продать авто выгодно и быстро? Выяснили, как работают аукционы в Беларуси
      </div>
    </div>
    <div class="widget__item news">
      <div class="news__cover"
           :style="`background-image: url('https://www.abw.by/images/news_photo/219698_1615978636.jpg')`"/>
      <div class="news__title">
        "Заливали щебень эмульсией из обычного чайника". Бывший дорожник о том, почему весной "исчезают" дороги
      </div>
    </div>
    <div class="widget__item news">
      <div class="news__cover"
           :style="`background-image: url('https://www.abw.by/images/news_photo/219578_1615368214.jpg')`"/>
      <div class="news__title">
        Кузов после зимы: ужасаемся, ремонтируем, бережем на будущее
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ClassifiedAside'
}
</script>

<style scoped lang="scss">
.widget {
  position: sticky;
  top: 12px;

  &__title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 12px;
  }

  &__item {
    margin-bottom: 16px;
  }

  padding: 24px;
  background: var(--white-bg);
}

.news {
  cursor: pointer;
  &__cover {
    height: 120px;
    background-image: url('https://www.abw.by/images/news_photo/219665_1615815232_top.jpg');
    border-radius: 4px;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    margin-bottom: 8px;
  }

  &__title {
    line-height: 1.2;
    font-weight: 400;
  }

  &:hover &__title {
    color: var(--primary-color);
  }
}
</style>
