<template>
  <div>
    <group title="基本信息" labelWidth="6.5rem" gutter="0" labelMarginRight="1rem">
      <x-input title="姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名:" v-model="infos.name" disabled></x-input>
      <x-input title="身份证号:" v-model="infos.no" disabled></x-input>
      <x-input title="手&nbsp;&nbsp;机&nbsp;&nbsp;号:" v-model="infos.phone" :disabled="disabled" :max="13"
               is-type="china-mobile"></x-input>
      <x-button :text="showcodeMsg" @click.native="editphone" :disabled="disab"></x-button>
    </group>
    <group v-show="showcode" labelWidth="6.5rem" gutter="0" labelMarginRight="1rem">
      <x-input title="验&nbsp;&nbsp;证&nbsp;&nbsp;码:" :placeholder="ctext" v-model="number"></x-input>
      <x-button text="发送验证码" @click.native="sendcode" :disabled="timesrc"></x-button>
    </group>
    <group labelWidth="6.5rem" gutter="0" labelMarginRight="1rem">
      <popup-picker title="婚姻状况:" :data="list1" v-model="infos.famst" :columns="1" show-name
                    value-text-align="left"></popup-picker>
      <popup-picker title="政治面貌:" :data="list2" v-model="infos.pcode" :columns="1" show-name
                    value-text-align="left"></popup-picker>
      <!--<x-address title="家庭住址:" v-model="infos.landa" raw-value :list="addressData" value-text-align="left"></x-address>-->
      <popup-picker :data="area1" v-model="infos.landb" show-name :columns="3"
                    value-text-align="left">
        <p slot="title">家庭住址<span class="tip">*</span></p>
      </popup-picker>
      <x-textarea title="详细信息:" placeholder="请填写详细信息" :show-counter="false" :rows="2"
                  v-model="infos.strasa"></x-textarea>
      <!--<x-address title="常用地址:" v-model="infos.landb" raw-value :list="addressData" value-text-align="left"></x-address>-->
      <popup-picker :data="area2" v-model="infos.landa" :columns="3" show-name
                    value-text-align="left">
        <p slot="title">常用地址<span class="tip">*</span></p>
      </popup-picker>
      <x-textarea title="详细信息:" placeholder="请填写详细信息" :show-counter="false" :rows="2"
                  v-model="infos.strasb" required></x-textarea>
    </group>
    <!--常住住址-->
    <group>
    <x-input title="紧急联系人1:" v-model="infos.fcnama" required></x-input>
    <x-input title="电&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;话:" v-model="infos.inftxta" :max="13"
             is-type="china-mobile"
             required></x-input>
    <x-input title="紧急联系人2:" v-model="infos.fcnamb" required></x-input>
    <x-input title="电&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;话:" v-model="infos.inftxtb" :max="13"
             is-type="china-mobile"
             required></x-input>
    <x-button class="servicebtn" text="保存" @click.native="saveinfo"></x-button>
    </group>
    <flexbox class="detail" v-show="showPerInfo">
      <flexbox-item @click.native="nextStep" style="color:#00B705">保存</flexbox-item>
    </flexbox>
  </div>
</template>

<script>
  import {
    Flexbox,
    FlexboxItem,
    XButton,
    Group,
    XInput,
    XTextarea,
    Selector,
    PopupPicker,
    Step,
    StepItem,
    XHr
  } from 'vux'
  import api from 'api'
  import axios from 'axios';
  import * as _ from 'underscore';
  import whole from '@/lib/whole'
  export default {
    components: {
      Flexbox,
      FlexboxItem,
      Step,
      StepItem,
      XTextarea,
      XButton,
      XHr,
      Group,
      XInput,
      Selector,
      PopupPicker
    },
    data () {
      return {
        number: '',
        sfcard: '',
        time: 10,
        disabled: true,
        disab: false,
        timesrc: false,
        showPerInfo: false,
        showcode: false,
        showcodeMsg: '修改手机号',
        title4: '家庭住址',
        befphone: '',
        infos: {
          name: '',
          no: '',
          phone: '',
          famst: [],
          pcode: [],
          landa: [],
          landb: [],
          strasa: '',
          ort01a: '',
          ort02a: '',
          ort01b: '',
          ort02b: '',
          strasb: '',
          fcnama: '',
          inftxta: '',
          fcnamb: '',
          inftxtb: '',
          statea: '',
          stateb: ''
        },
        result: null,
        showw: false,
        list1: [{
          name: '未婚',
          value: '1'
        }, {
          name: '已婚',
          value: '2'
        }, {
          name: '离异',
          value: '3'
        }, {
          name: '丧偶',
          value: '4'
        }],
        list2: [],
        area1: [],
        area2: []
      }
    },
    computed: {
      ctext: function () {
        if (this.timesrc) {
          return this.time > 0 ? '请' + this.time + '秒后重新发送' : '';
        }
        return '';
      }
    },
    created() {
      this.getInfos();
    },
    methods: {
      getInfos() {
        let _that = this;
        api.getUserInfos(function (res) {
          if (res.data.code && res.data.data) {
            _that.area1 = _that.modifyCode(res.data.data.t0);
            console.log(JSON.stringify(_that.area1))
            _that.list2 = _that.modiData(res.data.data.t7);
//            window.alert(JSON.stringify(res.data.data.info));
            _that.area2 = _that.area1;
            _that.infos.name = res.data.data.info.name;
            _that.infos.no = res.data.data.info.no;
            _that.infos.phone = res.data.data.info.phone;
            _that.befphone = res.data.data.info.phone;
            _that.infos.famst = [res.data.data.info.famst];
            _that.infos.pcode = [res.data.data.info.pcode];
            _that.infos.strasa = res.data.data.info.strasa;
            _that.infos.strasb = res.data.data.info.strasb;
            _that.infos.fcnama = res.data.data.info.fcnama;
            _that.infos.inftxta = res.data.data.info.inftxta;
            _that.infos.fcnamb = res.data.data.info.fcnamb;
            _that.infos.inftxtb = res.data.data.info.inftxtb;
            _that.infos.statea = res.data.data.info.statea;
            _that.infos.stateb = res.data.data.info.stateb;
            _that.infos.ort01a = res.data.data.info.ort01a;
            _that.infos.ort02a = res.data.data.info.ort02a;
            _that.infos.ort01b = res.data.data.info.ort01b;
            _that.infos.ort02b = res.data.data.info.ort02b;
            // 拼接地址问题
            _that.infos.landa = [];
            _that.infos.landb = [];
            _that.infos.landa.push(res.data.data.info.statea);
            _that.infos.landa.push(res.data.data.info.statea + '-' + res.data.data.info.ort01a);
            _that.infos.landa.push(res.data.data.info.statea + '-' + res.data.data.info.ort01a + '-' + res.data.data.info.ort02a);
            _that.infos.landb.push(res.data.data.info.stateb);
            _that.infos.landb.push(res.data.data.info.stateb + '-' + res.data.data.info.ort01b);
            _that.infos.landb.push(res.data.data.info.stateb + '-' + res.data.data.info.ort01b + '-' + res.data.data.info.ort02b);
          }
        })
      },
      show(val) {
        // 验证身份证号  获取信息
        if (val !== '') {
          this.showPerInfo = true
        } else {
          this.showPerInfo = false
        }
      },
      timer: function () {
        let _that = this;
        if (this.time > 0) {
          console.log(this.time)
          this.time--;
          setTimeout(this.timer, 1000);
        } else {
          _that.timesrc = false
        }
      },
      modiData(data) {
        for (let item of data) {
          item.name = item.ptext
          item.value = item.pcode
        }
        return data;
      },
      editphone() {
        let _that = this;
        this.showcode = !this.showcode
        this.showcodeMsg = this.showcode ? '取消' : '修改手机号'
        this.disabled = !this.disabled
        _that.infos.phone = _that.befphone
      },
      modifyCode(data) {
        for (let item of data) {
          item.parent = item.pvalue
        }
        return data;
      },
      sendcode: function (cb) {
        this.timer();
        let _that = this;
        this.disabled = !this.disabled
        this.disab = true
        _that.timesrc = true
        var params = new window.FormData();
        params.append('phone', _that.infos.phone);
        axios.post('/dingding/es/code', params)
          .then((res) => {
            cb(res);
          }).catch((error) => {
          return Promise.reject(error)
        })
      },
      appendData(dataObj) {
        let dataArr = _.pairs(dataObj);
        let params = new window.FormData();
        for (let data of dataArr) {
          if (data[1]) {
            params.append(data[0], data[1]);
          }
        }
        return params;
      },
      saveinfo: function () {
        let _that = this;
        var params = new window.FormData();

        if (_that.infos.landa.length === 0) {
          window.alert('常用地址必填');
          return;
        }
        if (_that.infos.landb.length === 0) {
          window.alert('家庭住址必填');
          return;
        }

        //  let params = this.appendData(this.infos)
        //     params.append('infos', _that.infos);
        params.append('number', _that.number || '');
        params.append('name', _that.infos.name || '');
        params.append('no', _that.infos.no || '');
        params.append('phone', _that.infos.phone || '');
        params.append('famst', _that.infos.famst || '');
        params.append('pcode', _that.infos.pcode || '');
        params.append('landa', _that.infos.landa[2] || '');
        params.append('strasa', _that.infos.strasa || '');
        params.append('landb', _that.infos.landb[2] || '');
        params.append('strasb', _that.infos.strasb || '');
        params.append('fcnama', _that.infos.fcnama || '');
        params.append('inftxta', _that.infos.inftxta || '');
        params.append('fcnamb', _that.infos.fcnamb || '');
        params.append('inftxtb', _that.infos.inftxtb || '');
        params.append('number', this.number || '');
        if (_that.befphone !== _that.infos.phone && _that.number === '') {
          window.alert('手机号变更， 必须输入验证码')
        }
        axios.post('/dingding/es/info', params)
          .then((res) => {
            //  保存成功 返回true
            if (res.data.code) {
              whole.showTop('保存成功，将自动退出');
              setTimeout(() => {
                let dd = window.dd;
                dd.biz.navigation.close({
                  onSuccess: function(result) {
                  },
                  onFail: function(err) {}
                })
              }, 1500);
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

  .servicebtn {
    margin: 0 auto;
    margin-top: 15px;
    margin-bottom: 15px;
    box-sizing: border-box;
    text-align: center;
    line-height: 30px;
    color: #66bca4;
    font-size: 14px;
    width: 90%;
    height: 30px;
    border: none;
    border: 1px solid #E5E5E5;
    background-color: #ffffff;
    border-radius: 15px;
  }
  .tip {
    color: #f00;
  }
</style>

