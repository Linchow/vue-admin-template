import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

let VUE = new Vue();
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isNavCollapse: false,
    permissionList: [],
    userInfo: {},
    isLoin: false
  },
  mutations: {
    changeNavCollapse(state) {
      state.isNavCollapse = !state.isNavCollapse;
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
      state.isLoin = !!userInfo;
    }
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
