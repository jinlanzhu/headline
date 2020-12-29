<template>
  <div id="publish">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑路径导航 -->
        <publish-nav></publish-nav>
      </div>
      <publish-form
        :publish-form="publishForm"
        :channels="channels"
      ></publish-form>
    </el-card>
  </div>
</template>

<script>
import { getArticleChannels, getArticleList } from '@/network/article.js'
import PublishNav from './childComps/PublishNav'
import PublishForm from './childComps/PublishForm'
export default {
  data() {
    return {
      publishForm: {
        // 文章标题
        name: '',
        // 文章内容
        desc: '',
        // 文章封面
        cover: '',
        // 频道
        channel: ''
      },
      channels: []
    }
  },
  components: {
    PublishNav,
    PublishForm
  },
  created() {
    this.loadArticleChannels()
  },
  methods: {
    // 加载频道
    loadArticleChannels() {
      getArticleChannels().then(res => {
        console.log(res)
        this.channels = res.data.channels
      })
    }
  }
}
</script>

<style scoped>
</style>
