<template>
  <div class="publish-form">
    <el-form
      :model="article"
      :rules="publishRules"
      ref="publishForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="标题：" prop="title">
        <el-input v-model="article.title" class="publish-name"></el-input>
      </el-form-item>
      <el-form-item label="内容：" prop="content">
        <el-input type="textarea" v-model="article.content"></el-input>
      </el-form-item>
      <el-form-item label="封面：">
        <el-radio-group v-model="article.cover.type">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道：" prop="channel_id">
        <el-select v-model="article.channel_id" placeholder="请选择频道">
          <el-option
            v-for="(item, index) in channels"
            :key="index"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="handlePublish(false)">发表</el-button>
        <el-button @click="handlePublish(true)">存入草稿</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: ['publishForm', 'article', 'channels'],
  data() {
    return {
      publishRules: {
        title: [
          { required: true, message: '标题必填', trigger: 'blur' },
          { min: 5, max: 15, message: '长度在 5 到 15 个字符', trigger: 'blur' }
        ],
        content: [{ required: true, message: '内容必填', trigger: 'blur' }],
        channel_id: [{ required: true, message: '频道必选', trigger: 'blur' }]
      }
    }
  },
  components: {},
  methods: {
    handlePublish(msg) {
      console.log(msg)
      this.$emit('handlePublish', msg)
    }
  }
}
</script>

<style scoped>
.publish-name {
  width: 400px;
}
</style>
