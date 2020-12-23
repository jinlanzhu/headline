<template>
  <el-container id="layout">
    <el-aside :width="isCollapse ? '64px' : '200px'">
      <lay-aside :is-collapse="isCollapse"></lay-aside>
    </el-aside>
    <el-container>
      <el-header>
        <lay-header
          :is-collapse="isCollapse"
          :user-info="userInfo"
          @collapseEvent="collapseEvent"
          @logOut="logOut"
        ></lay-header>
      </el-header>
      <el-main>
        <!-- 子路由出口 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { getUserProfile } from '@/network/user.js'

import LayAside from './childComps/Aside.vue'
import LayHeader from './childComps/Header.vue'
export default {
  data() {
    return {
      isCollapse: false,
      userInfo: {}
    }
  },
  components: {
    LayAside,
    LayHeader
  },
  created() {
    this.loadUserProfile()
  },
  methods: {
    // 加载个人信息资料
    loadUserProfile() {
      getUserProfile().then(res => {
        console.log(res)
        this.userInfo = res.data
      })
    },
    // 菜单折叠
    collapseEvent() {
      this.isCollapse = !this.isCollapse
    },
    //退出登录
    logOut() {
      this.$confirm('确认退出吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 把用户的登录状态清除
          window.sessionStorage.removeItem('user')
          // 跳转到登录页面
          this.$router.push({ name: 'login' })
          // this.$message.success('退出成功')
        })
        .catch(() => {
          this.$message.info('已取消退出')
        })
    }
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
