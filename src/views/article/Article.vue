<template>
  <div id="article">
    <article-nav
      :article-form="articleForm"
      :channels="channels"
      :status="status"
      :loading="loading"
      @hangdleSearch="hangdleSearch"
    ></article-nav>
    <!-- 文章列表 -->
    <article-list
      :total="total"
      :article-list="articleList"
      :article-status="articleStatus"
      :current-page="currentPage"
      @hanglePage="hanglePage"
      :page-size="pageSize"
      :loading="loading"
    ></article-list>
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
        status: null,
        channel: null,
        rangeDate: null
      },
      // 频道
      channels: [],
      // 文章列表
      articleList: [],
      // 文章总数
      total: 0,
      articleStatus: [
        { status: 0, title: '草稿', type: 'info' },
        { status: 1, title: '待审核', type: 'primary' },
        { status: 2, title: '审核通过', type: 'success' },
        { status: 3, title: '审核失败', type: 'warning' },
        { status: 4, title: '已删除', type: 'danger' }
      ],
      // 当前页
      currentPage: 1,
      // 页数大小
      pageSize: 25,
      // 状态
      status: null,
      // 加载状态
      loading: true
    }
  },
  components: {
    ArticleNav,
    ArticleList
  },
  created() {
    this.loadArticleChannels()
    this.loadArticleList(1)
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
    loadArticleList(page = 1) {
      this.loading = true
      getArticleList({
        page,
        per_page: this.pageSize,
        status: this.articleForm.status,
        channel_id: this.articleForm.channel,
        begin_pubdate: this.articleForm.rangeDate
          ? this.articleForm.rangeDate[0]
          : null,
        end_pubdate: this.articleForm.rangeDate
          ? this.articleForm.rangeDate[1]
          : null
      }).then(res => {
        console.log(res)
        this.articleList = res.data.results
        this.total = res.data.total_count
        this.loading = false
      })
    },
    hanglePage(page) {
      this.loadArticleList(page)
    },
    hangdleSearch() {
      this.loadArticleList(1)
    }
  }
}
</script>

<style scoped>
</style>
