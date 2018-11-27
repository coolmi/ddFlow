<template>
  <div>
    <group title="基本信息" labelWidth="6.5rem" gutter="0" labelMarginRight="1rem">
      <flexbox class="vux-cell-box">
        <flexbox-item>
          <cell title="姓名" v-model="infos.name" value-align="right"></cell>
        </flexbox-item>
        <flexbox-item>
          <popup-picker title="民族" :data="list3" v-model="infos.racky" :columns="1" show-name value-text-align="right"></popup-picker>
        </flexbox-item>
        <flexbox-item>
          <popup-picker title="婚姻" :data="list1" v-model="infos.famst" :columns="1" show-name value-text-align="right"></popup-picker>
        </flexbox-item>
      </flexbox>
      <cell title="身份证号" v-model="infos.no" value-align="right" ></cell>
      <swipeout>
        <swipeout-item transition-mode="follow" class="demo-content vux-1px-t">
          <div slot="content" >
            <x-input v-model="infos.phone" ref='sj' id="sj" :disabled="disabled" text-align="center" :max="13" is-type="china-mobile">
              <p slot="label">手机号(左滑修改)</p>
            </x-input>
          </div>
          <div slot="right-menu">
            <swipeout-button @click.native="editphone" type="warn" text="修改手机号"></swipeout-button>
            <swipeout-button @click.native="cancelphone" type="primary" text="取消"></swipeout-button>
          </div>
        </swipeout-item>
      </swipeout>
      <group v-show="showcode" labelWidth="6.5rem" gutter="0" labelMarginRight="1rem">
        <x-input title="验证码" :placeholder="ctext" v-model="number"></x-input>
        <x-button text="发送验证码" @click.native="sendcode" type="default" :disabled="timesrc"></x-button>
      </group>
      <flexbox class="vux-cell-box">
        <flexbox-item>
          <x-input title="邮箱" ref="youxiang" v-model="infos.emailFrom" text-align="center"></x-input>
        </flexbox-item>
        <span>@</span>
        <flexbox-item>
          <popup-picker :data="list5" v-model="infos.email_zui" :columns="1" show-name value-text-align="right"></popup-picker>
        </flexbox-item>
      </flexbox>
      <flexbox class="vux-cell-box">
        <flexbox-item>
          <popup-picker title="政治面貌" :data="list2" v-model="infos.pcode" :columns="1" show-name value-text-align="right">
          </popup-picker>
        </flexbox-item>
        <flexbox-item>
          <x-switch title="服兵役" @click.native="byfn" :value-map="['0', '1']" v-model="infos.zzdsffy">
          </x-switch>
        </flexbox-item>
      </flexbox>
      <flexbox class="vux-cell-box">
        <flexbox-item>
          <datetime v-show="byupOption" v-model="infos.zzdfyqks" format="YYYY-MM-DD" title="开始日期"
                    :end-date="infos.zzdfyqjs" ></datetime>
        </flexbox-item>
        <flexbox-item>
          <datetime v-show="byupOption" v-model="infos.zzdfyqjs" format="YYYY-MM-DD" title="结束日期"
                    :start-date="infos.zzdfyqks" ></datetime>
        </flexbox-item>
      </flexbox>
      <popup-picker title="户口性质" :data="list4" v-model="infos.zhrhkxz" :columns="1" show-name value-text-align="right"></popup-picker>
      <x-address title="户口所在地" v-model="infos.residenceAddre" raw-value :list="addressData" @on-shadow-change="hkdata" value-text-align="right" label-align="justify">
      </x-address>
      <x-input title="籍贯" v-model="infos.zhrjg" text-align="right"></x-input>
      <x-address title="有效通讯地址" v-model="infos.residenceture" raw-value :list="addressData" @on-shadow-change="yxdata" value-text-align="right" label-align="justify">
      </x-address>
      <x-textarea title="详细信息" placeholder="请填写详细信息" :show-counter="false" :rows="1" v-model="infos.strasb" required></x-textarea>
    </group>
    <box gap="10px 100px">
      <x-button text="保存" @click.native="saveinfo" class="baocun"  plain type="primary" ></x-button>
    </box>
    <!--<group labelWidth="6.5rem" gutter="0" labelMarginRight="1rem">-->
    <!---->
    <!--</group>-->

    <box gap="10px 140px">
      <x-button text="联系HR" mini plain type="primary" @click.native="openPerInfo"></x-button>
    </box>
    <!--<actionsheet v-model="showadmin" theme="android" :menus="admincontact" ></actionsheet>-->
    <div class="button-stye">
      <p>◆可查询信息，请联系HR修改ddddd。</p>
      <p>◆可修改信息，请自助修改后保存。</p>
      <p>◆以上所有信息仅做为核实使用，不做为其他用途。</p>
    </div>
    <box gap="10px 60px">
      <divider class="button-stye">我是有底线的</divider>
    </box>
  </div>
</template>

<script>
  import {
    XAddress,
    Box,
    Flexbox,
    FlexboxItem,
    XButton,
    Group,
    GroupTitle,
    XInput,
    XTextarea,
    Selector,
    PopupPicker,
    Step,
    StepItem,
    XHr,
    XSwitch,
    Datetime,
    Grid,
    GridItem,
    Swipeout,
    SwipeoutItem,
    SwipeoutButton,
    Divider,
    Cell,
    Actionsheet
  } from 'vux'
  import api from 'api';
  import axios from 'axios';
  import whole from '@/lib/whole'
  import router from '../router'
  import ding from '@/lib/ding'

  export default {
    components: {
      Actionsheet,
      XAddress,
      Box,
      Flexbox,
      FlexboxItem,
      Step,
      StepItem,
      XTextarea,
      XButton,
      XHr,
      Group,
      GroupTitle,
      XInput,
      Selector,
      PopupPicker,
      XSwitch,
      Datetime,
      Grid,
      GridItem,
      Swipeout,
      SwipeoutItem,
      SwipeoutButton,
      Divider,
      Cell
    },
    data() {
      return {
        showPerInfo: false,
        befphone: '',
        number: '',     // 验证码值
        time: 10,
        disabled: true,    // 手机号是否可修改状态
        showcode: false,   // 手机号隐藏状态
        timesrc: false,   // 验证码状态值
        addressData: [],
        title: '',
        // showadmin: false,
        ddid: '',
        isemail: false,
        estr: '',
        ename: '',
        infos: {
          name: '',
          emailFrom: '',
          eamilType: '',
          email_zui: ['01'],
          racky: [],
          famst: [],
          pcode: [],
          zzdsffy: '0',
          zzdfyqks: '',
          zzdfyqjs: '',
          zhrhkxz: [],
          zhrjg: '',
          residenceAddre: [],
          residenceture: [],
          strasb: '',
          hkszd: '',
          yxtxdz: '',
          no: '',
          phone: ''
        },
        diqudata: {
          hhk: '',
          yxy: '',
          state5: '',
          ort015: '',
          ort025: '',
          stateb: '',
          ort01b: '',
          ort02b: ''
        },
        list1: [], // 婚姻
        list3: [], // 民族
        list2: [], // 政治面貌
        list4: [],  // 户口性质
        list5: [
          {value: '01', name: 'gmkholdings.com'},
          {value: '02', name: 'xiangguang.com'},
          {value: '03', name: 'fengxiang.com'},
          {value: '04', name: 'qq.com'},
          {value: '05', name: '163.com'},
          {value: '06', name: '126.com'},
          {value: '07', name: '139.com'},
          {value: '08', name: 'sina.com'},
          {value: '09', name: 'dingtalk.com'},
          {value: '10', name: 'foxmail.com'},
          {value: '11', name: 'sohu.com'},
          {value: '12', name: 'hotmail.com'},
          {value: '13', name: 'msn.com'},
          {value: '14', name: 'gmail.com'},
          {value: '15', name: 'yahoo.com'},
          {value: '16', name: 'tom.com'},
          {value: '17', name: '163.net'},
          {value: '18', name: 'aol.com'},
          {value: '19', name: 'ask.com'},
          {value: '20', name: 'live.com'},
          {value: '21', name: '263.net'},
          {value: '22', name: '3721.net'},
          {value: '23', name: 'yeah.net'},
          {value: '24', name: 'googlemail.com'}
        ], // 邮箱后缀
        jkData: {
          zzdsg: '',
          zzdtz: '',
          zhrscbw: '', // 残疾部位
          zhrsccd: '', // 残疾程度
          sbgsz: '',  // 残疾证编号
          sbadt: '',  // 发证日期
          sbdst: '' // 发证机
        },
        jyData: {
          jylist: [], //  教育list
          xltype: [], // 学历
          degree: []  // 学位
        },
        wklist: [],  // 工作履历
        recordData: {
          dat01: '',
          dat02: '',
          dat06: ''
        },
        zzData: {       // 职称信息
          zclist: [],
          zc: []
        }
      }
    },
    computed: {
      ctext: function () {
        if (this.timesrc) {
          return this.time > 0 ? '请' + this.time + '秒后重新发送' : '';
        }
        return '';
      },
      byupOption() {
        return this.infos.zzdsffy === '1'
      },
      hkdata() {
        this.infos.hkszd = this.infos.residenceAddre.toString();
        this.diqudata.hhk = this.infos.hkszd.substr(12, 23);
        this.diqudata.state5 = this.diqudata.hhk.substr(0, 3);
        this.diqudata.ort015 = this.diqudata.hhk.substr(4, 3);
        this.diqudata.ort025 = this.diqudata.hhk.substr(8, 3);
      },
      yxdata() {
        this.infos.yxtxdz = this.infos.residenceture.toString();
        this.diqudata.yxy = this.infos.yxtxdz.substr(12, 23);
        this.diqudata.stateb = this.diqudata.yxy.substr(0, 3);
        this.diqudata.ort01b = this.diqudata.yxy.substr(4, 3);
        this.diqudata.ort02b = this.diqudata.yxy.substr(8, 3);
      }
    },
    created() {
      this.getInfos();
      this.getadmininfo();
    },
    methods: {
      getInfos() {
        let _that = this;
        api.getUserInfos(function (res) {
          if (res.data.code && res.data.data) {
            console.log(res)
            _that.infos.name = res.data.data.info.name;
            _that.list3 = _that.nationData(res.data.data.t505r);
            _that.infos.racky = [res.data.data.info.racky];
            _that.list1 = _that.marriageData(res.data.data.t5);
            _that.infos.famst = [res.data.data.info.famst];
            _that.list2 = _that.modiData(res.data.data.t7);
            _that.infos.pcode = [res.data.data.info.pcode];
            _that.infos.emailFrom = res.data.data.info.emailFrom;
            _that.infos.emailType = res.data.data.info.emailType;
            _that.infos.email_zui = [_that.emailData(_that.infos.emailType, _that.list5)]
            _that.infos.zzdsffy = res.data.data.info.zzdsffy;
            _that.infos.zzdfyqks = _that.formatdates(res.data.data.info.zzdfyqks);
            _that.infos.zzdfyqjs = _that.formatdates(res.data.data.info.zzdfyqjs);
            _that.list4 = _that.stationData(res.data.data.zbghkxzList);    // 户口性质
            _that.infos.zhrhkxz = [res.data.data.info.zhrhkxz];
            _that.addressData = _that.modifyCode(res.data.data.t0);   // 籍贯集合
            // 籍贯字段
            _that.infos.zhrjg = res.data.data.info.zhrjg;
            // 户口所在地
            _that.infos.residenceAddre.push(res.data.data.info.state5);
            _that.infos.residenceAddre.push(res.data.data.info.state5 + '-' + res.data.data.info.ort015);
            _that.infos.residenceAddre.push(res.data.data.info.state5 + '-' + res.data.data.info.ort015 + '-' + res.data.data.info.ort025);
            // 有效通讯地址
            _that.infos.residenceture.push(res.data.data.info.stateb);
            _that.infos.residenceture.push(res.data.data.info.stateb + '-' + res.data.data.info.ort01b);
            _that.infos.residenceture.push(res.data.data.info.stateb + '-' + res.data.data.info.ort01b + '-' + res.data.data.info.ort02b);
            _that.infos.strasb = res.data.data.info.strasb;
            _that.infos.no = res.data.data.info.no;
            _that.infos.phone = res.data.data.info.phone;
            _that.befphone = res.data.data.info.phone;
            _that.jkData.zzdsg = res.data.data.info.zzdsg;
            _that.jkData.zzdtz = res.data.data.info.zzdtz;
            _that.jkData.zhrscbw = res.data.data.info.zhrscbw;
            _that.jkData.zhrsccd = res.data.data.info.zhrsccd;
            _that.jkData.sbgsz = res.data.data.info.sbgsz;
            _that.jkData.sbadt = res.data.data.info.sbadt;
            _that.jkData.sbdst = res.data.data.info.sbdst;
            _that.jyData.jylist = res.data.data.jylist;
            _that.jyData.xltype = res.data.data.t517t;
            _that.jyData.degree = res.data.data.t519t;
            _that.wklist = res.data.data.wklist;
            _that.zzData.zclist = res.data.data.zclist;
            _that.zzData.zc = res.data.data.zc;
            _that.recordData.dat01 = res.data.data.info.dat01;
            _that.recordData.dat02 = res.data.data.info.dat02;
            _that.recordData.dat06 = res.data.data.info.dat06;
          }
        })
      },
      getadmininfo() {
        let _that = this;
        api.getadmin(function (res) {
          if (res.data.code) {
            console.log(res);
            _that.ddid = res.data.data.data.ddid;
          }
        })
      },
      // 打开钉钉人员page
      openPerInfo() {
        let dd = window.dd;
        let _that = this;
        dd.ready(function () {
          dd.biz.util.open({
            name: 'profile',
            params: {
              id: _that.ddid,
              corpId: ding.CORPID
            },
            onSuccess: function () {
              whole.showTop('跳转至HR的钉钉！');
            },
            onFail: function (err) {
              console.log(err)
              whole.showTop('获取HR钉钉失败！请联系管理员！');
            }
          });
        })
      },
      // admininfo () {
      //   this.showadmin = true;
      // },
      byfn() {
        // 服兵役否时清空时效
        let _that = this;
        if (_that.infos.zzdsffy === '0') {
          _that.infos.zzdfyqks = '';
          _that.infos.zzdfyqjs = '';
        }
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
        // 验证码倒数时间设置
        let _that = this;
        if (this.time > 0) {
          console.log(this.time)
          this.time--;
          setTimeout(this.timer, 1000);
        } else {
          _that.timesrc = false
        }
      },
      nationData(data) {
        // 民族
        for (let item of data) {
          item.name = item.ltext
          item.value = item.racky
        }
        return data;
      },
      marriageData(data) {
        // 婚姻
        for (let item of data) {
          item.name = item.ftext
          item.value = item.famst
        }
        return data;
      },
      modiData(data) {
        // 政治面貌
        for (let item of data) {
          item.name = item.ptext
          item.value = item.pcode
        }
        return data;
      },
      stationData(data) {
        // 户口性质
        for (let item of data) {
          item.name = item.zzdhkxztxt
          item.value = item.zzdhkxz
        }
        return data;
      },
      modifyCode(data) {
        // 籍贯
        for (let item of data) {
          item.parent = item.pvalue
        }
        return data;
      },
      editphone() {
        this.$refs.sj.isFocus = true;
        this.showcode = true;
        this.disabled = false;
        this.infos.phone = this.befphone
      },
      cancelphone() {
        this.showcode = false;
        this.disabled = true;
      },
      emaildd (code, obj) {
        for (let o of obj) {
          if (code === o.value) {
            return o.name
          }
        }
      },
      emailData(code, obj) {
        for (let o of obj) {
          if (code === o.name) {
            return o.value
          }
        }
      },
      formatdates(str) {
        if (str != null) {
          return str.substr(0, 10);
        }
      },
      sendcode: function (cb) {
        this.timer();
        let _that = this;
        this.disabled = !this.disabled
        _that.timesrc = true
        if (_that.infos.phone.length !== 11 || _that.infos.phone === 0) {
          window.alert('手机号不合法，请正确输入！')
          return;
        }
        let params = new window.FormData();
        params.append('phone', _that.infos.phone);
        axios.post('/dingding/es/code', params)
          .then((res) => {
            cb(res);
          }).catch((error) => {
          return Promise.reject(error)
        })
      },
      tojk() {
        // 健康页面跳转
        let _that = this;
        router.push({path: '/healthy', query: {codeData: JSON.stringify(_that.jkData)}})
      },
      tojy() {
        // 教育页面跳转
        let _that = this;
        router.push({path: '/education', query: {codeData: JSON.stringify(_that.jyData)}})
      },
      togz() {
        // 工作履历
        let _that = this;
        router.push({path: '/work', query: {codeData: JSON.stringify(_that.wklist)}})
      },
      torq() {
        // 日期记录
        let _that = this;
        router.push({path: '/dateRecord', query: {codeData: JSON.stringify(_that.recordData)}})
      },
      tojzz() {
        // 职称信息
        let _that = this;
        router.push({path: '/titleInfo', query: {codeData: JSON.stringify(_that.zzData)}})
      },
      saveinfo: function () {
        let _that = this;
        let params = new window.FormData();

        if (_that.infos.phone.length === 0) {
          window.alert('请输入手机号!');
          return;
        }
        params.append('name', _that.infos.name || '');
        params.append('racky', _that.infos.racky || '');
        params.append('famst', _that.infos.famst || '');
        params.append('pcode', _that.infos.pcode || '');
        params.append('zzdsffy', _that.infos.zzdsffy || '');
        params.append('zzdfyqks', _that.infos.zzdfyqks || '');
        params.append('zzdfyqjs', _that.infos.zzdfyqjs || '');
        params.append('zhrhkxz', _that.infos.zhrhkxz || '');
        params.append('zhrjg', _that.infos.zhrjg || '');
        params.append('state5', _that.diqudata.state5 || '');
        params.append('ort015', _that.diqudata.ort015 || '');
        params.append('ort025', _that.diqudata.ort025 || '');
        params.append('stateb', _that.diqudata.stateb || '');
        params.append('ort01b', _that.diqudata.ort01b || '');
        params.append('ort02b', _that.diqudata.ort02b || '');
        params.append('strasb', _that.infos.strasb || '');
        params.append('number', _that.number || '');  // 验证码
        params.append('no', _that.infos.no || '');
        params.append('phone', _that.infos.phone || '');
        if (_that.befphone !== _that.infos.phone && _that.number === '') {
          window.alert('手机号变更， 必须输入验证码')
          return;
        }
        if (_that.infos.email_zui[0] !== null) {
          _that.estr = _that.infos.email_zui[0].toString();
          _that.ename = this.emaildd(_that.estr, _that.list5)
          params.append('email', _that.infos.emailFrom + '@' + _that.ename || '');
          if (_that.infos.emailFrom.indexOf('@') !== -1) {
            window.alert('请输入合法邮箱号码，且不包括后缀名！')
            return;
          }
        }
        axios.post('/dingding/es/info', params)
          .then((res) => {
            //  保存成功 返回true
            if (res.data.code) {
              whole.showTop('保存成功');
              // setTimeout(() => {
              //   let dd = window.dd;
              //   dd.biz.navigation.close({
              //     onSuccess: function (result) {
              //     },
              //     onFail: function (err) {
              //     }
              //   })
              // }, 1500);
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
  /*.detail {*/
  /*text-align: center;*/
  /*height: 50px;*/
  /*position: fixed;*/
  /*line-height: 50px;*/
  /*bottom: 0;*/
  /*border: 1px solid #F1F0F3;*/
  /*background-color: #ffffff;*/
  /*}*/

  .tip {
    color: forestgreen;
    font-size: 1px;
  }

  .demo-content {
    padding: 1px 1px;
  }

  .footer-style {
    text-align: center;
    /*margin-top: 1.5rem;*/
  }

  .baocun {
    border-radius:99px;
    /*margin-top: 0rem;*/
  }

  .button-stye {
    margin-top: 1.5rem;
    font-size: small;
  }

  .button-stye > p {
    text-indent: 3rem;
  }

</style>

