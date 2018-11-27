<template>
  <div>
    <div v-if="mymap && JSON.stringify(mymap) === '{}'">
      <p>未查询到当前月份工资</p>
    </div>
    <div v-for="(obj, key) in mymap" :key="key">
      <group v-if="typeof obj === 'number'">
        <cell :title="key" :value="obj"></cell>
      </group>
      <group :title="key" v-else-if="typeof obj === 'object'">
        <cell v-for="(co, cokey) in obj" :key="cokey" :title="cokey" :value="co"
              v-if="typeof co === 'number'"></cell>
        <template v-else-if="typeof co === 'object'">
          <cell :title="cokey"></cell>
          <cell style="margin-left:  10px" v-for="(coco, cocokey) in co" :key="cocokey"
                :title="cocokey" :value="coco"></cell>
        </template>
      </group>
    </div>

  </div>
</template>
<script>
  import {Group, Cell} from 'vux'
  export default {
    components: {
      Group, Cell
    },
    data () {
      return {
        mymap: []
      }
    },
    created() {
      let _that = this;
      _that.mymap = this.$route.query.codeData;
    },
    methods: {}
  }
</script>

<style scoped lang='less'>
  @import '~vux/src/styles/1px.less';
  /*.btn_wrap {*/
  /*padding: 0 1rem;*/
  /*margin-top: 2rem;*/
  /*}*/
  .detail {
    text-align: center;
    height: 50px;
    position: fixed;
    line-height: 50px;
    bottom: 0;
    border: 1px solid #F1F0F3;
    background-color: #ffffff;
  }
</style>
