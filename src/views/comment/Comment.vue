<template>
  <div id="comment">
    <comment-list
      :comment-list="commentList"
      :total="total"
      :current-page="currentPage"
      :loading="loading"
      @onChangeStatus="onChangeStatus"
      @handleCurrentChange="handleCurrentChange"
    ></comment-list>
  </div>
</template>

<script>
import { getCommentList, editCommentStatus } from '@/network/comment.js'
import CommentList from './childComps/CommentList'
export default {
  data() {
    return {
      // 当前页
      currentPage: 1,
      // 每页数量
      pageSize: 10,
      // 评论列表
      commentList: [],
      // 评论总数
      total: 0,
      // 加载状态
      loading: false
    }
  },
  components: {
    CommentList
  },
  created() {
    this.loadCommentList()
  },
  methods: {
    loadCommentList(page = 1) {
      this.loading = true
      getCommentList({
        page,
        per_page: this.pageSize,
        response_type: 'comment'
      }).then(res => {
        console.log(res)
        this.commentList = res.data.results
        this.commentList.forEach(comment => {
          comment.statusDisabled = false
        })
        this.total = res.data.total_count
        this.loading = false
      })
    },
    onChangeStatus(comment) {
      comment.statusDisabled = true
      editCommentStatus(comment.id.toString(), comment.comment_status).then(
        res => {
          console.log(res)
          comment.statusDisabled = false
          this.$message.success(
            comment.comment_status == true ? '打开评论成功!' : '关闭评论成功！'
          )
        }
      )

      // this.$confirm(
      //   comment.comment_status == true
      //     ? '亲，您是否要关闭当前文章评论功能，如果关闭读者将无法对这篇文章进行评论。'
      //     : '亲，您是否要打开当前文章评论功能。',
      //   '温馨提示',
      //   {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }
      // )
      //   .then(() => {
      //     editCommentStatus(comment.id.toString(), {
      //       allow_comment: !comment.comment_status
      //     }).then(res => {
      //       console.log(res)
      //       comment.comment_status = res.data.allow_comment
      //       this.$message({
      //         type: 'success',
      //         message:
      //           comment.comment_status == true
      //             ? '关闭评论成功!'
      //             : '打开评论成功！'
      //       })
      //     })
      //   })
      //   .catch(() => {
      //     this.$message({
      //       type: 'info',
      //       message: '已取消'
      //     })
      //   })
    },
    handleCurrentChange(page) {
      this.currentPage = page
      this.loadCommentList(this.currentPage)
    }
  }
}
</script>

<style scoped>
</style>
