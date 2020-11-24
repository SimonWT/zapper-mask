<template>
  <div class="container object-page">
    <h1 class="h1 text-center" v-if="!isEdit">Создание заказа</h1>
    <h1 class="h1 text-center" v-else>Изменение заказа</h1>
    <el-form ref="form" :model="form" label-width="auto">
      <h3 class="h3 mb-4">Информация</h3>
      <el-form-item label="Номер заказа">
        <el-input v-model="form.number" disabled></el-input>
      </el-form-item>
      <el-form-item label="Имя заказа">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-divider></el-divider>
      <el-button type="primary" v-if="!alreadyCreated" @click="createNewObject"
        >Создать</el-button
      >
      <template v-if="alreadyCreated">
        <h3 class="h3 mb-4">Маска 1</h3>
        <el-form-item label="Тип задника">
          <el-radio-group v-model="form.mask1.backgroundType">
            <el-radio-button label="color">Цвет</el-radio-button>
            <el-radio-button label="file">Картинка/Гифка</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          v-if="form.mask1.backgroundType === 'color'"
          label="Цвет залики"
        >
          <el-color-picker
            v-model="form.mask1.color"
            show-alpha
          ></el-color-picker>
        </el-form-item>
        <el-form-item v-else label="Картинка/Гифка">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :before-upload="beforeBackgroundUpload1"
          >
            <img
              v-if="form.mask1.backgroundFileUrl"
              :src="form.mask1.backgroundFileUrl"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="Логотип">
          <div style="display: flex">
            <div class="">
              <p class="text-center">Логотип</p>
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :before-upload="beforeLogoUpload1"
              >
                <img
                  v-if="form.mask1.logoUrl"
                  :src="form.mask1.logoUrl"
                  class="avatar"
                />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <el-checkbox
                label="Не использовать логотип"
                name="dontUseLogo"
                v-model="form.mask1.notUseLogo"
              ></el-checkbox>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="Текст кнопки">
          <el-input v-model="form.mask1.buttonText"></el-input>
        </el-form-item>
        <el-form-item label="Цвет кнопки">
          <el-color-picker
            v-model="form.mask1.buttonBorderColor"
            show-alpha
          ></el-color-picker>
        </el-form-item>
        <el-form-item label="Цвет заливки кнопки">
          <el-color-picker
            v-model="form.mask1.buttonBackColor"
            show-alpha
          ></el-color-picker>
        </el-form-item>
        <el-form-item label="Цвет шрифта кнопки">
          <el-color-picker
            v-model="form.mask1.buttonColor"
            show-alpha
          ></el-color-picker>
        </el-form-item>
        <h3 class="h3 mb-4">Маска 2</h3>
        <el-form-item label="Тип задника">
          <el-radio-group v-model="form.mask2.backgroundType">
            <el-radio-button label="color">Цвет</el-radio-button>
            <el-radio-button label="file">Картинка/Гифка</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          v-if="form.mask2.backgroundType === 'color'"
          label="Цвет залики"
        >
          <el-color-picker
            v-model="form.mask2.color"
            show-alpha
          ></el-color-picker>
        </el-form-item>
        <el-form-item v-else label="Картинка/Гифка">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :before-upload="beforeBackgroundUpload2"
          >
            <img
              v-if="form.mask2.backgroundFileUrl"
              :src="form.mask2.backgroundFileUrl"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="Логотип">
          <div style="display: flex">
            <div class="">
              <p class="text-center">Логотип</p>
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :before-upload="beforeLogoUpload2"
              >
                <img
                  v-if="form.mask2.logoUrl"
                  :src="form.mask2.logoUrl"
                  class="avatar"
                />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <el-checkbox
                label="Не использовать логотип"
                name="dontUseLogo"
                v-model="form.mask2.notUseLogo"
              ></el-checkbox>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="Текст кнопки">
          <el-input v-model="form.mask2.buttonText"></el-input>
        </el-form-item>
        <el-form-item label="Цвет кнопки">
          <el-color-picker
            v-model="form.mask2.buttonBorderColor"
            show-alpha
          ></el-color-picker>
        </el-form-item>
        <el-form-item label="Цвет заливки кнопки">
          <el-color-picker
            v-model="form.mask2.buttonBackColor"
            show-alpha
          ></el-color-picker>
        </el-form-item>
        <el-form-item label="Цвет шрифта кнопки">
          <el-color-picker
            v-model="form.mask2.buttonColor"
            show-alpha
          ></el-color-picker>
        </el-form-item>
        <el-divider></el-divider>
        <h3 class="h3 mb-4">QR code</h3>
        <el-form-item label="Zapper Ссылка">
          <el-input v-model="form.sourceLink"></el-input>
        </el-form-item>
        <el-button @click="generateLinkWithQR"
          >Сгенерировать Ссылку и QR code</el-button
        >
        <div v-if="generatedQr">
          <vue-qr :text="form.generatedLink"></vue-qr>
          <div class="alert alert-success" role="alert">
            <a :href="form.generatedLink" target="_blank">{{ form.generatedLink }}</a>
          </div>
        </div>
        <el-form-item class="mt-5 text-center">
          <el-button @click="sumbit" type="primary"> Сохранить </el-button>
        </el-form-item>
      </template>
    </el-form>
  </div>
</template>

<script>
function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  return [year, month, day].join('-')
}

export default {
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
    editData: {
      type: Object,
      default: () => {},
    },
    orderNumber: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      form: {
        number: '',
        name: '',
        sourceLink: '',
        key: null,
        mask1: {
          backgroundType: 'color',
          backgroundFileUrl: '',
          logoUrl: null,
          color: 'rgba(255,255,255,1)',
          notUseLogo: false,
          buttonColor: 'rgba(0, 105, 255, 1)',
          buttonBackColor: 'rgba(255,255,255,0)',
          buttonBorderColor: 'rgba(0, 105, 255, 1)',
          buttonText: '',
        },
        mask2: {
          backgroundType: 'color',
          backgroundFileUrl: '',
          logoUrl: null,
          color: 'rgba(255,255,255,1)',
          notUseLogo: false,
          buttonColor: 'rgba(0, 105, 255, 1)',
          buttonBackColor: 'rgba(255,255,255,0)',
          buttonBorderColor: 'rgba(0, 105, 255, 1)',
          buttonText: '',
        },
        generatedLink: 'some-link',
      },
      generatedQr: false,
    }
  },
  computed: {
    alreadyCreated() {
      return this.form.key ? true : false || this.isEdit
    },
  },
  created() {
    if (this.isEdit) {
      this.form = this.editData
      this.generatedQr = true
    } else {
      this.form.number = this.orderNumber
    }
  },
  methods: {
    beforeLogoUpload1(file) {
      let storageRef = this.$fire.storage.ref(`/Orders/${this.form.key}/Logo`)
      storageRef.put(file).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log('File available at', downloadURL)
          this.form.mask1.logoUrl = downloadURL
        })
      })
      return false
    },
    beforeLogoUpload2(file) {
      let storageRef = this.$fire.storage.ref(`/Orders/${this.form.key}/Logo2`)
      storageRef.put(file).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log('File available at', downloadURL)
          this.form.mask2.logoUrl = downloadURL
        })
      })
      return false
    },
    beforeBackgroundUpload1(file) {
      let storageRef = this.$fire.storage.ref(`/Orders/${this.form.key}/Bg`)
      storageRef.put(file).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log('File available at', downloadURL)
          this.form.mask1.backgroundFileUrl = downloadURL
        })
      })
      return false
    },
    beforeBackgroundUpload2(file) {
      let storageRef = this.$fire.storage.ref(`/Orders/${this.form.key}/Bg2`)
      storageRef.put(file).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log('File available at', downloadURL)
          this.form.mask2.backgroundFileUrl = downloadURL
        })
      })
      return false
    },
    generateLinkWithQR() {
      this.form.generatedLink = `${process.env.baseUrl}/ar/${this.form.key}`
      this.generatedQr = true
    },
    async createNewObject() {
      const createResponse = await this.$fire.database.ref(`/Orders`).push({
        number: this.form.number,
        name: this.form.name,
      })
      console.log(createResponse)
      this.form.key = createResponse.key
    },
    async sumbit() {
      this.form.mask1.logoUrl =
        this.form.mask1.logoUrl ??
        'https://firebasestorage.googleapis.com/v0/b/zapper-mask.appspot.com/o/default.jpeg?alt=media&token=4f7b6f42-d304-4f83-b36b-23997c8eeb79'
      this.form.mask2.logoUrl =
        this.form.mask2.logoUrl ??
        'https://firebasestorage.googleapis.com/v0/b/zapper-mask.appspot.com/o/default.jpeg?alt=media&token=4f7b6f42-d304-4f83-b36b-23997c8eeb79'

      await this.$fire.database.ref(`/Orders/${this.form.key}`).update({
        ...this.form,
        date: new Date().toISOString().slice(0, 10),
      })
      this.$router.push('/admin')
    },
  },
}
</script>

<style lang="scss">
.object-page {
  margin-top: 10vh;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
