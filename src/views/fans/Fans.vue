<template>
  <div id="fans">
    分数
  </div>
</template>

<script>
import { getFansList } from '@/network/fans.js'
export default {
  data() {
    return {
      fansList: []
    }
  },
  components: {},
  created() {
    this.loadFansList()
  },
  methods: {
    loadFansList() {
      getFansList().then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style scoped>
</style>
