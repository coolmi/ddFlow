<template>
  <div>
    <group>
      <datetime title="选择月份" v-model="alldate" format="YYYY-MM" :max-year="currentyear"></datetime>
    </group>
    <box gap="10px 10px">
      <x-button plain text="查询" @click.native="getSalary"></x-button>
    </box>
  </div>
</template>

<script>
  import {Group, Datetime, XButton, Box} from 'vux'
  import api from 'api'
  import router from '../router'
  import whole from '@/lib/whole'
  export default {
    components: {
      Group, Datetime, XButton, Box
    },
    data () {
      return {
        alldate: '',
        currentyear: '',
        currentmonth: '',
        showPerInfo: false,
        infos: {}
      }
    },
    created() {
      this.validateBankNo();
    },
    methods: {
      validateBankNo() {
        let dd = window.dd;
        let _that = this;
        dd.ready(
          dd.device.notification.prompt({
            message: '请输入银行卡后6位？',
            title: '提示',
            defaultText: '111111',
            buttonLabels: ['确定', '取消'],
            onSuccess: function (result) {
              // onSuccess将在点击button之后回调
              /*
               {
               buttonIndex: 0, //  被点击按钮的索引值，Number类型，从0开始
               value: '' //  输入的值
               }
               */
              let buttonIndex = result.buttonIndex;
              if (buttonIndex === 0) {
                api.validateBankCard(result.value, function (res) {
                  if (res.data.data.result && res.data.data.result === 'true') {
                    _that.getNow();
                  } else {
                    whole.showTop('输入错误，请重新输入');
                    _that.validateBankNo();
                  }
                });
              } else if (buttonIndex === 1) {
                setTimeout(() => {
                  dd.biz.navigation.close({
                    onSuccess: function(result) {
                    },
                    onFail: function(err) {}
                  })
                }, 500)
              }
            },
            onFail: function (err) {
            }
          })
        )
      },
      getNow() {
        // 设定结束年为当前年
        let now = new Date();
        let _that = this;
//        window.alert(now.getMonth())
        if (now.getMonth() !== 0) {
          _that.currentyear = now.getUTCFullYear();
          _that.currentmonth = now.getMonth();
        } else {
          _that.currentyear = now.getUTCFullYear() - 1;
          _that.currentmonth = 12;
        }
        _that.alldate = _that.currentyear + '-' + _that.currentmonth
      },
      getSalary() {
        let systemDate = new Date();
        let sameDay = systemDate.getDate();
        if (sameDay < 15) {
          whole.showTop('15号之前，暂不能查询上月工资信息');
        } else {
          let _that = this;
          // window.alert(_that.alldate)
          let date = _that.alldate.split('-');
          let year = date[0];
          let month = date[1];
          api.getSalary(year, month, function (res) {
            if (res.data.code) {
              router.push({path: '/viewsalary', query: {codeData: res.data.data}})
            } else {
              window.alert('数据查询失败，请联系管理员')
            }
          })
        }
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
