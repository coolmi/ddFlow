<template>
  <div>
    <group title="紧急联系人信息" labelWidth="6.5rem" gutter="0" labelMarginRight="1rem">
      <cell v-for="person in emperson" :key="person.id" :title="person.fcnam" is-link @click.native="toDetail(person)"></cell>
    </group>
    <Group>
      <x-button type="primary" @click.native="savejj">添加紧急联系人</x-button>
    </Group>
  </div>
</template>

<script>
  import {Group, PopupPicker, XInput, Cell, XButton} from 'vux'
  import api from 'api'
  import router from '../router'

  export default {
    components: {
      Group, PopupPicker, XInput, Cell, XButton
    },
    data() {
      return {
        emperson: [],
        jjper: {}
      }
    },
    created() {
      let _that = this;
      api.getjjData(function (res) {
        if (res.data.code) {
          _that.emperson = res.data.data.data;
        }
      })
    },
    methods: {
      toDetail(val) {
        this.jjper = val;
        router.push({path: '/emergencyDetail', query: {pj: JSON.stringify(this.jjper)}})
      },
      savejj() {
        router.push({path: '/emergencyDetail'})
      }
    }
  }
</script>

<style scoped lang='less'>
  @import '~vux/src/styles/1px.less';
</style>
