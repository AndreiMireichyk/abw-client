<template>
  <div class="uploader">
    <div class="uploader__progress" :style="{width: progress+'%'}"/>
    <a-icon class="uploader__icon loader" type="loader" :spin="true" v-if="progress"/>
    <a-icon class="uploader__icon" type="upload" v-else/>
    <input class="uploader__input" type="file" ref="file" @change="fileChanged"
           accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
    <p class="uploader__description">Перетащите файл или выберите</p>
  </div>
</template>

<script>
import AIcon from '@/components/components/Icon/AIcon'

export default {
  name: 'ImportUpload',
  components: {
    AIcon
  },
  data () {
    return {
      progress: 0
    }
  },
  methods: {
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
  }
}
</script>

<style scoped lang="scss">
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

  &:hover{
    border-color: var(--primary-color);
  }

  &:hover &__icon{
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
