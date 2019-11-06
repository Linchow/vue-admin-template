import Vue from 'vue'
import VueRouter from 'vue-router'
import routerConfig from './router.config'

import Layout from '@/components/Layout'

Vue.use(VueRouter)

// 解决重复点击导航路由报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
}

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login'),
    meta: {
      title: '登录',
      auth: ['noLogin']
    }
  },
  {
    path: '/',
    redirect: '/home',
    component: Layout,
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/Home'),
        meta: {
          title: '首页'
        }
      }
    ]
  },
  {
    path: '/error',
    redirect: '/error/404',
    component: Layout,
    meta: {
      title: '错误页面'
    },
    children: [
      {
        path: '/error/404',
        name: 'Page404',
        component: () => import('@/views/error-page/404'),
        meta: {
          title: '404'
        }
      },
      {
        path: '/error/401',
        name: 'Page401',
        component: () => import('@/views/error-page/401'),
        meta: {
          title: '401'
        }
      },
    ]
  },

  {
    path: '/404',
    name: 'notFound',
    component: () => import('@/views/error-page/404'),
    meta: {
      title: '404',
      auth: ['noLogin']
    }
  },
  {
    path: '*',
    redirect: '/404'
  }
]

const router = new VueRouter({
  routes
})

routerConfig(router);

export default router
