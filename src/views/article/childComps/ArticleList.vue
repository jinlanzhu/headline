<template>
  <div class="article-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>根据筛选条件共查询到 {{ total }} 条结果：</span>
      </div>
      <!-- 文章列表 -->
      <el-table
        :data="articleList"
        stripe
        style="width: 100%"
        v-loading="loading"
      >
        <el-table-column label="封面">
          <template slot-scope="scope">
            <el-image
              lazy
              class="article-cover"
              :src="scope.row.cover.images[0]"
              fit="cover"
            >
              <div slot="error" class="image-slot">
                <img
                  class="article-cover"
                  src="@/assets/img/article/no-cover.gif"
                  alt=""
                /></div
            ></el-image>
            <!-- <img
              class="article-cover"
              v-if="scope.row.cover.images[0]"
              :src="scope.row.cover.images[0]"
              alt=""
            />
            <img
              class="article-cover"
              v-else
              src="@/assets/img/article/no-cover.gif"
              alt=""
            /> -->
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"> </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag :type="articleStatus[scope.row.status].type" size="small">{{
              articleStatus[scope.row.status].title
            }}</el-tag>
            <!-- <el-tag
              type="warning"
              size="small"
              plain
              v-if="scope.row.status == 0"
              >草稿</el-tag
            >
            <el-tag
              type="primary"
              size="small"
              plain
              v-else-if="scope.row.status == 1"
              >待审核</el-tag
            >
            <el-tag
              type="success"
              size="small"
              plain
              v-else-if="scope.row.status == 2"
              >审核通过</el-tag
            >
            <el-tag
              type="danger"
              size="small"
              plain
              v-else-if="scope.row.status == 3"
              >审核失败</el-tag
            >
            <el-tag
              type="info"
              size="small"
              plain
              v-else-if="scope.row.status == 4"
              >已删除</el-tag
            > -->
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布时间"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              plain
              size="mini"
              @click="editEvent(scope.row.id)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              plain
              size="mini"
              @click="deleteEvent(scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :current-page="currentPage"
        @current-change="hanglePage"
        :page-size="pageSize"
        :disabled="loading"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  props: [
    'articleList',
    'total',
    'articleStatus',
    'currentPage',
    'pageSize',
    'loading'
  ],
  data() {
    return {}
  },
  components: {},
  methods: {
    editEvent(id) {
      console.log(id.toString())
      this.$emit('editEvent', id.toString())
    },
    deleteEvent(id) {
      console.log(id)
      this.$emit('deleteEvent', id)
    },
    hanglePage(page) {
      console.log(page)
      this.$emit('hanglePage', page)
    }
  }
}
</script>

<style scoped lang="less">
.article-list {
  margin-top: 20px;
}
.article-cover {
  width: 150px;
  height: 100px;
  background-size: cover;
}
.el-pagination {
  float: right;
  margin: 15px 0;
}
</style>
