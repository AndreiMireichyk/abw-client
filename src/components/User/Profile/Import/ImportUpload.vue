<template>
  <div class="file">

    <div class="file__title">
      {{ category.title }}
    </div>

    <div class="file__description">
      Выберите удобный метод импорта, загрузите файл или укажите ссылку.
    </div>
    {{ type }}
    <ul class="file__nav">
      <li class="file__nav-item">
        <a-link type="default" :to="{name: 'user.import.file'}">файл</a-link>
      </li>
      <li class="file__nav-item">
        <a-link type="default" :to="{name: 'user.import.schedule'}">ссылка</a-link>
      </li>
    </ul>

    <div class="file__upload">
      <div class="uploader">
        <div class="uploader__progress" :style="{width: progress+'%'}"/>
        <a-icon class="uploader__icon loader" type="loader" :spin="true" v-if="progress"/>
        <a-icon class="uploader__icon" type="upload" v-else/>
        <input class="uploader__input" type="file" ref="file" @change="fileChanged"
               accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
        <p class="uploader__description">Перетащите файл или выберите</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import AIcon from '@/components/components/Icon/AIcon'
import ALink from '@/components/components/Link/ALink'

export default {
  name: 'ImportUpload',
  components: {
    AIcon,
    ALink
  },
  data () {
    return {
      progress: 0
    }
  },
  computed: {
    ...mapGetters('advImport', ['category', 'type'])
  },
  methods: {
    ...mapMutations('advImport', { setType: 'type' }),
    complete (response) {
      this.progress = 0
      this.$refs.file.value = null
      this.$message.success(response.message)
      this.$emit('onComplete', response.path)
    },
    failure (response) {
      this.progress = 0
      this.$refs.file.value = null
      this.$message.error(response.file[0])
    },
    fileChanged (event) {
      event.target.files.forEach((file) => {
        this.upload(file)
      })
    },
    upload (file) {
      const formData = new FormData()
      formData.append('form[file]', file, file.name)

      this.$http.post(`${this.$config.host}/uploader/import`, formData, {
        onUploadProgress: progressEvent => {
          this.progress = Math.ceil((progressEvent.loaded / progressEvent.total) * 100)
        }
      }).then(r => {
        this.complete(r.data)
      }).catch(e => {
        this.failure(e.response.data)
      })
    }
  },
  mounted () {
    this.setType('upload')
  }
}
</script>

<style scoped lang="scss">
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

  &__upload {
    display: flex;
    justify-content: center;
  }

}

.uploader {
  position: relative;
  width: 500px;
  height: 200px;
  border: 1px solid #0000001f;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f1f1f1;
  overflow: hidden;
  transition: border .3s;

  &:hover {
    border-color: var(--primary-color);
  }

  &:hover &__icon {
    color: var(--primary-color);
  }

  &__input {
    position: absolute;
    min-width: 100%;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    opacity: 0;
    cursor: pointer;
  }

  &__icon {
    font-size: 42px;
    color: var(--font-muted-color);
    margin-bottom: 12px;
    transition: color .3s;

    &.loader {
      color: var(--primary-color);
    }
  }

  &__description {
    color: var(--font-muted-color);
  }

  &__progress {
    height: 2px;
    width: 0;
    background: var(--primary-color);
    position: absolute;
    bottom: 0;
    transition: width .2s;
  }
}
</style>
