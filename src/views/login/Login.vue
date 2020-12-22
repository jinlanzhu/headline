<template>
  <div id="login">
    <login-form :login-form="loginForm" @loginEvent="loginEvent"></login-form>
  </div>
</template>

<script>
import LoginForm from './childComps/LoginForm'
export default {
  data() {
    return {
      loginForm: {
        mobile: '',
        code: ''
      }
    }
  },
  components: {
    LoginForm
  },
  methods: {
    loginEvent() {}
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
