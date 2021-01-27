<template>
  <div id="container" class="bmap"></div>
</template>

<script>
export default {
  data() {
    return {}
  },
  components: {},
  mounted() {
    // var map = new BMap.Map('container')
    // var point = new BMap.Point(116.404, 39.915)
    // map.centerAndZoom(point, 15)
    var map = new BMap.Map('container')
    var point = new BMap.Point(116.404, 39.915)
    map.centerAndZoom(point, 15)
    window.setTimeout(function() {
      map.panTo(new BMap.Point(116.409, 39.918))
    }, 2000)
  }
}
</script>

<style scoped lang="less">
.bmap {
  width: 800px;
  height: 600px;
  border: 1px solid #eee;
}
</style>
