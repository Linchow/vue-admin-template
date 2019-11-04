import Vue from 'vue'
import VueRouter from 'vue-router'
import routerConfig from './router.config'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login'),
    meta: {
      name: '登录'
    }
  },
  {
    path: '/',
    redirect: '/home',
    component: () => import('@/components/Layout'),
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/Home'),
        meta: {
          name: '首页'
        }
      }
    ]
  },
]

const router = new VueRouter({
  routes
})

routerConfig(router);

export default router
