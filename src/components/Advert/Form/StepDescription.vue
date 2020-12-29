<template>
  <div>
    <div class="control">
      <div class="control__head">
        <div class="control__title">Описание и цена</div>
        <div class="control__value"></div>
      </div>
      <div class="control__body">
        <div class="control__section">
          <div class="control__section-group">
            <div class="input">
              <label class="input__label">
                Цена (
                <span class="control__price">{{ formatPrice }}</span>
                <span class="control__currency">{{ description.currency.toUpperCase() }}</span>
                )
              </label>
              <input type="number" class="input__input" v-model="description.price">
            </div>
            <div class="currencies">
              <label class="currencies__label">&nbsp;.</label>
              <ul class="currencies__list">
                <li class="currencies__radio" v-for="item in currencies" :key="item.code">
                  <label :class="{active : item.code === description.currency}">
                    {{ item.title }}
                    <input type="radio" v-model="description.currency" :value="item.code">
                  </label>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="control__section">
          <div class="textarea">
            <label class="textarea__label">Дополнительное описание</label>
            <textarea class="textarea__input" v-model="description.text"/>
          </div>
        </div>

      </div>
      <div class="control__footer" v-if="showFooter">
        <a @click="showFooter = !showFooter" class="control__btn">Далее</a>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: ['description'],
  name: 'DescAndPriceControl',
  data () {
    return {
      showFooter: true,
      currencies: [
        {
          code: 'usd',
          title: 'USD'
        },
        {
          code: 'eur',
          title: 'EUR'
        },
        {
          code: 'byn',
          title: 'BYN'
        }
      ]
    }
  },
  computed: {
    formatPrice () {
      return (new Intl.NumberFormat()).format(this.description.price)
    }
  }
}
</script>

<style scoped lang="scss">
.control {
  display: flex;
  flex-direction: column;
  margin-top: 18px;

  background: #ffff;
  border-bottom: 1px solid #ebebeb;

  &__head {
    display: flex;
    align-items: center;
    padding: 12px 24px;
  }

  &__footer {
    display: flex;
    align-items: center;
    padding: 16px 24px;
    border-top: 1px solid #ebebeb;
  }

  &__body {
    padding: 12px 24px;
  }

  &__section {
    margin-bottom: 18px;
  }

  &__section-group {
    display: flex;
  }

  &__btn {
    display: inline-block;
    cursor: pointer;
    box-shadow: 0 0 0 1px var(--primary-color) inset, 0 1px 0 rgba(24, 26, 27, 0.08);
    padding: 8px 12px;
    border-radius: 4px;
    transition: all .3s;
    background: var(--primary-color);
    color: var(--white-color);
    text-decoration: none;

    &:hover {
      background: transparent;
      box-shadow: 0 0 0 1px #d3d9df inset, 0 1px 0 rgba(24, 26, 27, 0.08);
      color: var(--font-color);
    }
  }

  &__title {
    font-weight: 500;
    font-size: 18px;

    &:after {
      content: ":";
    }

  }

  &__value {
    cursor: pointer;
    text-transform: uppercase;
    font-weight: 500;
    padding-left: 10px;
    font-size: 18px;
    color: var(--primary-color);

    &:hover {
      color: var(--primary-color);
    }

  }

  &__currency{
    color: var(--primary-color);
    padding-left: 5px;
    font-weight: 500;
  }
}

.input {

  &__label {
    display: block;
    margin-bottom: 8px;
    color: var(--gray-color);
  }

  &__input {
    max-width: 185px;
    box-shadow: 0 0 0 1px #d3d9df inset, 0 1px 0 rgba(24, 26, 27, 0.08);
    padding: 8px 12px;
    border-radius: 4px;
    border: none;
    outline: none;
    color: var(--gray-color);
  }
}

.currencies {
  padding-left: 16px;

  &__label {
    display: block;
    margin-bottom: 8px;
    color: var(--gray-color);
  }

  &__list {
    display: flex;
    align-items: center;

  }

  &__radio {
    padding: 8px 0 0 8px;

    & input {
      display: none;
    }

    & label {
      cursor: pointer;
      font-weight: 600;
    }

    & label.active {
      color: var(--primary-color);
    }
  }
}

.textarea {

  &__label {
    font-weight: 500;
    display: block;
    margin-bottom: 8px;
    color: var(--gray-color);
  }

  &__input {
    width: 400px;
    height: 200px;
    box-shadow: 0 0 0 1px #d3d9df inset, 0 1px 0 rgba(24, 26, 27, 0.08);
    padding: 8px 12px;
    border-radius: 4px;
    border: none;
    outline: none;
    color: var(--gray-color);
  }
}

.phones {
  &__label {
    display: block;
    margin-bottom: 8px;
    color: var(--gray-color);
  }

  &__list {
    margin-bottom: 12px;
  }

  &__item {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
  }

  &__btn-add {
    cursor: pointer;
    text-decoration: none;
    font-weight: 500;
    color: var(--primary-color)
  }

  &__btn-remove {
    cursor: pointer;
    text-decoration: none;
    font-weight: 500;
    color: #f51958;
  }

  &__input {
    max-width: 185px;
    padding-right: 15px;

    .vue-tel-input {
      box-shadow: 0 0 0 1px #d3d9df inset, 0 1px 0 rgba(24, 26, 27, 0.08);
      border-radius: 4px;
      border: none;
      outline: none;
      color: var(--gray-color);

      &:focus-within {
        box-shadow: 0 0 0 1px #d3d9df inset, 0 1px 0 rgba(24, 26, 27, 0.08);
      }
    }

    .vue-tel-input input {
      background: transparent;
      color: var(--gray-color);
    }

    .vti__dropdown {
      height: 18px;
      box-shadow: none;
      border: none;
      border-right: 1px solid #ebebeb;

      &:hover, &:focus, & {
        outline: none;
        background: transparent;
      }
    }

  }
}

</style>
