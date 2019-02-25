// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import FastClick from 'fastclick'
import store from './store'
import request from '@/lib/request/request'
import apiUrl from './api/api'
import 'reset-css';
import {
  ToastPlugin,LoadingPlugin,XDialog,WechatPlugin
} from 'vux'
import 'lib-flexible'
import "./assets/resetStyle.less";
import wxConfig from './api/wxConfig'

Vue.config.productionTip = false;
FastClick.attach(document.body);
Vue.component('XDialog', XDialog);
Vue.use(LoadingPlugin);
Vue.use(WechatPlugin);
Vue.use(ToastPlugin, {type:'text',position: 'middle',width:"auto"});
Vue.prototype.$api = apiUrl
Vue.prototype.wxConfig = wxConfig;
/* eslint-disable no-new */
import 'babel-polyfill'
import Es6Promise from 'es6-promise'
require('es6-promise').polyfill()
Es6Promise.polyfill()
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
