<template>
  <div class="images-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>素材管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 素材列表 -->
      <div class="btns">
        <el-button-group>
          <el-button class="all-images" type="primary" size="small"
            >全部</el-button
          >
          <el-button class="collect-images" size="small">收藏</el-button>
        </el-button-group>

        <el-button class="add-images" type="success" size="small"
          >添加素材</el-button
        >
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  components: {}
}
</script>

<style scoped lang="less">
.add-images {
  float: right;
}
</style>
