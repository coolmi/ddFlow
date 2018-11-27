<template>
  <div>
    <group title="职称信息" labelWidth="6.5rem" gutter="0" labelMarginRight="1rem">
      <cell v-for="pl of zcinfos.zclist" :key="pl.id" :title="pl.zzdzcmc" @click.native="clickZc(pl)" is-link></cell>
    </group>
  </div>
</template>

<script>
  import {Group, PopupPicker, XInput, Datetime, Cell} from 'vux'
  // import api from 'api'
  // import router from '../router'
  // import whole from '@/lib/whole'

  export default {
    components: {
      Group, PopupPicker, XInput, Datetime, Cell
    },
    data() {
      return {
        zcinfos: {
          val: {},
          zclist: [],
          zc: []
        }
      }
    },
    created() {
      let zcinfo = JSON.parse(this.$route.query.codeData);
      this.zcinfos.zclist = zcinfo.zclist;
      this.zcinfos.zc = zcinfo.zc;
    },
    methods: {
      clickZc(val) {
        this.zcinfos.val = val;
        this.$router.push({path: '/titleinfoDetail', query: {pj: JSON.stringify(this.zcinfos)}})
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
