<template>
  <div class="emails">
    <div class="emails__list">
      <div class="emails__item" v-for="(email, index) in profile.emails" :key="index">

        <ValidationProvider  tag="div" style="width: 100%">
          <input type="text" v-model="profile.emails[index]" class="emails__input" placeholder="Введите email">
        </ValidationProvider>

        <div class="emails__remove">
          <a @click="removeEmail(index)" href="javascript:void(0)" class="link link-danger"
             v-if="profile.emails.length > 1">Удалить</a>
        </div>
      </div>
    </div>
    <a v-if="profile.emails.length < 3" href="javascript:void(0)" class="link link-primary"
       @click.prevent.stop="addEmail">Добавить</a>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'EmailsControl',
  watch: {
    'profile.emails' () {
      if (!this.profile.emails.length) this.addEmail()
    }
  },
  computed: {
    ...mapGetters('profile', ['profile'])
  },
  methods: {
    ...mapMutations('profile', ['addEmail', 'removeEmail'])
  },
  mounted () {
    if (!this.profile.emails.length) this.addEmail()
  }
}
</script>

<style scoped lang="scss">
.emails {
  &__item {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
  }

  &__input {
    box-sizing: border-box;
    display: block;
    width: 100%;
    background-color: var(--white-color);
    outline: none;
    appearance: none;
    border: 1px solid #d9deee;
    padding: 8px 12px;
    border-radius: 6px;
    color: var(--gray-color);
    transition: color 0.15s ease, background-color 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease, -webkit-box-shadow 0.15s ease;

    &::placeholder {
      color: var(--font-muted-color);
    }

    &:focus {
      border: 1px solid var(--primary-color);
      background-color: #f6f6f6;
    }
  }

  &__remove {
    padding-left: 12px;
  }
}
</style>
