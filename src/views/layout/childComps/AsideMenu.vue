<template>
  <el-menu
    :default-active="activeIndex"
    :router="true"
    text-color="#fff"
    background-color="#002033"
    active-text-color="#ffd04b"
    class="el-menu-vertical-demo aside-menu"
    :collapse-transition="false"
    :collapse="isCollapse"
  >
    <el-menu-item index="/">
      <i class="iconfont icon-index"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-menu-item index="/article">
      <i class="iconfont icon-fenzu27-copy"></i>
      <span slot="title">内容管理</span>
    </el-menu-item>
    <el-menu-item index="/images">
      <i class="iconfont icon-images"></i>
      <span slot="title">素材管理</span>
    </el-menu-item>
    <el-menu-item index="/images2">
      <i class="iconfont icon-images"></i>
      <span slot="title">素材管理2</span>
    </el-menu-item>
    <el-menu-item index="/publish">
      <i class="iconfont icon-koudaifabu"></i>
      <span slot="title">发布文章</span>
    </el-menu-item>
    <el-menu-item index="/comment">
      <i class="iconfont icon-commenting-o"></i>
      <span slot="title">评论管理</span>
    </el-menu-item>
    <el-menu-item index="/fans">
      <i class="iconfont icon-fans"></i>
      <span slot="title">粉丝管理</span>
    </el-menu-item>
    <el-menu-item index="/profile">
      <i class="iconfont icon-Personalsettings"></i>
      <span slot="title">个人设置</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  props: ['isCollapse'],
  data() {
    return {
      activeIndex: '/'
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
  .iconfont {
    width: 24px;
    font-size: 18px;
    margin-right: 8px;
    margin-left: 2px;
  }
}
</style>
