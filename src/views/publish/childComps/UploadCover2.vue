<template>
  <div class="upload-cover" ref="upload-cover" @click="showUploadDialog">
    <div class="upload-wrap">
      <img ref="preview-cover" class="preview-cover" />
    </div>
    <el-dialog
      title="上传图片素材"
      append-to-body
      :visible.sync="coverDialog"
      :before-close="handleClose"
    >
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="first">素材库</el-tab-pane>
        <el-tab-pane label="上传图片" name="second">
          <input type="file" ref="file" @change="onChangeFile" />
          <img class="preview-img" ref="preview-img" width="150px" />
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="onSaveUpload">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['item', 'coverDialog'],
  data() {
    return {
      activeName: 'first'
    }
  },
  components: {},
  methods: {
    showUploadDialog() {
      this.$emit('showUploadDialog')
    },
    handleClose() {
      this.$emit('handleClose')
    },
    onChangeFile() {
      // 获取文件对象
      const file = this.$refs.file.files[0]
      // 预览图片
      const data = window.URL.createObjectURL(file)
      console.log(data)
      this.$refs['preview-img'].src = data
      this.$emit('onChangeFile', file, data)
    },
    onSaveUpload() {
      if (this.activeName === 'second') {
        if (!this.$refs.file.files[0]) {
          this.$message.info('请选择文件！')
          return
        }
        this.$emit('onSaveUpload')
      } else {
        this.$message.info('请选择文件！')
      }
    }
  }
}
</script>

<style scoped lang="less">
.upload-cover {
  width: 150px;
  height: 150px;
  border: 1px dashed #ddd;
  .upload-wrap {
    width: 150px;
    height: 150px;
    .preview-cover {
      width: 100%;
      height: 100%;
    }
  }

  .preview-img {
    margin-top: 10px;
  }
}
</style>
