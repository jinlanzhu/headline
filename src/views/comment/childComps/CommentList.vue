<template>
  <div class="comment-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>评论管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 评论列表 -->
      <el-table v-loading="loading" :data="commentList" style="width: 100%">
        <el-table-column prop="title" label="标题"> </el-table-column>
        <el-table-column prop="total_comment_count" label="总评论数">
        </el-table-column>
        <el-table-column prop="fans_comment_count" label="粉丝评论数">
        </el-table-column>
        <el-table-column label="评论状态">
          <template slot-scope="scope">
            {{ scope.row.comment_status ? '正常' : '关闭' }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.comment_status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :disabled="scope.row.statusDisabled"
              @change="onChangeStatus(scope.row)"
            >
            </el-switch>
            <!-- <el-button
              v-if="scope.row.comment_status == true"
              type="danger"
              effect="dark"
              size="small"
              :loading="loading"
              @click="onChangeStatus(scope.row)"
              >关闭评论</el-button
            >
            <el-button
              v-else
              type="success"
              size="small"
              effect="dark"
              :loading="loading"
              @click="onChangeStatus(scope.row)"
              >打开评论</el-button
            > -->
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :current-page="currentPage"
        :total="total"
        :loading="loading"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  props: ['commentList', 'total', 'currentPage', 'loading'],
  data() {
    return {}
  },
  components: {},
  methods: {
    onChangeStatus(comment) {
      console.log(comment)
      this.$emit('onChangeStatus', comment)
    },
    handleCurrentChange(page) {
      this.$emit('handleCurrentChange', page)
    }
  }
}
</script>

<style scoped>
</style>
