<template>
  <div>
    <group title="工作履历详细信息" labelWidth="6.5rem" gutter="0" labelMarginRight="1rem">
      <cell :value="startTime" title="开始日期"></cell>
      <cell :value="endTime" title="结束日期"></cell>
      <cell title="工作单位" :value="work.arbgb"></cell>
      <cell title="部门" :value="work.zzdszbm"></cell>
      <cell title="岗位" :value="work.zzdzw"></cell>
      <cell title="证明人及电话" :value="perph"></cell>
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
        work: {},
        startTime: '',
        endTime: '',
        perph: ''
      }
    },
    created() {
      this.work = JSON.parse(this.$route.query.pj);
      this.perph = this.work.zzdzmr + '-' + this.work.zzdzmdh;
      this.startTime = dateFormatter.fmtDate(this.work.begda, 'yyyy-MM-dd');
      this.endTime = dateFormatter.fmtDate(this.work.endda, 'yyyy-MM-dd');
    },
    methods: {
      // formatTime(val) {
      //   return val.getFullYear() + '-' + val.getMonth() + '-' + (val.getDay() + 1);
      // }
    }
  }
</script>

<style scoped lang='less'>
  @import '~vux/src/styles/1px.less';
</style>
