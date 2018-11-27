<template>
  <div>
    <group title="时间记录信息" labelWidth="10rem" gutter="0" labelMarginRight="1rem">
      <cell :value="dateRecord.dat01" title="参加工作时间"></cell>
      <cell :value="dateRecord.dat06" title="首次入新凤祥时间"></cell>
      <cell :value="dateRecord.dat02" title="本次入新凤祥时间"></cell>
    </group>
  </div>
</template>

<script>
  import {Group, PopupPicker, XInput, Cell} from 'vux'
  // import api from 'api'
  // import router from '../router'
  // import whole from '@/lib/whole'

  export default {
    components: {
      Group, PopupPicker, XInput, Cell
    },
    data() {
      return {
        dateRecord: {}
      }
    },
    created() {
      let record = JSON.parse(this.$route.query.codeData);
      this.dateRecord = record;
    },
    methods: {
    }
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
