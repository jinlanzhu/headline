<template>
  <div class="publish-form">
    <el-form
      :model="publishForm"
      :rules="publishRules"
      ref="publishForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="标题：" prop="name">
        <el-input v-model="publishForm.name" class="publish-name"></el-input>
      </el-form-item>
      <el-form-item label="内容：" prop="desc">
        <textarea v-model="publishForm.desc"></textarea>
      </el-form-item>
      <el-form-item label="封面：">
        <el-radio-group v-model="publishForm.cover">
          <el-radio label="单图">单图</el-radio>
          <el-radio label="三图">三图</el-radio>
          <el-radio label="无图">无图</el-radio>
          <el-radio label="自动">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道：" prop="channel">
        <el-select v-model="publishForm.channel" placeholder="请选择频道">
          <el-option
            v-for="(item, index) in channels"
            :key="index"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary">发表</el-button>
        <el-button>存入草稿</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: ['publishForm', 'channels'],
  data() {
    return {
      publishRules: {
        name: [
          { required: true, message: '标题必填', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 100 个字符', trigger: 'blur' }
        ],
        desc: [{ required: true, message: '内容必填', trigger: 'blur' }],
        channel: [{ required: true, message: '频道必选', trigger: 'blur' }]
      }
    }
  },
  components: {}
}
</script>

<style scoped>
.publish-name {
  width: 400px;
}
</style>
