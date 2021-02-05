<template>
  <div class="images-checked">
    <el-radio-group v-model="colle">
      <el-radio-button class="all-images" :label="false">全部</el-radio-button>
      <el-radio-button class="collect-images" :label="true"
        >收藏</el-radio-button
      >
    </el-radio-group>
    <!-- 素材列表 -->
    <el-row :gutter="30">
      <el-col
        :lg="4"
        :md="6"
        :sm="6"
        :xs="12"
        v-for="(item, index) in imagesList"
        :key="index"
      >
        <el-image
          style="width: 100px; height: 100px"
          :src="item.url"
          fit="cover"
        ></el-image>
      </el-col>
    </el-row>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :current-page="currentPage"
      :disabled="loading"
      @current-change="handlePage"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: ['currentPage', 'total', 'imagesList', 'loading', 'colle'],
  data() {
    return {}
  },
  components: {},
  methods: {
    handlePage(page) {
      console.log(page)
      this.$emit('handlePage', page)
    }
  }
}
</script>

<style scoped>
</style>
