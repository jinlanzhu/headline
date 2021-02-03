<template>
  <div class="upload-cover" @click="showUploadDialog">
    <div class="upload-wrap">
      <img class="preview-cover" ref="preview-cover" :src="value" />
    </div>
    <el-dialog
      title="上传图片素材"
      append-to-body
      :visible.sync="coverDialog"
      :before-close="handleClose"
    >
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="first">
          <!-- <images-checked
            :colle="colle"
            :current-page="currentPage"
            :total="total"
            :images-list="imagesList"
            :loading="loading"
            @handlePage="handlePage"
          /> -->
        </el-tab-pane>
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
import { uploadImage, getImagesList } from '@/network/image.js'
import ImagesChecked from './ImagesChecked'
export default {
  props: ['value'],
  data() {
    return {
      activeName: 'first',
      formData: null,
      coverDialog: false,
      imagesList: [],
      colle: 'false',
      currentPage: 1,
      total: 0,
      loading: false,
      pageSize: 10
    }
  },
  components: {
    ImagesChecked
  },
  created() {
    this.loadImagesList()
  },
  methods: {
    loadImagesList() {
      getImagesList({
        page: this.currentPage,
        per_page: this.pageSize
      }).then(res => {
        console.log(res)
        this.imagesList = res.data.results
        this.total = res.data.total_count
      })
    },
    handleClose() {
      this.coverDialog = false
    },
    showUploadDialog() {
      this.coverDialog = true
    },
    onChangeFile() {
      console.log(this)
      // 获取文件对象
      const file = this.$refs.file.files[0]
      // 预览图片
      const data = window.URL.createObjectURL(file)
      this.$refs['preview-img'].src = data
    },
    onSaveUpload() {
      if (this.activeName === 'second') {
        if (!this.$refs.file.files[0]) {
          this.$message.info('请选择文件！')
          return
        }
        // 获取文件对象
        const file = this.$refs.file.files[0]
        const fd = new FormData()
        fd.append('image', file)
        uploadImage(fd).then(res => {
          console.log(res)
          this.$refs['preview-cover'].src = res.data.url
          this.coverDialog = false
          this.$emit('input', res.data.url)
          // this.$emit('onSaveUpload', res.data.url)
        })
      } else {
        this.$message.info('请选择文件！')
      }
    },
    handlePage(page) {
      this.currentPage = page
      this.loadImagesList(this.currentPage)
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
}
</style>
