import Vue from 'vue'
import $store from '../store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

let VUE = new Vue();
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
    let isLogin = $store.state.isLoin;
    if(authList.indexOf('noLogin') > -1) {
      next();
    }else if(!isLogin) {
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