<template>
  <div>
    <cell v-model="name"></cell>
  </div>
</template>

<script>
  import {Cell} from 'vux'

  export default {
    components: {
      Cell
    },
    data() {
      return {
        name: '首页展示'
      }
    },
    created() {
    }
  }
</script>

<style lang="less" type="text/less">

</style>
