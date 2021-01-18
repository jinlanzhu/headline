<template>
  <div class="article-nav">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑路径导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <!-- 分割线 -->
      <!-- <el-divider></el-divider> -->
      <!-- 表单内容 -->

      <el-form ref="form" :model="articleForm" label-width="80px">
        <el-form-item label="状态：">
          <el-radio-group v-model="articleForm.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道：">
          <el-select v-model="articleForm.channel" placeholder="请选择">
            <el-option label="全部" :value="null"></el-option>
            <el-option
              v-for="(item, index) in channels"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期：">
          <el-date-picker
            v-model="articleForm.rangeDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            size="small"
            @click="handleSearch"
            :disabled="loading"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  props: ['articleForm', 'channels', 'status', 'loading'],
  data() {
    return {}
  },
  components: {},
  methods: {
    handleSearch() {
      this.$emit('hangdleSearch')
    }
  }
}
</script>

<style scoped>
</style>
