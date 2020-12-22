<template>
  <div class="login-form">
    <div class="avatar">
      <img src="@/assets/img/login/reba-2.jpg" alt="" />
    </div>
    <el-form
      :model="loginForm"
      :rules="loginRules"
      ref="ruleForm"
      class="demo-ruleForm"
    >
      <el-form-item prop="mobile">
        <el-input
          v-model="loginForm.mobile"
          prefix-icon="iconfont icon-mobile"
        ></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input
          v-model="loginForm.code"
          prefix-icon="iconfont icon-identifyingcode"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="loginChecked"
          >我已阅读并同意用户协议和隐私条款</el-checkbox
        >
      </el-form-item>
      <el-form-item>
        <el-button class="login-btn" type="primary" @click="loginEvent"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: ['loginForm'],
  data() {
    return {
      loginRules: {
        mobile: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        code: [{ required: true, message: '请输入活动名称', trigger: 'blur' }]
      },
      loginChecked: false
    }
  },
  components: {},
  methods: {
    loginEvent() {
      this.$emit('loginEvent')
    }
  }
}
</script>

<style scoped lang="less">
.login-form {
  background: #fff;
  min-width: 350px;
  padding: 50px;
  position: relative;
  .avatar {
    // top: -70px;
    // top: 50%;
    left: 50%;
    width: 130px;
    height: 130px;
    border-radius: 50%;
    position: absolute;
    padding: 8px;
    box-shadow: 0 0 10px #eee;
    background: #fff;
    transform: translateX(-50%) translateY(-75%);
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .el-form {
    padding-top: 50px;
  }
  .login-btn {
    width: 100%;
  }
}
</style>
