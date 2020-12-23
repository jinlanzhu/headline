<template>
  <div class="aside-avatar">
    <img src="@/assets/img/layout/reba-2.jpg" alt="" />
    <h3 class="aside-title">Pig's 小屋</h3>
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
.aside-avatar {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  .aside-title {
    color: #fff;
    line-height: 60px;
    padding-left: 10px;
  }
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    box-shadow: 0 0 5px #c9cf8d;
  }
}
</style>
