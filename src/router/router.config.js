import $store from '../store'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false });

export default function($router) {
  $router.beforeEach((to, from, next) => {
    NProgress.start();

    let title = 'vue-admin-template';
    if(to.meta && to.meta.title) {
      title = `${to.meta.title} - ${title}`;
    }
    document.title = title;

    let authList = to.meta && to.meta.auth || [];
    let uuid = $store.state.uuid;
    let isLogin = $store.state.isLogin;

    if(authList.indexOf('noLogin') > -1) { // 白名单，不需要登陆信息
      next();
    }else if(!uuid) { // 未获取uuid
      Message.error('登陆失效，请重新登陆')
      next({
        path: '/login',
        query: {redirect: to.fullPath},
      })
      NProgress.done()
    }else if(!isLogin) { // 未获取登陆信息
      $store.dispatch('getUserInfo').then(res => {
        next();
      }).catch(error => {
        next({
          path: '/login',
          query: {redirect: to.fullPath},
        })
        NProgress.done();
      })
    }else {
      next();
    }
  })

  $router.afterEach(() => {
    NProgress.done();
  })
}