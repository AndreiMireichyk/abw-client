<template>
  <div>
    <div class="control">
      <div class="control__title">Фотографии {{images.length}}/30</div>
      <ul class="control__list">
        <li class="control__item add" :class="{loading: queue.length}">
          <input ref="file" type="file" multiple @change="onFileChanged">
        </li>
        <li class="control__item" v-for="(image, index) in images" :key="index"
            :style="{ 'background-image': 'url(' + $config.host+'/'+image.src + ')' }">
          <ul class="control__actions">
            <li class="control__action add" v-if="image.sort !== 0" @click="reSort(index)">Главная</li>
            <li class="control__action remove" @click="remove(index)">Удалить</li>
          </ul>
          <div class="control__main" v-if="image.sort === 0">главная</div>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
export default {
  name: 'PhotoControl',
  data () {
    return {
      selectedFile: null,
      images: [],
      queue: []
    }
  },
  watch: {
    selectedFile () {
      this.onUpload()
    }
  },
  methods: {
    reSort (index) {
      let sort = 1
      this.images = this.images.map((item, i) => {
        if (index === i) {
          item.sort = 0
        } else {
          item.sort = sort
        }

        sort++
        return item
      })
    },
    remove (index) {
      this.images.splice(index, 1)
    },
    onFileChanged (event) {
      event.target.files.forEach((file) => {
        this.onUpload(file)
        this.queue.push(file)
      })
    },
    onUpload (file) {
      const formData = new FormData()
      formData.append('file', file, file.name)

      this.$http.post(`${this.$config.host}/uploader/image`, formData, {
        onUploadProgress: progressEvent => {
          console.log(progressEvent.loaded / progressEvent.total)
        }
      }).then(r => {
        const data = r.data
        data.sort = this.images.length
        this.images.push(data)
        this.queue.splice(0, 1)
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .control {
    padding: 25px 24px 16px 24px;
    background: #eff2f3;

    &__title {
      font-weight: 500;
      font-size: 18px;
      margin-bottom: 24px;
    }

    &__list {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
    }

    &__item {
      background-size: cover;
      background-position: center center;
      overflow: hidden;
      margin-right: 24px;
      width: 140px;;
      height: 140px;
      border-radius: 8px;
      box-shadow: 0 10px 20px rgba(10, 32, 65, 0.5);
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;

      margin-bottom: 24px;

      &.add {
        background: #fff;
        position: relative;
        cursor: pointer;
      }

      &.add input {
        opacity: 0;
        position: absolute;
        width: 140px;;
        height: 140px;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        cursor: pointer;
      }

      &.add.loading:before {
        animation: loading  1s infinite ease-in-out;
      }
      &.add:before {
        content: "+";
        font-size: 100px;
        color: var(--primary-color);
      }
    }

    &__item:hover &__actions {

      opacity: 1;
    }

    &__actions {
      opacity: 0;
      display: flex;
      position: relative;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 140px;;
      height: 140px;
      transition: all .1s;

      &:before {
        z-index: 5;
        content: "";
        background: rgba(0, 0, 0, 0.6);
        position: absolute;
        top: 0;
        right: 0;
        display: block;
        width: 140px;;
        height: 140px;
      }
    }

    &__action {
      position: relative;
      z-index: 10;
      cursor: pointer;
      font-weight: 500;
      padding: 4px 0;
      transition: all .2s;

      &.add {
        color: var(--primary-color);

        &:hover {
          color: var(--white-color);
        }
      }

      &.remove {
        color: var(--red-color);

        &:hover {
          color: var(--white-color);
        }
      }
    }

    &__main {
      border-radius: 0 8px 0 0;
      padding: 4px 6px 4px;
      background: var(--red-color);
      color: var(--white-color);
      position: absolute;
      z-index: 11;
      bottom: 0;
      left: 0;
    }

  }

  @keyframes loading {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }

  }
</style>
