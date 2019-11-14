import axios from 'axios'
import Vue from 'vue'
import $store from '../store'

let VUE = new Vue();

axios.defaults.baseURL = '/api';
axios.defaults.headers.post['Content-Type'] = 'application/json';

// 请求拦截器
axios.interceptors.request.use(config => {
  if(config.method === 'post') {
    config.data = {uuid: $store.state.uuid, ...config.data}
  }
  return config;
}, error => {
  VUE.$message.error('请求超时，请查看您的网络或稍后重试！');
  return Promise.reject(error);
})

// 响应拦截器
axios.interceptors.response.use(res => {
  if(res.data.code === 500) {
    VUE.$message.error(res.data.msg || '接口错误')
  }
  return res.data;
}, error => {
  VUE.$message.error('系统错误，请稍后重试或联系管理员！');
  return Promise.reject(error);
})