import Vue from 'vue'
import axios from 'axios'
import router from '../../router'
import {
  ToastPlugin
} from 'vux'
import storage from '../storage'
import Qs from 'qs'
let apiHead = process.env.NODE_ENV === 'development'?'/proxy/':'';
// create an axios instance
const service = axios.create({
  baseURL: apiHead, // api的base_url
  timeout: 30000, // request timeout,
  transformRequest: [function (data) {//若要继续使用mock 注释这一段
    data = Qs.stringify(data);
    return data;
  }],
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  }

})

// request interceptor
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    // config.headers['token'] = '340f028323bf4e978962a1aa54992f80'
    // return config
    if (storage.get('_userInfo')) {
      config.headers['token'] = storage.get('_userInfo').token;
      return config
    } else {
      return config
    }
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// respone interceptor
service.interceptors.response.use(
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过xmlhttprequest来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
  response => {
    if (response.status === 200) {
      if (response.data.error !== 0) {
        Vue.$vux.toast.show(response.data.msg);
        if (response.data.error === 400) {
          router.push({path:'/'})
        }
        return Promise.reject(response)
      } else {
        return Promise.resolve(response.data)
      }
    } else {
      Vue.$vux.toast.show('错误编码：' + response.status);
      return Promise.reject(response)
    }
  },
  error => {
    console.log('err' + error) // for debug
    Vue.$vux.toast.show(error.message)
    return Promise.reject(error)
  }
)

export default service
Vue.prototype.$axios = service
Vue.use(ToastPlugin, {
  type: 'text',
  position: 'middle',
  width: "auto"
})
