<template>
  <div id="login">
    <login-form
      :login-form="loginForm"
      @loginEvent="loginEvent"
      :loading="loading"
      ref="loginForm"
    ></login-form>
  </div>
</template>

<script>
import { getLogin } from '@/network/login.js'
// import { request } from '@/network/request.js'
// import request from '@/network/utils.js'

import LoginForm from './childComps/LoginForm'
export default {
  data() {
    return {
      loginForm: {
        // mobile: '13911111111',
        mobile: '13933333333',
        // mobile: '13966666666',

        code: '246810',
        agree: false
      },
      //加载状态
      loading: false
    }
  },
  components: {
    LoginForm
  },
  methods: {
    getLogin() {
      this.loading = true
      getLogin(this.loginForm.mobile, this.loginForm.code).then(res => {
        console.log(res)
        if (res) {
          this.$message.success('登录成功！')
          this.loading = false
          this.$router.push({name: 'home'})
        } else {
          this.$message.error('登录失败，手机号或验证码错误')
          this.loading = false
        }
      })
    },
    loginEvent(formName) {
      console.log(formName)

      console.log(this.$refs.loginForm.$refs[formName])
      this.$refs.loginForm.$refs[formName].validate((valid, err) => {
        // if (!valid) {
        //   return
        // }
        if (!valid) {
          return
        }

        this.getLogin()
      })

      // // 获取表单数据（根据接口要求绑定数据）
      // const user = this.loginForm

      // // 表单验证

      // // 验证通过，提交登录
      // request({
      //   method: 'POST',
      //   url: '/app/v1_0/authorizations',
      //   // data 用来设置 POST 请求体
      //   data: user
      // })
      //   .then(res => {
      //     console.log(res)

      //     // 登录成功
      //     this.$message.success('登录成功')
      //     this.loading = false
      //   })
      //   .catch(err => {
      //     console.log('登录失败', err)
      //     // 登录失败
      //     this.$message.error('登录失败，手机号或验证码错误')
      //     this.loading = false
      //   })
    }
  }
}
</script>

<style scoped lang="less">
#login {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #196b93;
}
</style>
