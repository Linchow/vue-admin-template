import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import * as util from './util'
import '@/assets/css/base.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

require('./api');
if(process.env.NODE_ENV === 'development') {
  require('./mock');
}
Vue.prototype.$http = axios;
Vue.prototype.util = util;

Vue.use(ElementUI, { size: 'small' })

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
