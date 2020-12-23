<template>
  <el-container id="layout">
    <el-aside width="200px">
      <lay-aside></lay-aside>
    </el-aside>
    <el-container>
      <el-header>
        <header></header>
      </el-header>
      <el-main>
        <!-- 子路由出口 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import LayAside from './childComps/Aside.vue'
import Header from './childComps/Header.vue'
export default {
  data() {
    return {}
  },
  components: {
    LayAside,
    Header
  }
}
</script>

<style scoped lang="less">
#layout {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  .el-aside {
    background-color: #002033;
  }
  .el-header {
    background-color: #b3c0d1;
  }
  .el-main {
    background-color: #e9eef3;
  }
}
</style>
