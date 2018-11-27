<template>
  <div>
    <group title="家庭成员列表信息" labelWidth="6.5rem" gutter="0" labelMarginRight="1rem">
      <cell v-for="family in jtobj" :key="family.id" :title="family, jtper.cw | getmcName" is-link @click.native="toDetail(family)"></cell>
    </group>
    <Group>
      <x-button type="primary" @click.native="savejt">添加家庭成员</x-button>
    </Group>
  </div>
</template>
<script>
  import {Group, PopupPicker, XInput, Cell, XButton} from 'vux'
  import api from 'api';
  import router from '../router';

  export default {
    components: {
      Group, PopupPicker, XInput, Cell, XButton
    },
    data() {
      return {
        jtobj: [],
        jtper: {
          fam: {},
          cw: []
        }
      }
    },
    filters: {
      getmcName(code, obj) {
        let name = '';
        let namecw = '';
        for (let mc of obj) {
          if (code.subty === mc.subty) {
            name = code.fcnam;
            namecw = mc.stext;
          }
        }
        return `${namecw} - ${name}`;
      }
    },
    created() {
      let _that = this;
      api.getjtData(function (res) {
        console.log(res);
        if (res.data.data && res.data.code) {
          _that.jtobj = res.data.data.jtlist;
          _that.jtper.cw = res.data.data.t591a;
        }
      })
    },
    methods: {
      toDetail(val) {
        this.jtper.fam = val;
        router.push({path: '/familyDetail', query: {pj: JSON.stringify(this.jtper)}})
      },
      savejt() {
        router.push({path: '/addfamilyDetail', query: {addobj: JSON.stringify(this.jtper.cw)}})
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
