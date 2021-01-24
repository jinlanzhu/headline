<template>
  <div id="profile">
    <profile-info
      ref="profileRef"
      :profile-info="profileInfo"
      :edit-avatar-dialog="editAvatarDialog"
      :preview-img="previewImg"
      @onSaveSetting="onSaveSetting"
      @onChangeFile="onChangeFile"
      @onHandleSure="onHandleSure"
      @onHandleCancel="onHandleCancel"
      @onHandleClose="onHandleClose"
    ></profile-info>
  </div>
</template>

<script>
import {
  getUserProfile,
  updateAvatar,
  updateProfileInfo
} from '@/network/user.js'
import ProfileInfo from './childComps/ProfileInfo'
export default {
  data() {
    return {
      profileInfo: {
        id: null,
        mobile: '',
        name: '',
        intro: '',
        email: '',
        photo: ''
      },
      editAvatarDialog: false,
      // 预览图片地址
      previewImg: ''
    }
  },
  components: {
    ProfileInfo
  },
  created() {
    this.loadProfile()
  },
  methods: {
    loadProfile() {
      getUserProfile().then(res => {
        console.log(res)
        this.profileInfo = res.data
      })
    },
    onSaveSetting() {
      console.log(this)
      this.$refs.profileRef.$refs.profileRuleForm.validate(valid => {
        if (valid) {
          updateProfileInfo(this.profileInfo).then(res => {
            console.log(res)
          })
        } else {
          this.$message.info('请填写必要的信息段！')
          return false
        }
      })
    },
    onChangeFile(file) {
      // const file = this.$refs.profileRef.$refs.file
      // 解决选择相同文件不触发 change 问题
      this.$refs.profileRef.$refs.file.value = ''
      // const data = window.URL.createObjectURL(file)
      console.log(file)
      this.previewImg = file
      this.editAvatarDialog = true
    },
    onHandleCancel() {
      this.editAvatarDialog = false
    },
    onHandleSure(formData) {
      console.log(formData)
      updateAvatar(formData).then(res => {
        console.log(res)
        this.profileInfo.photo = res.data.photo
        this.$message.success('头像修改成功！')
      })
      this.editAvatarDialog = false
    },
    onHandleClose() {
      this.editAvatarDialog = false
    }
  }
}
</script>

<style scoped>
</style>
