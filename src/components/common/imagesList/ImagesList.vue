<template>
  <div class="images-list">
    <!-- 按钮 -->
    <div class="btns">
      <el-radio-group v-model="colle" @change="onChangeEvent">
        <el-radio-button class="all-images" :label="false"
          >全部</el-radio-button
        >
        <el-radio-button class="collect-images" :label="true"
          >收藏</el-radio-button
        >
      </el-radio-group>

      <el-button
        class="add-images"
        type="success"
        size="small"
        @click="handleAddEvent"
        >添加素材</el-button
      >
      <el-dialog
        title="添加素材"
        :visible.sync="addImagesDialog"
        :append-to-body="true"
        :before-close="handleClose"
      >
        <el-upload
          class="upload-demo"
          drag
          action="http://api-toutiao-web.itheima.net/mp/v1_0/user/images"
          :headers="uploadHeaders"
          :show-file-list="false"
          name="image"
          multiple
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">
            只能上传jpg/png文件，且不超过500kb
          </div>
        </el-upload>
      </el-dialog>
    </div>
    <!-- 素材列表 -->
    <el-row :gutter="30" v-loading="loading">
      <el-col
        :lg="4"
        :md="6"
        :sm="6"
        :xs="12"
        v-for="(item, index) in imagesList"
        :key="index"
      >
        <el-image style="height: 150px" fit="cover" :src="item.url"> </el-image>
        <div class="option">
          <el-button
            type="warning"
            :icon="item.is_collected ? 'el-icon-star-on' : 'el-icon-star-off'"
            circle
            size="mini"
            @click="onCollectEvent(item)"
            :loading="item.loading"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            size="mini"
            @click="onDeleteEvent(item)"
            :loading="item.loading"
          ></el-button>
        </div>
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
  data() {
    return {}
  },
  components: {}
}
</script>

<style scoped>
</style>
