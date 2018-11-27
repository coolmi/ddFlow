<template>
  <div>
    <group title="教育经历信息" labelWidth="10rem" gutter="0" labelMarginRight="1rem">
      <cell v-for="pl of jylist" :key="pl.id" :title="pl.insti, pl.slart, edu.eduData.xltype | getNameByCode" @click.native="clickPro(pl)" is-link></cell>
    </group>
  </div>
</template>

<script>
  import {Group, PopupPicker, XInput, Datetime, Cell} from 'vux'
  // import api from 'api'
  // import router from '../router'
  // import whole from '@/lib/whole'

  export default {
    components: {
      Group, PopupPicker, XInput, Datetime, Cell
    },
    data() {
      return {
        jylist: [],
        edu: {
          valobj: {},
          eduData: {
            xltype: [],
            degree: []
          }
        }
      }
    },
    created() {
      let _that = this
      let educations = JSON.parse(this.$route.query.codeData);
      _that.jylist = educations.jylist;
      _that.edu.eduData.xltype = educations.xltype;
      _that.edu.eduData.degree = educations.degree;
    },
    filters: {
      getNameByCode(title, code, obj) {
        let name = ''
        for (let xl of obj) {
          if (code === xl.slart) {
            name = xl.stext;
          }
        }
        return `${title} ${name}`
      }
    },
    methods: {
      clickPro(val) {
        let _that = this;
        _that.edu.valobj = val;
        this.$router.push({path: '/educationDetail', query: {pj: JSON.stringify(_that.edu)}})
      }
    }
  }
</script>

<style scoped lang='less'>
  @import '~vux/src/styles/1px.less';
</style>
