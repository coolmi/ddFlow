<template>
  <div>
    <group title="用户基础信息" labelWidth="6.5rem" gutter="0" labelMarginRight="1rem">
      <!--<cell title="扣除年度" v-model="userInfo.annualDeduction" value-align="right"></cell>-->
      <!--<cell title="纳税人姓名" v-model="userInfo.ename" value-align="right"></cell>-->
      <!--<cell title="纳税人证件类型" v-model="userInfo.certtype" value-align="right"></cell>-->
      <!--<cell title="纳税人证件号码" v-model="userInfo.certno" value-align="right"></cell>-->
      <!--<cell title="联系方式" v-model="userInfo.telno" value-align="right"></cell>-->
      <!--<cell title="纳税人识别号" v-model="userInfo.identifyNum" value-align="right"></cell>-->
      <!--<x-input title="联系地址" v-model="userInfo.address" value-align="right"></x-input>-->
      <!--<x-input title="电子邮箱" v-model="userInfo.email" value-align="right"></x-input>-->
      <!--<datetime title="修改日期" v-model="userInfo.dateModified" value-align="right"></datetime>-->
      <!--<x-switch title="配偶情况" :value-map="['0', '1']" v-model="userInfo.spouseStatus" @click.native="postatus"></x-switch>-->
      <!--<cell title="配偶姓名" v-model="userInfo.spouseName" v-show="poflag" value-align="right"></cell>-->
      <!--<cell title="配偶证件类别" v-model="userInfo.spouseIDType" v-show="poflag" value-align="right"></cell>-->
      <!--<cell title="配偶身份号码" v-model="userInfo.spouseIDNum" v-show="poflag" value-align="right"></cell>-->
    </group>
  </div>
</template>

<script>
  import {
    XButton,
    Group,
    GroupTitle,
    XInput,
    Selector,
    XSwitch,
    Datetime,
    Divider,
    Cell
  } from 'vux'
  // import api from 'api';
  // import axios from 'axios';
  // import whole from '@/lib/whole'
  // import router from '../router'
  // import ding from '@/lib/ding'

  export default {
    components: {
      XButton,
      Group,
      GroupTitle,
      XInput,
      Selector,
      XSwitch,
      Divider,
      Datetime,
      Cell
    },
    data() {
      return {
        userInfo: {
          id: '',
          pernr: '',
          ename: '',
          certtype: '',
          certno: '',
          telno: '',
          email: '',
          address: '',
          identifyNum: '',
          annualDeduction: '',
          dateModified: '',
          spouseStatus: '',
          spouseName: '',
          spouseIDType: '',
          spouseIDNum: ''
        },
        poflag: false
      }
    },
    computed: {},
    created() {},
    methods: {
      postatus () {
        this.poflag = true
      }
    }
  }
</script>

<style scoped lang='less'>
  @import '~vux/src/styles/1px.less';

</style>

