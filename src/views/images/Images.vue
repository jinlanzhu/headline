<template>
  <div id="images">
    <images-list
      :loading="loading"
      :images-list="imagesList"
      :total="total"
      :collect="collect"
      :image-url="imageUrl"
      :current-page="currentPage"
      :add-images-dialog="addImagesDialog"
      @handlePage="handlePage"
      @onChangeEvent="onChangeEvent"
      @handleAddEvent="handleAddImages"
      @handleAvatarSuccess="handleAvatarSuccess"
      @beforeAvatarUpload="beforeAvatarUpload"
      @handelCloseDialog="handelCloseDialog"
      @onCollectEvent="onCollectEvent"
      @onDeleteEvent="onDeleteEvent"
    ></images-list>
  </div>
</template>

<script>
import {
  getImagesList,
  addCollectImages,
  deleteImage
} from '@/network/image.js'
import ImagesList from './childComps/ImagesList'
export default {
  data() {
    return {
      // 是否收藏
      collect: false,
      // 素材列表
      imagesList: [],
      // 总计
      total: 0,
      // 当前页
      currentPage: 1,
      // 每页数量
      pageSize: 12,
      loading: true,
      addImagesDialog: false,
      imageUrl: ''
    }
  },
  components: {
    ImagesList
  },
  created() {
    this.loadImagesList(1)
  },
  methods: {
    loadImagesList(page, msg = false) {
      console.log(msg)
      this.collect = msg
      console.log(this.collect)
      this.loading = true
      getImagesList({
        collect: this.collect,
        page,
        per_page: this.pageSize
      }).then(res => {
        console.log(res)

        this.imagesList = res.data.results
        this.imagesList.forEach(img => {
          img.loading = false
          console.log(img)
        })
        this.total = res.data.total_count
        this.loading = false
      })
    },
    onChangeEvent(val) {
      console.log(val)
      this.loadImagesList(1, val)
    },
    handleAddImages() {
      this.addImagesDialog = true
    },
    handlePage(page) {
      this.currentPage = page
      console.log(this.currentPage)
      this.loadImagesList(this.currentPage)
    },
    handleAvatarSuccess(res, file) {
      console.log(res)
      console.log(file)
      this.addImagesDialog = false
      this.loadImagesList(1, false)
      this.$message.success('上传成功！')
      // this.imageUrl = URL.createObjectURL(file.raw)
    },
    onCollectEvent(item) {
      item.loading = true
      addCollectImages(item.id, !item.is_collected).then(res => {
        console.log(res)
        // res.forEach(item => {

        // });
        item.is_collected = !item.is_collected
        item.loading = false
        if (item.is_collected == true) {
          this.$message.success('收藏成功！')
        } else if (item.is_collected == false) {
          this.$message.success('取消收藏成功！')
        }
      })
    },
    onDeleteEvent(item) {
      item.loading = true
      this.$confirm('此操作将永久删除该图片, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteImage(item.id).then(res => {
            this.loadImagesList(this.currentPage)
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            item.loading = false
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    handelCloseDialog() {
      this.addImagesDialog = false
    },
    beforeAvatarUpload(file) {
      console.log(file)
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style scoped>
</style>
