import Vue from 'vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

let VUE = new Vue();
NProgress.configure({ showSpinner: false });

export default function(router) {
  router.beforeEach((to, from, next) => {
    NProgress.start();
    document.title = `${to.meta.name} - vue-admin-template`;
    next()
  })

  router.afterEach(() => {
    NProgress.done();
  })
}