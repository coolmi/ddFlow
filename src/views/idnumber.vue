<template>
  <div>
    <group labelWidth='6rem' gutter='0' labelMarginRight='1rem' title="请输入">
      <x-input title='身份证号:' name='sfcard' v-model='sfcard' placeholder="" ref="sfcardref"
               @on-blur="show"></x-input>
      <x-button text="获取用户信息" @click.native="getLoginByNo"></x-button>
    </group>
  </div>
</template>

<script>
  import {Flexbox, FlexboxItem, XButton, Group, XInput, Selector, PopupPicker, Step, StepItem, XHr} from 'vux'
  // import api from 'api'
  import axios from 'axios'
  import dingUser from '@/lib/dingUser'
  import {mapGetters} from 'vuex'
  import router from '../router'
  export default {
    components: {
      Flexbox,
      FlexboxItem,
      Step,
      StepItem,
      XButton,
      XHr,
      Group,
      XInput,
      Selector,
      PopupPicker
    },
    data () {
      return {
        sfcard: '',
        showPerInfo: false,
        infos: {}
      }
    },
    computed: {
      ...mapGetters({
        path: 'getddConfigPath'
      })
    },
    created() {
      // window.alert(this.$route.query.codeData)
      //   this.getInfos();
    },
    methods: {
      show(val) {
        // 验证身份证号  获取信息
        if (val !== '') {
          this.showPerInfo = true
        } else {
          this.showPerInfo = false
        }
      },
      getLoginByNo() {
        let _that = this;
        dingUser.getRequestAuthCode(window.location.href).then((data) => {
          axios.get('/dingding/es/login?code=' + _that.sfcard + '&no=' + data)
            .then((res) => {
              if (res.data.code === true) {
                router.push({path: '/befHome'})
              } else {
                window.alert('登录失败！')
              }
            }).catch((error) => {
            window.alert('身份证号不匹配！')
            return;
            //   window.alert(JSON.stringify(error));
            //    return Promise.reject(error)
          })
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
</style>

