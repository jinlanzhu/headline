<template>
  <div id="images">
    <images-list></images-list>
  </div>
</template>

<script>
import { getImagesList } from '@/network/image.js'
import ImagesList from './childComps/ImagesList'
export default {
  data() {
    return {}
  },
  components: {
    ImagesList
  },
  created() {
    this.loadImagesList()
  },
  methods: {
    async loadImagesList() {
      await getImagesList().then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style scoped>
</style>
