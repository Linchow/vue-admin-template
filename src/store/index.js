import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

let VUE = new Vue();
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isNavCollapse: false,
    tabList: [{path: '/home', name: 'home', title: '首页'}],
    userInfo: {},
    token: localStorage.getItem('token') || '',
    isLogin: false,
  },
  mutations: {
    changeNavCollapse(state) {
      state.isNavCollapse = !state.isNavCollapse;
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
      state.token = userInfo.token || '';
      if(state.token) {
        localStorage.setItem('token', state.token);
        state.isLogin = true;
      }else {
        localStorage.removeItem('token');
        state.isLogin = false;
      }
    },
    addTabList(state, tabList) {
      state.tabList = tabList;
    },
  },
  actions: {
    getUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        VUE.$http.post('/user/info', {}).then(res => {
          if(res.code === 1000) {
            commit('setUserInfo', res.data)
            resolve(res.data)
          }else {
            reject(res.data)
          }
        }).catch(error => {
          reject(error)
        })
      })
    }
  },
  plugins: process.env.NODE_ENV === 'production' ? [] : [createLogger()]
})
