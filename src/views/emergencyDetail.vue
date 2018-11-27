<template>
  <div>
    <group title="紧急联系人详细信息" labelWidth="6.5rem" gutter="0" labelMarginRight="1rem">
      <x-input title="紧急联系人" v-model="perobj.fcnam" text-align="right"></x-input>
      <x-input title="联系方式" v-model="perobj.telnr" is-type="china-mobile" text-align="right"></x-input>
    </group>
    <box gap="10px 50px">
      <x-button text="保存" @click.native="saveinfo" class="baocun"  plain type="primary" ></x-button>
    </box>
  </div>
</template>

<script>
  import {Group, PopupPicker, XInput, XButton, Box} from 'vux'
  import whole from '@/lib/whole'
  import axios from 'axios';
  import router from '../router';

  export default {
    components: {
      Group, PopupPicker, XInput, XButton, Box
    },
    data() {
      return {
        perobj: {}
      }
    },
    created() {
      this.perobj = JSON.parse(this.$route.query.pj);
    },
    methods: {
      saveinfo() {
        let _that = this;
        let params = new window.FormData();
        params.append('id', _that.perobj.id || '');
        params.append('fcnam', _that.perobj.fcnam || '');
        params.append('telnr', _that.perobj.telnr || '');
        if (_that.perobj.telnr.length === 0 || _that.perobj.telnr.length !== 11) {
          window.alert('手机号不合法，请正确输入！')
          return;
        }
        axios.post('/dingding/es/emcontact', params)
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
