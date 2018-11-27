<template>
  <div class="m-cont">
    <Head :headData="1">修改密码</Head>
    <div class="form">
      <div class="form-group">
        <div class="container">
          <img src="../images/icon/password.png" alt="" class="password">
          <span class="container-title">原始密码</span>
          <input type="password" class="form-input" placeholder="请输入" v-model="formData.oldPassword"/>
        </div>
        <div class="container">
          <img src="../images/icon/password.png" alt="" class="password">
          <span class="container-title">新密码</span>
          <input type="password" class="form-input" placeholder="请输入" v-model="formData.newPassword"/>
        </div>
        <div class="container">
          <img src="../images/icon/password.png" alt="" class="password">
          <span class="container-title">确认新密码</span>
          <input type="password" class="form-input" placeholder="请输入" v-model="formData.affirmPassword"/>
        </div>
      </div>
      <p class="tip">为了安全请设置8-20位字符的密码</p>
    </div>
    <footer>
      <div class="btn" @click="save">保存</div>
    </footer>
  </div>
</template>

<script>
import storage from '../lib/storage'
export default {
  data() {
    return {
      formData: {
        oldPassword: '',
        newPassword: '',
        affirmPassword: ''
      },
    }
  },
  methods: {
    save() {
      if (!this.formData.oldPassword) {
        this.$vux.toast.show('原始密码不能为空')
        return false
      }
      if (!this.formData.newPassword) {
        this.$vux.toast.show('新密码不能为空')
        return false
      }
      if (this.formData.newPassword.length < 8 || this.formData.newPassword.length > 20) {
        this.$vux.toast.show('请输入8-20位字符的密码')
        return false
      }
      if (this.formData.newPassword !== this.formData.affirmPassword) {
        this.$vux.toast.show('两次密码输入不一致')
        return false
      }
      this.postAjax(this.$api.changePassWord, this.formData)
        .then(res => {
          this.$vux.toast.show(res.msg)
          if (res.code === 0) {
            setTimeout(() => {
              let u = navigator.userAgent;
              let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
              storage.clear('_userInfo');
              if (isAndroid) {
                app.logout();
                app.goLogin();
              } else {
                window.webkit.messageHandlers.logout.postMessage('');
                window.webkit.messageHandlers.goLogin.postMessage('');
              }
            }, 1500)
          }
        })
    },
    postAjax(url, data) {
      return new Promise((resolve, reject) => {
        this.$axios.post(url, data).then(res => {
          if (res.code === 0) {
            resolve(res)
          } else {
            this.$vux.toast.show(res.msg)
            reject(res)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
  }
}
</script>

<style scoped lang="scss">
.m-cont {
  min-height: 100vh;
}
footer {
  position: fixed;
  bottom: 24px;
  width: 100%;
  z-index: 999;
  .btn {
    width: 586px;
    height: 80px;
    line-height: 80px;
    background: linear-gradient(
      90deg,
      rgba(32, 222, 148, 1) 0%,
      rgba(13, 183, 156, 1) 100%
    );
    box-shadow: 0px 7px 9px 0px rgba(217, 245, 237, 1);
    border-radius: 80px;
    margin: 0 auto;
    text-align: center;
    color: #ffffff;
    font-size: 30px;
  }
}
.tip {
  margin: 16px 77px;
  font-size: 20px;
  color: #666666;
}
.form-input {
  font-size: 32px;
}
</style>
