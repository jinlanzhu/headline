<template>
  <div class="images-list">
    <!-- 按钮 -->
    <div class="btns">
      <el-radio-group v-model="collect" @change="onChangeEvent">
        <el-radio-button class="all-images" :label="false"
          >全部</el-radio-button
        >
        <el-radio-button class="collect-images" :label="true"
          >收藏</el-radio-button
        >
      </el-radio-group>

      <el-button
        v-if="showAddBtn"
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
          :show-file-list="false"
          multiple
          name="image"
          :headers="uploadHeaders"
          :on-success="handleImageSuccess"
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
        @click.native="selected = index"
      >
        <!-- :class="showInImages ? '' : 'selected'" -->
        <el-image
          ref="checkedImageRef"
          style="height: 150px"
          fit="cover"
          :src="item.url"
        >
        </el-image>
        <div class="selected" v-if="selected === index"></div>
        <div class="option" v-if="showPosition">
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

    <!-- 分页 -->

    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :current-page="currentPage"
      :disabled="loading"
      @current-change="handlePage"
    />
  </div>
</template>

<script>
import {
  getImagesList,
  addCollectImages,
  deleteImage
} from '@/network/image.js'
export default {
  props: {
    showAddBtn: {
      type: Boolean,
      default: true
    },
    showPosition: {
      type: Boolean,
      default: true
    }
  },
  data() {
    const user = JSON.parse(window.sessionStorage.getItem('user'))
    return {
      // 是否收藏
      collect: false,
      // 总数
      total: 0,
      // 当前页
      currentPage: 1,
      // 页数大小
      pageSize: 10,
      // 素材列表
      imagesList: [],
      // 添加素材dialog
      addImagesDialog: false,
      // 加载状态
      loading: false,
      // 请求头
      uploadHeaders: {
        Authorization: `Bearer ${user.token}`
      },
      selected: null
    }
  },
  components: {},
  computed: {
    // showInImages() {
    //   return this.$route.path !== '/publish'
    // }
  },
  created() {
    console.log(this)
    this.loadImagesList(1)
  },
  methods: {
    onChangeEvent(val) {
      console.log(val)
      this.collect = val
      this.loadImagesList(1, this.collect)
    },
    // 获取素材列表
    loadImagesList(page, collect = false) {
      this.loading = true
      getImagesList({
        collect: this.collect,
        page: this.currentPage,
        per_page: this.pageSize
      }).then(res => {
        console.log(res)
        this.imagesList = res.data.results
        this.total = res.data.total_count
        this.imagesList.forEach(item => {
          item.loading = false
        })
        this.loading = false
      })
    },
    handleAddEvent() {
      this.addImagesDialog = true
    },
    handleClose() {
      this.addImagesDialog = false
    },
    // 收藏
    onCollectEvent(item) {
      console.log(item)
      addCollectImages(item.id, !item.is_collected).then(res => {
        console.log(res)
        item.is_collected = !item.is_collected
        if (item.is_collected == true) {
          this.$message.success('收藏成功！')
        } else {
          this.$message.success('已取消收藏！')
        }
      })
    },
    // 删除
    onDeleteEvent(item) {
      item.loading = true
      this.$confirm('此操作将永久删除该图片, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteImage(item.id).then(res => {
            this.loadImagesList(this.currentPage)
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            item.loading = false
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    handlePage(page) {
      this.currentPage = page
      this.loadImagesList(this.currentPage)
    },
    // 文件上传成功时的钩子
    handleImageSuccess(res, file) {
      // console.log(res)
      // console.log(file)
      this.addImagesDialog = false
      this.loadImagesList(1)
      this.$message.success('上传成功！')
    },
    onCheckedImage(item, index) {
      console.log(11)
      console.log(item)
      console.log(this)
      this.$refs.checkedImageRef[index].class = 'selected'
    }
  }
}
</script>

<style scoped lang="less">
.add-images {
  float: right;
}
.btns {
  padding-bottom: 20px;
}
.el-row {
  // margin: 20px 10px;
  .el-col {
    position: relative;
    margin-bottom: 20px;
  }
  .selected {
    // content: '';
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    background-size: cover;
    background: url('~@/assets/img/article/checked.png') no-repeat center;
  }
  .el-image {
    width: 100%;
    height: 100%;
    border: 1px dashed #ccc;
  }

  .option {
    left: 16px;
    right: 14px;
    height: 30px;
    bottom: 5px;
    opacity: 0.8;
    text-align: center;
    line-height: 30px;
    position: absolute;
    background: #e8eef1;
    border: none;

    .el-button {
      color: #fff;
      margin: 0 20px;
      .el-icon-star-on {
        color: red;
      }
    }
  }
}
</style>
