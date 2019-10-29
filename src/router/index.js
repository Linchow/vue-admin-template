import Vue from 'vue'
import VueRouter from 'vue-router'
import routerConfig from './router.config'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
    meta: {
      name: '登录'
    }
  }
]

const router = new VueRouter({
  routes
})

routerConfig(router);

export default router
