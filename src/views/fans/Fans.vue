<template>
  <div id="fans">
    <fans-list :fans-list="fansList" :total="total"></fans-list>
  </div>
</template>

<script>
import { getFansList } from '@/network/fans.js'

import FansList from './childComps/FansList'

export default {
  data() {
    return {
      fansList: [],
      total: 0
    }
  },
  components: {
    FansList
  },
  created() {
    this.loadFansList()
  },
  methods: {
    loadFansList() {
      getFansList().then(res => {
        console.log(res)
        this.fansList = res.data.results
        this.total = res.data.total_count
      })
    }
  }
}
</script>

<style scoped>
</style>
