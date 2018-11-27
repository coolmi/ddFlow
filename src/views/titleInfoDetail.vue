<template>
  <div>
    <group title="职称详细信息" labelWidth="6.5rem" gutter="0" labelMarginRight="1rem">
      <cell title="职称类别" :value="info.zzdzclb, zc | getlbName"></cell>
      <cell title="职称名称" :value="info.zzdzcmc"></cell>
      <cell title="发证机关" :value="info.zzdsyjg"></cell>
      <cell title="发证时间" :value="fzTime"></cell>
      <cell title="证件到期日" :value="dzTime"></cell>
      <cell title="编号" :value="info.zzdzsbh"></cell>
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
        info: {},
        zc: [],
        fzTime: '',
        dzTime: ''
      }
    },
    created() {
      let infos = JSON.parse(this.$route.query.pj);
      this.info = infos.val;
      let fzsj = new Date(this.info.begda);
      this.fzTime = this.formatTime(fzsj);
      let dzsj = new Date(this.info.zzddqrq);
      this.dzTime = this.formatTime(dzsj);
      this.zc = infos.zc;
    },
    filters: {
      getlbName (code, list) {
        let name = '';
        for (let lb of list) {
          if (code === lb.num) {
            name = lb.zzdzclb;
          }
        }
        return name;
      }
    },
    methods: {
      formatTime(val) {
        return val.getFullYear() + '-' + (val.getMonth() + 1) + '-' + (val.getDate());
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
