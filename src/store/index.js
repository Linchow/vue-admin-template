import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isNavCollapse: false
  },
  mutations: {
    changeNavCollapse(state) {
      state.isNavCollapse = !state.isNavCollapse;
    }
  },
  actions: {
  },
  modules: {
  }
})
