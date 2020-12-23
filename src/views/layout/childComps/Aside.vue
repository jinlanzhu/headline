<template>
  <div class="aside">
    <!-- 头像 -->
    <aside-avatar></aside-avatar>
    <!-- 菜单栏 -->
    <aside-menu :is-collapse="isCollapse"></aside-menu>
  </div>
</template>

<script>
import AsideMenu from './AsideMenu'
import AsideAvatar from './AsideAvatar'
export default {
  props: ['isCollapse'],
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
