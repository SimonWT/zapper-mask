<template>
  <div class="container object-page">
    <h1 class="h1 text-center" v-if="!isEdit">Создание заказа</h1>
    <h1 class="h1 text-center" v-else>Изменение заказа</h1>
    <el-form ref="form" :model="form" label-width="120px">
      <h3 class="h3 mb-4">Информация</h3>
      <el-form-item label="Номер заказа">
        <el-input v-model="form.number"></el-input>
      </el-form-item>
      <el-form-item label="Имя заказа">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-divider></el-divider>
      <el-button type="primary" v-if="!alreadyCreated" @click="createNewObject">Создать</el-button>
      <template v-if="alreadyCreated">
        <h3 class="h3 mb-4">Маска</h3>
        <el-form-item label="Тип задника">
          <el-radio-group v-model="form.backgroundType">
            <el-radio-button label="color">Цвет</el-radio-button>
            <el-radio-button label="file">Картика/Гифка</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          v-if="form.backgroundType === 'color'"
          label="Цвет залвки"
        >
          <el-color-picker v-model="form.color"></el-color-picker>
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
        </el-form-item>
        <el-form-item label="Текст кнопки 1">
          <el-input v-model="form.buttonText1"></el-input>
        </el-form-item>
        <el-form-item label="Текст кнопки 2">
          <el-input v-model="form.buttonText2"></el-input>
        </el-form-item>
        <h3 class="h3 mb-4">QR code</h3>
        <el-form-item label="Zapper Ссылка">
          <el-input v-model="form.link"></el-input>
        </el-form-item>
        <el-button @click="generateLinkWithQR">Сгенерировать Ссылку и QR code</el-button>
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
      default: () => {}
    }
  },
  data() {
    return {
      form: {
        number: '',
        name: '',
        link: '',
        backgroundType: 'color',
        color: '#ffffff',
        notUseLogo: false,
        buttonText1: '',
        buttonText2: ''
      },
      generatedQr: false,
      backgroundFileUrl: '',
      logoUrl: '',
      generatedLink: 'some-link',
      key: undefined
    }
  },
  computed: {
    alreadyCreated(){
        return this.key ? true: false  || this.isEdit
    }
  },
  created() {
      if(this.isEdit){
          this.form.number = this.editData.Number
          this.form.name = this.editData.Name
          this.form.link = this.editData.SourceLink
          this.form.backgroundType = this.editData.BackgroundType
          this.form.color = this.editData.Color
          this.form.notUseLogo = this.editData.NotUseLogo
          this.form.buttonText1 = this.editData.ButtonText1
          this.form.buttonText2 = this.editData.ButtonText2
          this.backgroundFileUrl = this.editData.BackgroundFileUrl
          this.logoUrl = this.editData.LogoUrl
          this.generatedQr = true
          this.generatedLink = this.editData.Link
          this.key = this.editData.key
      }
  },
  methods: {
    beforeLogoUpload(file) {
      let storageRef = this.$fire.storage.ref(
        `/Orders/${this.key}/Logo`
      )
      storageRef.put(file).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log('File available at', downloadURL)
          this.logoUrl = downloadURL
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
    generateLinkWithQR(){
        this.generatedLink = `${process.env.baseUrl}/ar/${this.key}`
        this.generatedQr = true
    },
    async createNewObject(){
        const createResponse = await this.$fire.database.ref(`/Orders`).push({
            Number: this.form.number,
            Name: this.form.name
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
        LogoUrl: this.logoUrl ?? 'https://firebasestorage.googleapis.com/v0/b/zapper-mask.appspot.com/o/default.jpeg?alt=media&token=4f7b6f42-d304-4f83-b36b-23997c8eeb79',
        ButtonText1: this.form.buttonText1,
        ButtonText2: this.form.buttonText2,
        Date: new Date().toISOString().slice(0, 10)
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
