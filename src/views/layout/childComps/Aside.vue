<template>
  <div class="aside">
    <!-- 头像 -->
    <aside-avatar></aside-avatar>
    <!-- 菜单栏 -->
    <aside-menu></aside-menu>
  </div>
</template>

<script>
import AsideMenu from './AsideMenu'
import AsideAvatar from './AsideAvatar'
export default {
  data() {
    return {}
  },
  components: {
    AsideMenu,
    AsideAvatar
  },
  methods: {}
}
</script>

<style scoped>
</style>
