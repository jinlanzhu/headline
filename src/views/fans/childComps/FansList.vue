<template>
  <div class="fans-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>粉丝管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <!-- 粉丝列表 -->
        <el-tab-pane label="粉丝列表" name="first">
          <fans-list-item :fans-item="fansList"></fans-list-item>
          <!-- 分页 -->
          <el-pagination background layout="prev, pager, next" :total="total">
          </el-pagination>
        </el-tab-pane>
        <!-- 粉丝画像 -->
        <el-tab-pane label="粉丝画像" name="second">
          <fans-echarts></fans-echarts>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import FansListItem from './FansListItem'
import FansEcharts from './FansEcharts'
export default {
  props: ['fansList', 'total'],
  data() {
    return {
      activeName: 'first'
    }
  },
  components: {
    FansListItem,
    FansEcharts
  },
  methods: {
    handleClick() {}
  }
}
</script>

<style scoped>
</style>
