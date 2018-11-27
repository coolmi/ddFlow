<template>
  <div>
    <group title="教育经历详细信息" labelWidth="6.5rem" gutter="0" labelMarginRight="1rem">
      <cell v-model="start" title="入学时间"></cell>
      <cell v-model="end" title="毕业时间" ></cell>
      <cell title="学历" :value="edu.valobj.slart, edu.eduData.xltype | getNameByParam" ></cell>
      <cell title="专业" v-model="edu.valobj.zzdzymc"></cell>
      <cell title="学位" :value="edu.valobj.slabs, edu.eduData.degree | getNameBycodes"></cell>
      <cell title="教育方式" :value="edu.valobj.zzdjyfs, list1 | getjyfs"></cell>
      <cell title="毕业学校" v-model="edu.valobj.insti"></cell>
      <cell title="毕业证编号" v-model="edu.valobj.zzdxlbh"></cell>
    </group>
  </div>
</template>

<script>
  import {Group, PopupPicker, XInput, Cell, Datetime} from 'vux'
  import dateFormatter from '@/lib/dateFormatter'

  export default {
    components: {
      Group, PopupPicker, XInput, Datetime, Cell
    },
    data() {
      return {
        edu: {
          valobj: {stext: []},
          eduData: {
            xltype: [],
            degree: []
          }
        },
        jyfs: '',
        valobjs: [],
        start: '',
        end: '',
        list1: [
          {
            name: '01-普通高等教育',
            value: '01'
          }, {
            name: '02-高等教育自学考试',
            value: '02'
          }, {
            name: '03-夜大',
            value: '03'
          }, {
            name: '04-职工大学',
            value: '04'
          }, {
            name: '05-电视大学',
            value: '05'
          }, {
            name: '06-业余大学',
            value: '06'
          }, {
            name: '07-函授大学',
            value: '07'
          }, {
            name: '08-研修班',
            value: '08'
          }, {
            name: '09-高校进修',
            value: '09'
          }, {
            name: '10-党校',
            value: '10'
          }, {
            name: '11-网络远程教育',
            value: '11'
          }, {
            name: '12-其他方式',
            value: '12'
          }
        ]
      }
    },
    created() {
      let _that = this
      let pj = JSON.parse(this.$route.query.pj);
      _that.edu.valobj = pj.valobj;
      _that.edu.eduData.xltype = pj.eduData.xltype;
      _that.edu.eduData.degree = pj.eduData.degree;
      _that.start = dateFormatter.fmtDate(pj.valobj.zzdrxsj, 'yyyy-MM-dd');
      _that.end = dateFormatter.fmtDate(pj.valobj.zzdbysj, 'yyyy-MM-dd');
    },
    filters: {
      getNameByParam(code, obj) {
        let name = ''
        for (let xl of obj) {
          if (code === xl.slart) {
            name = xl.stext;
          }
        }
        return name
      },
      getNameBycodes(code, obj) {
        let name = ''
        for (let xl of obj) {
          if (code === xl.slabs) {
            name = xl.stext;
          }
        }
        return name
      },
      getjyfs(param, list) {
        let name = '';
        for (let obj of list) {
          if (param === obj.value) {
            name = obj.name;
          }
        }
        return name;
      }
    },
    methods: {
      // formatTime(val) {
      //   return val.getFullYear() + '-' + (val.getMonth() + 1) + '-' + (val.getDay());
      // }
    }
  }
</script>

<style scoped lang='less'>
  @import '~vux/src/styles/1px.less';
</style>
