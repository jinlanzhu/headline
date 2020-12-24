<template>
  <div id="article">
    <article-nav :article-form="articleForm" :channels="channels"></article-nav>
    <!-- 文章列表 -->
    <article-list></article-list>
  </div>
</template>

<script>
import { getArticleChannels, getArticleList } from '@/network/article.js'
import ArticleNav from './childComps/ArticleNav'
import ArticleList from './childComps/ArticleList'
export default {
  data() {
    return {
      articleForm: {
        status: '',

        region: [],
        date: ''
      },
      // 频道
      channels: [],
      // 文章列表
      articleList: []
    }
  },
  components: {
    ArticleNav,
    ArticleList
  },
  created() {
    this.loadArticleChannels()
    this.loadArticleList()
  },
  methods: {
    // 加载频道
    loadArticleChannels() {
      getArticleChannels().then(res => {
        console.log(res)
        this.channels = res.data.channels
      })
    },
    // 获取文章列表（适用内容管理、评论管理、图文数据）
    loadArticleList() {
      getArticleList().then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style scoped>
</style>
