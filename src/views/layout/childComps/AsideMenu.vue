<template>
  <el-menu
    :default-active="activeIndex"
    text-color="#fff"
    background-color="#002033"
    active-text-color="#ffd04b"
    class="el-menu-vertical-demo aside-menu"
    @open="handleOpen"
    @close="handleClose"
  >
    <el-menu-item index="1">
      <i class="el-icon-location"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-menu-item index="2">
      <i class="el-icon-menu"></i>
      <span slot="title">内容管理</span>
    </el-menu-item>
    <el-menu-item index="3">
      <i class="el-icon-document"></i>
      <span slot="title">素材管理</span>
    </el-menu-item>
    <el-menu-item index="4">
      <i class="el-icon-setting"></i>
      <span slot="title">发布文章</span>
    </el-menu-item>
    <el-menu-item index="5">
      <i class="el-icon-setting"></i>
      <span slot="title">评论管理</span>
    </el-menu-item>
    <el-menu-item index="6">
      <i class="el-icon-setting"></i>
      <span slot="title">粉丝管理</span>
    </el-menu-item>
    <el-menu-item index="7">
      <i class="el-icon-setting"></i>
      <span slot="title">个人设置</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: '1'
    }
  },
  computed: {},
  components: {},
  methods: {
    handleOpen() {},
    handleClose() {}
  }
}
</script>

<style scoped lang="less">
.el-menu {
  border: none;
}
</style>
