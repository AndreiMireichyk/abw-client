<template>
  <div class="photo" :style="`background-image: url(${$config.host}${this.profile.photo})`">
    <input class="photo__input" ref="file" type="file" @change="fileChanged">
    <div class="photo__actions">
      <div class="photo__action">
        <a href="javascript:void(0)" @click="selectPhoto" class="link link-primary hw">Изменить</a>
      </div>
      <div class="photo__action" v-if="profile.photo">
        <a href="javascript:void(0)" @click="removePhoto" class="link link-danger hw"> Удалить</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'PhotoControl',
  computed: {
    ...mapGetters('profile', ['profile'])
  },
  methods: {
    ...mapMutations('profile', ['removePhoto', 'setPhoto']),
    selectPhoto () {
      this.$refs.file.click()
    },
    fileChanged (event) {
      event.target.files.forEach((file) => {
        this.upload(file)
      })
    },
    upload (file) {
      const formData = new FormData()
      formData.append('file', file, file.name)

      this.$http.post(`${this.$config.host}/uploader/image`, formData, {
        onUploadProgress: progressEvent => {
          console.log(progressEvent.loaded / progressEvent.total)
        }
      }).then(r => {
        this.setPhoto(r.data.src)
      })
    }
  }
}
</script>

<style scoped lang="scss">
.photo {
  position: relative;
  width: 110px;
  height: 110px;
  border: 1px solid #d9deee;
  border-radius: 6px;
  box-shadow: 0 3px 6px rgb(0 0 0 / 8%);
  overflow: hidden;

  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;

  &:hover .photo__actions {
    opacity: 1;
  }

  &__input {
    display: none;
  }

  &__actions {
    opacity: 0;
    display: flex;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    width: 110px;
    height: 110px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.6);

    transition: opacity .3s;
  }

  &__action {
    font-size: 13px;
    margin-bottom: 3px;
  }
}
</style>
