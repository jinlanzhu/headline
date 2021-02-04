<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>素材管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 素材列表 -->
      <images-list />
    </el-card>
  </div>
</template>

<script>
import ImagesList from '@/components/common/imagesList/ImagesList.vue'
export default {
  data() {
    return {}
  },
  components: {
    ImagesList
  }
}
</script>

<style scoped>
</style>
