<template>
  <div class="header">
    <i
      :class="{
        'el-icon-s-unfold icon': isCollapse,
        'el-icon-s-fold icon': !isCollapse
      }"
      @click="collapseEvent"
    >
    </i>
    <span class="title">
      Pig's 小屋
    </span>
    <header-avatar
      class="header-avatar"
      :user-info="userInfo"
      @logOut="logOut"
    ></header-avatar>
  </div>
</template>

<script>
import HeaderAvatar from './HeaderAvatar'
export default {
  props: ['isCollapse', 'userInfo'],
  data() {
    return {}
  },
  components: {
    HeaderAvatar
  },
  mounted() {},
  methods: {
    collapseEvent() {
      this.$emit('collapseEvent')
    },
    logOut() {
      this.$emit('logOut')
    }
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
