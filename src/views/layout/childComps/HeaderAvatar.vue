<template>
  <el-dropdown trigger="click">
    <span class="el-dropdown-link">
      <img :src="avatarUrl" alt="" class="user-img" />
      <span class="user-name">用户名称</span>
      <i class="el-icon-arrow-down el-icon--right user-icon"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item icon="iconfont icon-Personalsettings"
        >个人设置</el-dropdown-item
      >
      <el-dropdown-item icon="iconfont icon-logout">退出登录</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  data() {
    return {
      avatarUrl: require('@/assets/img/layout/reba-2.jpg')
    }
  },
  components: {}
}
</script>

<style scoped lang="less">
.el-dropdown {
  height: 60px;
  display: inline-block;
  line-height: 60px;
  position: relative;
  cursor: pointer;
  .user-img {
    width: 30px;
    height: 30px;
    vertical-align: middle;
    border-radius: 50%;
  }
  .user-name {
    font-size: 12px;
    font-weight: bold;
    padding-left: 5px;
  }
  .user-icon {
  }
}
</style>
