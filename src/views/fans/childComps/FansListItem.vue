<template>
  <div class="fans-list-item">
    <div class="fans-item" v-for="(item, index) in fansItem" :key="index">
      <el-avatar :size="80" :src="item.photo"></el-avatar>
      <p class="item-name">{{ item.name }}</p>
      <el-tag type="primary" :effect="changeEffect" @click="changeEvent"
        >+关注</el-tag
      >
    </div>
  </div>
</template>

<script>
export default {
  props: ['fansItem'],
  data() {
    return {
      changeEffect: 'plain'
    }
  },
  components: {},
  methods: {
    changeEvent() {
      this.changeEffect = this.changeEffect == 'plain' ? 'dark' : 'plain'
    }
  }
}
</script>

<style scoped lang="less">
.fans-list-item {
  display: flex;
  .fans-item {
    width: 120px;
    height: 170px;
    // flex: 1;
    text-align: center;
    padding: 10px 0;
    margin-right: 50px;
    margin-bottom: 15px;
    border: 1px dashed #eee;
    .el-avatar {
      display: inline-block;
      img {
        width: 100% !important;
        height: 100%;
      }
    }
    .item-name {
      font-size: 12px;
      padding: 5px 0;
    }
    .el-tag {
      padding: 0px 15px;
    }
  }
}
</style>
