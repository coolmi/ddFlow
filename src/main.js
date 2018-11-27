import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store';
import {sync} from 'vuex-router-sync'
import MintUI from 'mint-ui'
import api from 'api'
import dingUser from '@/lib/dingUser'
import whole from '@/lib/whole'
import Navigation from '@/nav'
import 'mint-ui/lib/style.min.css'

// use plugin
Vue.use(Navigation, {router})

Vue.use(MintUI);

Vue.use(Navigation, {router, store}) // 后退不刷新

store.dispatch('saveURL', location.href)
store.dispatch('saveDingTalkCode')

dingUser.getRequestAuthCode(location.href).then((data) => {
  api.getLogin(data, function (res) {
    if (res.data.code) {
      initVue();
    } else {
      whole.showTop('获取钉钉免登权限失败')
    }
  })
})

Vue.config.productionTip = false

const FastClick = require('fastclick');
FastClick.attach(document.body);

require('./filters');

sync(store, router);

function initVue() {
  new Vue({
    router,
    store,
    ...App
  }).$mount('#app')
}
