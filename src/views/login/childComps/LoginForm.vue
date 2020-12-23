<template>
  <div class="login-form">
    <div class="avatar">
      <img src="@/assets/img/login/reba-2.jpg" alt="" />
    </div>
    <!-- :rules="loginRules" -->
    <el-form
      :model="loginForm"
      ref="ruleForm"
      class="demo-ruleForm"
      :rules="loginRules"
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
      <el-form-item prop="agree">
        <el-checkbox v-model="loginForm.agree"
          >我已阅读并同意用户协议和隐私条款</el-checkbox
        >
      </el-form-item>
      <el-form-item>
        <el-button
          class="login-btn"
          type="primary"
          @click="loginEvent('ruleForm')"
          :loading="loading"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: ['loginForm', 'loading'],
  data() {
    return {
      loginRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            pattern: /^1[3|5|7|8|9]\d{9}$/,
            message: '请输入正确的号码格式',
            trigger: 'change'
          }
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'blur' },
          { pattern: /^\d{6}$/, message: '请输入正确的验证码格式' }
        ],
        agree: [
          {
            validator: (rule, value, callback) => {
              if (value) {
                callback()
              } else {
                callback(new Error('请勾选同意用户协议'))
              }
            },
            trigger: 'change'
          }
        ]
      }
    }
  },
  components: {},
  methods: {
    loginEvent(formName) {
      console.log(this.$refs)
      this.$emit('loginEvent', formName)
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
