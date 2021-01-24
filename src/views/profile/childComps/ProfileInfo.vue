<template>
  <div class="profile-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>个人设置</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 个人设置 -->
      <el-form
        :model="profileInfo"
        :rules="profileRules"
        ref="profileRuleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="编号：">
              {{ profileInfo.id }}
              <!-- <el-input v-model="profileInfo.id"></el-input> -->
            </el-form-item>
            <el-form-item label="手机：">
              {{ profileInfo.mobile }}
              <!-- <el-input v-model="profileInfo.mobile"></el-input> -->
            </el-form-item>
            <el-form-item label="媒体名称：" prop="name">
              <el-input v-model="profileInfo.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍：" prop="intro">
              <el-input type="textarea" v-model="profileInfo.intro"></el-input>
            </el-form-item>
            <el-form-item label="邮箱：" prop="email">
              <el-input v-model="profileInfo.email"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="onSaveSetting"
                >保存设置</el-button
              >
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <!-- @click="$refs.file.click()" -->
            <label for="file">
              <el-avatar
                shape="square"
                :size="50"
                :src="profileInfo.photo"
              ></el-avatar>
              <p>修改头像</p>
            </label>
            <input
              type="file"
              ref="file"
              class="file"
              hidden
              id="file"
              @change="onChangeFile"
            />
            <!-- <el-upload
              class="avatar-uploader"
              action="http://api-toutiao-web.itheima.net/mp/v1_0/user/photo"
              name="photo"
              :headers="avatarHeaders"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
            >
              <img
                v-if="profileInfo.photo"
                :src="profileInfo.photo"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <p>修改头像</p> -->
            <el-dialog
              title="修改头像"
              :visible.sync="editAvatarDialog"
              :append-to-body="true"
              :before-close="handleClose"
              @opened="onDialogOpened"
            >
              <div class="preview-img-wraper">
                <img
                  ref="imgRef"
                  id="image"
                  class="preview-img"
                  :src="previewImg"
                />
              </div>
              <span slot="footer" class="dialog-footer">
                <el-button @click="onHandleCancel">取 消</el-button>
                <el-button type="primary" @click="onHandleSure"
                  >确 定</el-button
                >
              </span>
            </el-dialog>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
export default {
  props: ['profileInfo', 'editAvatarDialog', 'previewImg'],
  data() {
    const user = JSON.parse(window.sessionStorage.getItem('user'))
    return {
      profileRules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ],
        intro: [{ required: true, message: '请输入介绍', trigger: 'blur' }],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: ['blur', 'change']
          }
        ]
      },
      avatarHeaders: {
        Authorization: `Bearer ${user.token}`
      },
      cropper: null
    }
  },
  components: {},
  methods: {
    handleAvatarSuccess(res, file) {
      console.log(res)
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    onSaveSetting() {
      this.$emit('onSaveSetting')
    },
    onChangeFile() {
      console.log('file')
      const file = this.$refs.file
      const data = window.URL.createObjectURL(file.files[0])
      console.log(data)

      this.$emit('onChangeFile', data)
    },
    // Dialog 打开动画结束时的回调
    onDialogOpened() {
      const image = this.$refs.imgRef
      console.log(image)
      if (this.cropper) {
        this.cropper.replace(this.previewImg)
        return
      }
      this.cropper = new Cropper(image, {
        aspectRatio: 1,
        viewMode: 1,
        dragMode: 'none',
        cropBoxResizable: false

        // crop(event) {
        //   console.log(event.detail.x)
        //   console.log(event.detail.y)
        //   console.log(event.detail.width)
        //   console.log(event.detail.height)
        //   console.log(event.detail.rotate)
        //   console.log(event.detail.scaleX)
        //   console.log(event.detail.scaleY)
        // }
      })
    },
    handleClose() {
      this.$emit('onHandleClose')
    },
    onHandleCancel() {
      this.$emit('onHandleCancel')
    },
    onHandleSure() {
      this.cropper.getCroppedCanvas().toBlob(file => {
        console.log(file)
        const formData = new FormData()
        formData.append('photo', file)
        console.log(formData)
        this.$emit('onHandleSure', formData)
      })
    }
  }
}
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9 !important;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader {
  text-align: center;
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
.el-avatar {
  width: 178px !important;
  height: 178px !important;
  display: block;
  margin: auto;
  border: 1px dashed #d9d9d9;
}
p,
.el-avatar,
.file {
  text-align: center !important;
}

img.preview-img {
  display: block;
  height: 250px;
  /* This rule is very important, please don't ignore this */
  max-width: 100%;
}
</style>
