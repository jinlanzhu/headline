<template>
  <div class="images-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>素材管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 按钮 -->
      <div class="btns">
        <el-radio-group v-model="colle" @change="onChangeEvent">
          <el-radio-button class="all-images" :label="false"
            >全部</el-radio-button
          >
          <el-radio-button class="collect-images" :label="true"
            >收藏</el-radio-button
          >
        </el-radio-group>

        <el-button
          class="add-images"
          type="success"
          size="small"
          @click="handleAddEvent"
          >添加素材</el-button
        >
        <el-dialog
          title="添加素材"
          :visible.sync="addImagesDialog"
          :append-to-body="true"
          :before-close="handleClose"
        >
          <el-upload
            class="upload-demo"
            drag
            action="http://api-toutiao-web.itheima.net/mp/v1_0/user/images"
            :headers="uploadHeaders"
            :show-file-list="false"
            name="image"
            multiple
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-dialog>
      </div>
      <!-- 素材列表 -->
      <el-row :gutter="30" v-loading="loading">
        <el-col
          :lg="4"
          :md="6"
          :sm="6"
          :xs="12"
          v-for="(item, index) in imagesList"
          :key="index"
        >
          <el-image style="height: 150px" fit="cover" :src="item.url">
          </el-image>
          <div class="option">
            <el-button
              type="warning"
              :icon="item.is_collected ? 'el-icon-star-on' : 'el-icon-star-off'"
              circle
              size="mini"
              @click="onCollectEvent(item)"
              :loading="item.loading"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              size="mini"
              @click="onDeleteEvent(item)"
              :loading="item.loading"
            ></el-button>
          </div>
        </el-col>
      </el-row>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :current-page="currentPage"
        :disabled="loading"
        @current-change="handlePage"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  props: [
    'imagesList',
    'total',
    'loading',
    'addImagesDialog',
    'imageUrl',
    'currentPage',
    'collect'
  ],
  data() {
    const user = JSON.parse(window.sessionStorage.getItem('user'))
    return {
      colle: this.collect,
      uploadHeaders: {
        Authorization: `Bearer ${user.token}`
      }

      // addImagesDialog: false
      // addDialog: this.addImagesDialog
    }
  },
  computed: {
    addDialog: function() {
      return this.addImagesDialog
    }
  },
  components: {},
  methods: {
    handleClose() {
      this.$emit('handelCloseDialog')
    },

    handlePage(page) {
      this.$emit('handlePage', page)
    },
    onChangeEvent(val) {
      console.log(val)
      this.$emit('onChangeEvent', val)
    },
    handleAddEvent() {
      this.$emit('handleAddEvent')
    },
    handleAvatarSuccess(res, file) {
      this.$emit('handleAvatarSuccess', res, file)
    },
    beforeAvatarUpload(file) {
      this.$emit('beforeAvatarUpload', file)
    },
    onCollectEvent(item) {
      this.$emit('onCollectEvent', item)
    },
    onDeleteEvent(item) {
      this.$emit('onDeleteEvent', item)
    }
  }
}
</script>

<style scoped lang="less">
.add-images {
  float: right;
}
.btns {
  padding-bottom: 20px;
}
.el-row {
  // margin: 20px 10px;
  .el-col {
    position: relative;
    margin-bottom: 20px;
  }
  .el-image {
    width: 100%;
    height: 100%;
    border: 1px dashed #ccc;
  }
  .option {
    left: 16px;
    right: 14px;
    height: 30px;
    bottom: 5px;
    opacity: 0.8;
    text-align: center;
    line-height: 30px;
    position: absolute;
    background: #e8eef1;
    border: none;

    .el-button {
      color: #fff;
      margin: 0 20px;
      .el-icon-star-on {
        color: red;
      }
    }
  }
}

// .avatar-uploader .el-upload {
//   border: 1px dashed #d9d9d9;
//   border-radius: 6px;
//   cursor: pointer;
//   position: relative;
//   overflow: hidden;
// }
// .avatar-uploader .el-upload:hover {
//   border-color: #409eff;
// }
// .avatar-uploader-icon {
//   font-size: 28px;
//   color: #8c939d;
//   width: 178px;
//   height: 178px;
//   line-height: 178px;
//   text-align: center;
// }
// .avatar {
//   width: 178px;
//   height: 178px;
//   display: block;
// }
// .upload-demo {
//   width: 100% !important;
// }
// .el-upload {
//   width: 100% !important;
// }
// .el-upload-dragger {
//   width: 100% !important;
// }
</style>
