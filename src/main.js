// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import FastClick from 'fastclick'
import store from './store'
import request from '@/lib/request/request'
import apiUrl from './api/api'
import Head from "./components/appHead";
import 'reset-css';
import VueAMap from 'vue-amap';
import {
  Swiper,ToastPlugin,LoadingPlugin,XDialog
} from 'vux'
import 'lib-flexible'
import webBridge from "./lib/webBridge";
import "./assets/resetStyle.less";

Vue.config.productionTip = false;
FastClick.attach(document.body);
Vue.component('swiper', Swiper);
Vue.component('Head', Head);
Vue.component('XDialog', XDialog);
Vue.use(VueAMap);
Vue.use(LoadingPlugin);
Vue.use(ToastPlugin, {type:'text',position: 'middle',width:"auto"});
Vue.prototype.$api = apiUrl

VueAMap.initAMapApiLoader({
  key: '4e4c8706ad7f1d468011d7b1d2340bf2',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor','AMap.Geocoder','AMap.Geolocation'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
