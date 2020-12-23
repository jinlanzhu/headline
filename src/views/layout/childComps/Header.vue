<template>
  <div class="header">
    <!-- <i class="iconfont icon-collapse-left"></i> -->
    <i class="el-icon-s-fold icon"> </i>
    <span class="title">
      Pig's 小屋
    </span>
    <header-avatar class="header-avatar"></header-avatar>
  </div>
</template>

<script>
import { getUserProfile } from '@/network/user.js'
import HeaderAvatar from './HeaderAvatar'
export default {
  props: ['isCollapse'],
  data() {
    return {}
  },
  components: {
    HeaderAvatar
  },
  mounted() {
    // getUserProfile() {
    getUserProfile().then(res => {
      console.log(res)
    })
    // }
  }
}
</script>

<style scoped lang="less">
.header {
  height: 60px;
  line-height: 60px;
  vertical-align: middle;
  .icon {
    height: 60px;
    font-size: 20px;
    padding-right: 5px;
  }
  .title {
    height: 60px;
    font-size: 18px;
    font-weight: 500;
  }
  .header-avatar {
    float: right;
  }
}
</style>
