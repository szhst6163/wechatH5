import router from './router'
import request from '@/lib/request/request'
import storage from './lib/storage'
import Vue from 'vue'
import {isObject} from './lib/dataType'
router.beforeEach((to, from, next) => {
  if(to.path === '/r'){
    next()
  }else{
    if (!storage.get('_userInfo')) {//如果还存在顶号然后账号异常 则把此判读去掉
      try {
        let userInfo = JSON.parse(webBridge.getAppUserInfo())
        storage.put('_userInfo', userInfo)
      }
      catch (ex) {
        console.error('无webBridge.getUserInfo方法，请使用setUserInfo设置TOKEN')
      }
    }

    if (storage.get('_auth')) {
      next()
    } else {
      Vue.$vux.loading.show()
      request.post('/trs/get-permissions')
        .then(res => {
          if(isObject(res.data)){
            res.data = []
          }
          Vue.$vux.loading.hide()
          storage.put('_auth', res.data)
          next()
        })
        .catch(err => {
          Vue.$vux.loading.hide()
          Vue.$vux.toast.show(err.msg)
        })
    }
  }


})
