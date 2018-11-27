<template>
  <div>
    <group title="健康状况信息" labelWidth="6.5rem" gutter="0" labelMarginRight="1rem">
      <x-number title="身高（cm）" v-model="jkData.zzdsg" width="4.5rem" fillable></x-number>
      <x-number title="体重（kg）" v-model="jkData.zzdtz" width="4.5rem" fillable></x-number>
      <x-switch title="是否有其他身体不适" :value-map="['0', '1']" v-model="bsup" @click.native="stbs"></x-switch>
      <x-input v-if="bsupOption" title="残疾部位" v-model="jkData.zhrscbw" text-align="right"></x-input>
      <popup-picker v-if="bsupOption" title="伤残程度:" :data="list1" v-model="jkData.zhrsccd" :columns="1" show-name value-text-align="right">
      </popup-picker>
      <x-switch v-if="bsupOption" title="是否有残疾证" @click.native="cjz" :value-map="['0', '1']" v-model="certificate"></x-switch>
      <x-input v-if="bsupOption" v-show="cerupOption" title="残疾证编号" v-model="jkData.sbgsz" text-align="right"></x-input>
      <datetime v-if="bsupOption" v-show="cerupOption" v-model="jkData.sbadt" format="YYYY-MM-DD" title="发证日期"></datetime>
      <x-input v-if="bsupOption" v-show="cerupOption" title="发证机关" v-model="jkData.sbdst" text-align="right"></x-input>
    </group>
    <box gap="10px 50px">
      <x-button text="保存" @click.native="saveinfo" class="baocun"  plain type="primary" ></x-button>
    </box>
  </div>
</template>

<script>
  import {Group, PopupPicker, XInput, XSwitch, Datetime, Cell, XNumber, XButton, Box} from 'vux'
  import whole from '@/lib/whole';
  import axios from 'axios';
  import router from '../router';

  export default {
    components: {
      Group, PopupPicker, XInput, XSwitch, Datetime, Cell, XNumber, XButton, Box
    },
    data() {
      return {
        jkData: {
          zzdsg: '',
          zzdtz: '',
          zhrscbw: '',
          zhrsccd: [],
          sbgsz: '',
          sbadt: '',
          sbdst: ''
        },
        disability: [],
        bsup: '0',
        certificate: '0',
        list1: [
          {name: '一级', value: '01'},
          {name: '二级', value: '02'},
          {name: '三级', value: '03'},
          {name: '四级', value: '04'},
          {name: '五级', value: '05'},
          {name: '六级', value: '06'},
          {name: '七级', value: '07'},
          {name: '八级', value: '08'},
          {name: '九级', value: '09'},
          {name: '十级', value: '10'}
        ]
      }
    },
    computed: {
      bsupOption() {
        return this.bsup === '1'
      },
      cerupOption() {
        return this.certificate === '1'
      }
    },
    created() {
      let _that = this;
      let oojb = JSON.parse(this.$route.query.codeData);
      _that.jkData.zzdsg = oojb.zzdsg;
      _that.jkData.zzdtz = oojb.zzdtz;
      _that.jkData.zhrscbw = oojb.zhrscbw;
      _that.jkData.zhrsccd = [oojb.zhrsccd];
      _that.jkData.sbgsz = oojb.sbgsz;
      _that.jkData.sbadt = _that.timefor(oojb.sbadt);
      _that.jkData.sbdst = oojb.sbdst;
      if (_that.jkData.zhrscbw !== '' || _that.jkData.zhrsccd !== '') {
        _that.bsup = '1';
      }
      if (_that.jkData.sbdst !== '' || _that.jkData.sbgsz !== '' || _that.jkData.sbadt !== '') {
        _that.certificate = '1'
      }
    },
    methods: {
      stbs() {
        let _that = this;
        if (_that.bsup === '0') {
          _that.jkData.zhrscbw = '';
          // _that.jkData.zhrsccd = '';
        }
      },
      cjz() {
        let _that = this;
        if (_that.certificate === '0') {
          _that.jkData.sbdst = '';
          _that.jkData.sbgsz = '';
          _that.jkData.sbadt = '';
        }
      },
      timefor(str) {
        return str.substr(0, 10);
      },
      saveinfo() {
        let _that = this;
        let params = new window.FormData();
        console.log(_that.jkData);
        params.append('zzdsg', _that.jkData.zzdsg || '');
        params.append('zzdtz', _that.jkData.zzdtz || '');
        params.append('bsup', _that.bsup || '');
        params.append('zhrscbw', _that.jkData.zhrscbw || '');
        params.append('zhrsccd', _that.jkData.zhrsccd || '');
        params.append('certificate', _that.certificate || '');
        params.append('sbgsz', _that.jkData.sbgsz || '');
        params.append('sbadt', _that.jkData.sbadt || '');
        params.append('sbdst', _that.jkData.sbdst || '');
        axios.post('/dingding/es/health', params)
          .then((res) => {
            //  保存成功 返回true
            if (res.data.code) {
              whole.showTop('保存成功');
              setTimeout(() => {
                router.go(-1);
              }, 1000);
            } else {
              window.alert('保存失败,请重试')
            }
          }).catch((error) => {
          return Promise.reject(error)
        })
      }
    }
  }
</script>

<style scoped lang='less'>
  @import '~vux/src/styles/1px.less';
  .baocun {
    border-radius:99px;
    margin-top: 1.5rem;
  }

</style>
