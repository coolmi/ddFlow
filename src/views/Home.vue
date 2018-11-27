<template>
  <div>
    {{userInfo}}
  </div>
</template>

<script>
  import dingUser from '@/lib/dingUser';
  import {mapGetters} from 'vuex'
  import api from 'api'
  import router from '../router'
  export default {
    data() {
      return {
        userInfo: ''
      }
    },
    computed: {
      ...mapGetters({
        path: 'getddConfigPath'
      })
    },
    created() {
      this.getddUserID();
    },
    methods: {
      getddUserID() {
        dingUser.getRequestAuthCode(this.path).then((data) => {
          api.getLogin(data, function (res) {
            if (res.data.code) {
              router.push({path: '/befHome'})
            }
          });
        })
      }
    }
  }
</script>

<style scoped lang="less">
</style>
