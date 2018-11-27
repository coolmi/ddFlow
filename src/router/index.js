import Vue from 'vue'
import Router from 'vue-router'
// import api from 'api'
// import whole from '@/lib/whole'
// import dingUser from '@/lib/dingUser'
import store from '@/store'
import base from '@/api/baseConfig'
import ding from '@/lib/ding'
import DEM from '@/lib/dingErrMessage'

Vue.use(Router)
let dd = window.dd;
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: require('@/views/material'),
      meta: {
        title: '自助首页',
        ddConfig: true
      }
    },
    {
      path: '/e',
      component: require('@/views/userinfo'),
      meta: {
        title: '自助首页',
        ddConfig: true
      }
    },
    {
      path: '/family',
      component: require('@/views/family'),
      meta: {title: '家庭成员'}
    },
    {
      path: '/familyDetail',
      component: require('@/views/familyDetail'),
      meta: {title: '家庭详细信息'}
    },
    {
      path: '/addfamilyDetail',
      component: require('@/views/addfamilyDetail'),
      meta: {title: '家庭详细信息'}
    },
    {
      path: '/emergency',
      component: require('@/views/emergency'),
      meta: {title: '紧急联系人'}
    },
    {
      path: '/emergencyDetail',
      component: require('@/views/emergencyDetail'),
      meta: {title: '紧急联系人详情'}
    },
    {
      path: '/healthy',
      component: require('@/views/healthy'),
      meta: {title: '健康状况'}
    },
    {
      path: '/education',
      component: require('@/views/education'),
      meta: {title: '教育经历'}
    },
    {
      path: '/educationDetail',
      component: require('@/views/educationDetail'),
      meta: {title: '教育经历详情'}
    },
    {
      path: '/work',
      component: require('@/views/work'),
      meta: {title: '工作履历'}
    },
    {
      path: '/workDetail',
      component: require('@/views/workDetail'),
      meta: {title: '工作详情'}
    },
    {
      path: '/dateRecord',
      component: require('@/views/dateRecord'),
      meta: {title: '日期记录'}
    },
    {
      path: '/titleInfo',
      component: require('@/views/titleInfo'),
      meta: {title: '职称证书'}
    },
    {
      path: '/titleInfoDetail',
      component: require('@/views/titleInfoDetail'),
      meta: {title: '职称证书详情'}
    },
    {
      path: '*',
      component: require('@/views/error'),
      meta: {
        title: '错误'
      }
    },
    {
      path: '/salary',
      component: require('@/views/salary'),
      meta: {title: '工资查询'}
    },
    {
      path: '/viewsalary',
      component: require('@/views/viewsalary'),
      meta: {title: '工资详情'}
    },
    {
      path: '/idnumber',
      component: require('@/views/idnumber'),
      meta: {
        title: '身份证输入',
        leftBtn: {
          text: '退出',
          show: true, // 控制按钮显示， true 显示， false 隐藏， 默认true
          control: true, // 是否控制点击事件，true 控制，false 不控制， 默认false
          showIcon: true, // 是否显示icon，true 显示， false 不显示，默认true； 注：具体UI以客户端为准
          onSuccess: function (result) {
            dd.biz.navigation.close({
              onSuccess: function (result) {
              },
              onFail: function (err) {
              }
            })
          }
        }
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
// else if ((to.fullPath === '/flowHandle' || to.fullPath === '/flowQuery') && !getRequestAuthCode()) {
//     next(false)
//   }
  if (dd.version === null && to.fullPath.indexOf('/cs') < 0) {
    // window.alert('请在钉钉手机端打开')
    next()
  } else {
    if (to.meta.ddConfig) { // 如果ddConfig为ture 则进行授权jsAPI
      setDDConfig(to)
    }
    if (!to.meta.pullToRefresh) {
      dd.ui.pullToRefresh.disable()
    }
    typeof to.meta.title !== undefined && setDocumentTitle(to.meta.title) // 设置title

    if (to.meta.leftBtn) {
      setLeftBtn(to) // 设置左侧按钮
    }
    if (to.meta.rightBtn) {
      setRightBtn(to) // 设置右侧按钮
    }
    next();
  }
});

let setDDConfig = function (to) {
  let path = store.state.ddstate.ddConfigPath || base.baseURL
  ding.jsApiOAuth(path).then((ddconfig) => {
    dd.config(ddconfig)
  }).catch(function (error) {
    ding.alertInfo(DEM.ddConfigInfoError);
  });
}

let setDocumentTitle = function (title) {
  let config = {
    title: title
  }
  dd.ready(function () {
    dd.biz.navigation.setTitle(config);
  });
  dd.error(function (err) {
    console.error('dd setTitle error: ' + window.location.href + JSON.stringify(err));
  });
};

let setLeftBtn = function (to) {
  let config = {
    text: '返回'
  }
  let leftConfig = to.meta.leftBtn || config;
  dd.ready(function () {
    dd.biz.navigation.setLeft(leftConfig);
  });
  dd.error(function (err) {
    console.error('dd setLeftBtn error: ' + window.location.href + JSON.stringify(err));
  });
};

let setRightBtn = function (to) {
  let config = {
    text: '更多'
  }
  let rightConfig = to.meta.rightBtn || config;
  dd.ready(function () {
    dd.biz.navigation.setRight(rightConfig);
  });
  dd.error(function (err) {
    console.error('dd setRightBtn error: ' + window.location.href + JSON.stringify(err));
  });
};

export default router;
