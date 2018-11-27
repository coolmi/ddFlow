<template>
  <div>
    <group title="家庭成员详细信息" labelWidth="6.5rem" gutter="0" labelMarginRight="1rem">
      <popup-picker title="称谓" :data="jtcw" v-model="person.subty" :columns="1" show-name value-text-align="right" ></popup-picker>
      <x-input title="姓名" v-model="person.fcnam" text-align="right"></x-input>
      <x-input title="工作单位" v-model="person.zzdszdww" text-align="right"></x-input>
      <x-input title="所在部门" v-model="person.zzdszbmm" text-align="right"></x-input>
      <x-input title="岗位" v-model="person.zzdszgww" text-align="right"></x-input>
      <x-input title="联系方式" v-model="person.telnr" is-type="china-mobile" text-align="right"></x-input>
    </group>
    <box gap="10px 50px">
      <x-button text="保存" @click.native="saveinfo" class="baocun"  plain type="primary" ></x-button>
    </box>
  </div>
</template>

<script>
  import {Group, PopupPicker, XInput, Cell, XButton, Box} from 'vux'
  import whole from '@/lib/whole';
  import axios from 'axios';
  import router from '../router';

  export default {
    components: {
      Group, PopupPicker, XInput, Cell, XButton, Box
    },
    data() {
      return {
        person: {
          subty: [],
          fcnam: '',
          zzdszdww: '',
          zzdszbmm: '',
          zzdszgww: '',
          telnr: ''
        },
        jtcw: []
      }
    },
    created() {
      let obj = JSON.parse(this.$route.query.addobj);
      this.jtcw = this.cwData(obj);
    },
    methods: {
      cwData(data) {
        // 户口性质
        for (let item of data) {
          item.name = item.stext
          item.value = item.subty
        }
        return data;
      },
      saveinfo() {
        let _that = this;
        let params = new window.FormData();
        console.log(this.person);
        console.log(this.person.subty);
        params.append('subty', _that.person.subty || '');
        params.append('fcnam', _that.person.fcnam || '');
        params.append('zzdszdww', _that.person.zzdszdww || '');
        params.append('zzdszbmm', _that.person.zzdszbmm || '');
        params.append('zzdszgww', _that.person.zzdszgww || '');
        params.append('telnr', _that.person.telnr || '');
        if (_that.person.telnr.length === 0 || _that.person.telnr.length !== 11) {
          window.alert('手机号不合法，请正确输入！')
          return;
        }
        axios.post('/dingding/es/family', params)
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
