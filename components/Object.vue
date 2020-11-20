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
        <h3 class="h3 mb-4">Маска</h3>
        <el-form-item label="Тип задника">
          <el-radio-group v-model="form.backgroundType">
            <el-radio-button label="color">Цвет</el-radio-button>
            <el-radio-button label="file">Картинка/Гифка</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          v-if="form.backgroundType === 'color'"
          label="Цвет залики"
        >
          <el-color-picker v-model="form.color" show-alpha></el-color-picker>
        </el-form-item>
        <el-form-item v-else label="Картинка/Гифка">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :before-upload="beforeBackgroundUpload"
          >
            <img
              v-if="backgroundFileUrl"
              :src="backgroundFileUrl"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="Логотип">
          <div style="display: flex">
            <div class="">
              <p class="text-center">Логотип 1</p>
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :before-upload="beforeLogoUpload"
              >
                <img v-if="logoUrl" :src="logoUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <el-checkbox
                label="Не использовать логотип"
                name="dontUseLogo"
                v-model="form.notUseLogo"
              ></el-checkbox>
            </div>
            <div class="ml-5">
              <p class="text-center">Логотип 2</p>
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :before-upload="beforeLogoUpload2"
              >
                <img v-if="logoUrl2" :src="logoUrl2" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <el-checkbox
                label="Не использовать логотип"
                name="dontUseLogo"
                v-model="form.notUseLogo2"
              ></el-checkbox>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="Текст кнопки 1">
          <el-input v-model="form.buttonText1"></el-input>
        </el-form-item>
        <el-form-item label="Текст кнопки 2">
          <el-input v-model="form.buttonText2"></el-input>
        </el-form-item>
        <el-form-item label="Цвет кнопки">
          <el-color-picker
            v-model="form.buttonBorderColor"
            show-alpha
          ></el-color-picker>
        </el-form-item>
        <el-form-item label="Цвет заливки кнопки">
          <el-color-picker
            v-model="form.buttonBackColor"
            show-alpha
          ></el-color-picker>
        </el-form-item>
        <el-form-item label="Цвет шрифта кнопки">
          <el-color-picker
            v-model="form.buttonColor"
            show-alpha
          ></el-color-picker>
        </el-form-item>
        <h3 class="h3 mb-4">QR code</h3>
        <el-form-item label="Zapper Ссылка">
          <el-input v-model="form.link"></el-input>
        </el-form-item>
        <el-button @click="generateLinkWithQR"
          >Сгенерировать Ссылку и QR code</el-button
        >
        <div v-if="generatedQr">
          <vue-qr :text="generatedLink"></vue-qr>
          <div class="alert alert-success" role="alert">
            {{ generatedLink }}
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
        link: '',
        backgroundType: 'color',
        color: 'rgba(255,255,255,1)',
        notUseLogo: false,
        notUseLogo2: false,
        buttonColor: 'rgba(0, 105, 255, 1)',
        buttonBackColor: 'rgba(255,255,255,0)',
        buttonBorderColor: 'rgba(0, 105, 255, 1)',
        buttonText1: '',
        buttonText2: '',
      },
      generatedQr: false,
      backgroundFileUrl: '',
      logoUrl: null,
      logoUrl2: null,
      generatedLink: 'some-link',
      key: null,
    }
  },
  computed: {
    alreadyCreated() {
      return this.key ? true : false || this.isEdit
    },
  },
  created() {
    if (this.isEdit) {
      this.form.number = this.editData.Number
      this.form.name = this.editData.Name
      this.form.link = this.editData.SourceLink
      this.form.backgroundType = this.editData.BackgroundType
      this.form.color = this.editData.Color
      this.form.notUseLogo = this.editData.NotUseLogo
      this.form.notUseLogo2 = this.editData.NotUseLogo2
      this.form.buttonText1 = this.editData.ButtonText1
      this.form.buttonText2 = this.editData.ButtonText2
      this.form.buttonColor = this.editData.ButtonColor
      this.form.buttonBackColor = this.editData.ButtonBackColor
      this.form.buttonBorderColor = this.editData.ButtonBorderColor
      this.backgroundFileUrl = this.editData.BackgroundFileUrl
      this.logoUrl = this.editData.LogoUrl
      this.logoUrl2 = this.editData.LogoUrl2
      this.generatedQr = true
      this.generatedLink = this.editData.Link
      this.key = this.editData.key
    } else {
      this.form.number = this.orderNumber
    }
  },
  methods: {
    beforeLogoUpload(file) {
      let storageRef = this.$fire.storage.ref(`/Orders/${this.key}/Logo`)
      storageRef.put(file).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log('File available at', downloadURL)
          this.logoUrl = downloadURL
        })
      })
      return false
    },
    beforeLogoUpload2(file) {
      let storageRef = this.$fire.storage.ref(`/Orders/${this.key}/Logo2`)
      storageRef.put(file).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log('File available at', downloadURL)
          this.logoUrl2 = downloadURL
        })
      })
      return false
    },
    beforeBackgroundUpload(file) {
      let storageRef = this.$fire.storage.ref(`/Orders/${this.key}/Bg`)
      storageRef.put(file).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log('File available at', downloadURL)
          this.backgroundFileUrl = downloadURL
        })
      })
      return false
    },
    generateLinkWithQR() {
      this.generatedLink = `${process.env.baseUrl}/ar/${this.key}`
      this.generatedQr = true
    },
    async createNewObject() {
      const createResponse = await this.$fire.database.ref(`/Orders`).push({
        Number: this.form.number,
        Name: this.form.name,
      })
      console.log(createResponse)
      this.key = createResponse.key
    },
    async sumbit() {
      await this.$fire.database.ref(`/Orders/${this.key}`).update({
        Number: this.form.number,
        Name: this.form.name,
        SourceLink: this.form.link,
        Link: this.generatedLink,
        BackgroundType: this.form.backgroundType,
        Color: this.form.color,
        BackgroundFileUrl: this.backgroundFileUrl,
        NotUseLogo: this.form.notUseLogo,
        NotUseLogo2: this.form.notUseLogo,
        LogoUrl:
          this.logoUrl ??
          'https://firebasestorage.googleapis.com/v0/b/zapper-mask.appspot.com/o/default.jpeg?alt=media&token=4f7b6f42-d304-4f83-b36b-23997c8eeb79',
        LogoUrl2:
          this.logoUrl2 ??
          'https://firebasestorage.googleapis.com/v0/b/zapper-mask.appspot.com/o/default.jpeg?alt=media&token=4f7b6f42-d304-4f83-b36b-23997c8eeb79',
        ButtonText1: this.form.buttonText1,
        ButtonText2: this.form.buttonText2,
        ButtonColor: this.form.buttonColor,
        ButtonBorderColor: this.form.buttonBorderColor,
        ButtonBackColor: this.form.buttonBackColor,
        Date: new Date().toISOString().slice(0, 10),
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
