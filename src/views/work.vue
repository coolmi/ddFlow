<template>
  <div>
    <group title="工作履历信息" labelWidth="12rem" gutter="0" labelMarginRight="1rem">
      <cell v-for="pl of wklist" :key="pl.id" :title="pl.arbgb" :inline-desc="pl.begda, pl.endda | getdateName" @click.native="clickPara(pl)" is-link></cell>
    </group>
  </div>
</template>

<script>
  import {Group, PopupPicker, XInput, Cell, Datetime} from 'vux'
  import dateFormatter from '@/lib/dateFormatter'

  export default {
    components: {
      Group, PopupPicker, XInput, Datetime, Cell
    },
    data() {
      return {
        wklist: []
      }
    },
    created() {
      this.wklist = JSON.parse(this.$route.query.codeData);
    },
    filters: {
      getdateName (param1, param2) {
        let stime = dateFormatter.fmtDate(param1, 'yyyy-MM-dd');
        let etime = dateFormatter.fmtDate(param2, 'yyyy-MM-dd');
        return stime + '至' + etime
      }
    },
    methods: {
      clickPara(val) {
        this.$router.push({path: '/workDetail', query: {pj: JSON.stringify(val)}})
      }
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
