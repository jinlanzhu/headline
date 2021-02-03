<template>
  <div id="publish">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑路径导航 -->
        <publish-nav></publish-nav>
      </div>
      <publish-form
        ref="publishRef"
        :article="article"
        :channels="channels"
        @handlePublish="loadPublishArticle"
      ></publish-form>
    </el-card>
  </div>
</template>

<script>
import {
  getArticleChannels,
  getArticleList,
  addArticle,
  getArticleById,
  updateArticleById
} from '@/network/article.js'

import PublishNav from './childComps/PublishNav'
import PublishForm from './childComps/PublishForm'

export default {
  data() {
    return {
      channels: [],
      article: {
        // 文章标题
        title: '',
        // 文章内容
        content: '',
        // 文章封面
        cover: {
          type: 0,
          images: []
        },
        // 频道
        channel_id: null
      },
      draft: false
      // coverDialog: false,
      // formData: null
    }
  },
  components: {
    PublishNav,
    PublishForm
  },
  created() {
    this.loadArticleChannels()
    if (this.$route.query.id) {
      this.loadArticleById()
    }
  },
  methods: {
    // 加载频道
    loadArticleChannels() {
      getArticleChannels().then(res => {
        console.log(res)
        this.channels = res.data.channels
      })
    },
    // 添加文章
    loadPublishArticle(msg) {
      console.log(msg)
      this.draft = msg
      console.log(this.draft)
      // console.log(draft)
      console.log(this.article)

      // 如果有路径后有文章id，则执行修改操作，若没有，则执行添加操作
      if (this.$route.query.id) {
        updateArticleById(this.$route.query.id, this.article, this.draft).then(
          res => {
            console.log(res)
            this.$refs.publishRef.$refs.publishForm.validate(valid => {
              if (valid) {
                this.$router.push({ name: 'article' })
                this.$message.success('更新成功！')
              } else {
                this.$message.warning('请填写必须字段！')
              }
            })
          }
        )
      } else {
        addArticle(this.article, this.draft).then(res => {
          console.log(res)
          console.log(this)
          this.$refs.publishRef.$refs.publishForm.validate(valid => {
            if (valid) {
              this.$router.push({ name: 'article' })
              this.$message.success('发布成功！')
            } else {
              this.$message.warning('请填写必须字段！')
            }
          })
        })
      }
    },
    loadArticleById() {
      getArticleById(this.$route.query.id).then(res => {
        console.log(res)
        this.article = res.data
      })
    },
    showUploadDialog() {
      this.coverDialog = true
    },
    handleClose() {
      this.coverDialog = false
    },
    handleAvatarSuccess(res, file) {
      const fd = new FormData()
      fd.append('image', file.raw)
      console.log(fd)
      // this.formData = fd
    },
    onChangeFile(file, data) {
      console.log(file)
      console.log(data)
      const fd = new FormData()
      fd.append('image', file)
      this.formData = fd
      console.log(this.formData)
    },
    handleSaveImages() {
      console.log(this)
      uploadImage(this.formData).then(res => {
        console.log(res)
        this.$refs.publishRef.$refs['upload-cover'][0].$refs[
          'preview-cover'
        ].src = res.data.url
        this.coverDialog = false
        this.$message.success('上传图片成功！')
      })
    }
  }
}
</script>

<style scoped>
</style>
