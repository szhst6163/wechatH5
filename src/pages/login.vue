<template>
  <div class="m-cont">
    <div @touchmove.prevent class="m-login">
      <div class="form">
        <div class="formHead">
        </div>
        <ul>
          <li>
            <div class="name">
              <img src="../images/icon/shouji.png" alt="">
              手机号
            </div>
            <div class="value"><input v-model="form.username" type="tel" maxlength="11"></div>
          </li>
          <li>
            <div class="name">
              <img src="../images/icon/mima.png" alt="">
              密码
            </div>
            <div class="value"><input v-model="form.password" type="password"></div>
          </li>
        </ul>
        <div @click="submit" class="submit">
          <span>登录</span>
        </div>
        <div class="resign">
          <span @click="href">注册账号</span>
        </div>
        <div v-if="!$route.query.noreg" class="wechat">
          <img @click="wechat" src="../images/icon/wechat.png" alt="">
        </div>
      </div>
    </div>
    <common-dialog @close="warnShow = false" class="dialog-cont" v-if="warnShow">
      <div class="dialogWarn">
        <div>首次使用微信登陆需登陆绑定账号，请使用账号密码登陆。</div>
      </div>
      <div slot="btn" class="bottom" @click="warnShow = false">
        确定
      </div>
    </common-dialog>
  </div>
</template>

<script>
  import CommonDialog from "../components/commonDialog";

  export default {
    name: 'tv-detail',
    components: {CommonDialog},
    data() {
      return {
        warnShow: false, veryForm: [{name: 'username', text: "手机号"}, {name: 'password', text: "密码"}],
        form: {
          // username: '18675521031',
          // password: '123456'
          username:'',
          password:''
        }
      }
    },
    computed: {},
    methods: {
      very() {
        return new Promise((resolve, reject) => {
          if (!this.form.username) {
            this.$vux.toast.show('手机号不能为空');
            reject()
          } else if (!this.form.password) {
            this.$vux.toast.show('密码不能为空');
            reject()
          } else {
            resolve()
          }
        })
      },
      submit() {
        this.very()
          .then(() => {
            this.$vux.loading.show();
            this.$axios.post(this.$api.login, this.form)
              .then(res => {
                this.$vux.loading.hide();
                this.$vux.toast.show(res.msg);
                this.$router.replace({path: "index"})
              })
              .catch(err => {
                this.$vux.loading.hide();
              })
          })
      },
      href() {
        this.$router.push({path: '/register'})
      },
      wechat() {
        location.href = location.origin + '/api/weixin/auth'
      }
    },
    mounted() {
      if (this.$route.query.noreg) {
        this.warnShow = true
      }
    },
  }

</script>

<style scoped lang="less">
  @import "../assets/common";

  .dialog-cont {
    .bottom {
      color: #fff;
      justify-content: center;
    }
    .dialogWarn {
      text-align: center;
      font-size: 32px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #111;
    }
  }

  .m-cont {
    &:before {
      background-image: url("../images/icon/login-bg.jpg");
      background-position: top;
      background-size: 100% 100%;
    }
    .wechat {
      margin-top: 30px;
      text-align: center;
      img {
        width: 97px;
        height: 78px;
      }
    }
    .resign{
      font-size: 26px;
      text-align: right;
      padding-right:80px;
    }
    .submit {
      width: 100%;
      margin: 0 auto;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      color: @c10;
      font-weight: 600;
      font-size: 28px;
      margin-bottom:20px;
      span {
        display: block;
        width: 450px;
        background: @c6;
        border-radius: 100px;
        height: 80px;
        line-height: 80px;
      }
    }
    .m-login {
      color: #fff;
      height: 100vh;
      font-size: 22px;
      display: flex;
      align-items: center;
      justify-content: center;
      .user {
        padding: 10px 30px;
      }
      .form {
        padding: 50px 0;
        border-radius: 20px;
        .formHead {
          width: 509px;
          height: 540px;
        }
        ul {
          padding: 20px 40px;
          li {
            box-sizing: border-box;
            width: 450px;
            padding: 0 30px;
            background: @c7;
            height: 80px;
            line-height: 80px;
            display: flex;
            align-items: center;
            border-radius: 100px;
            margin-bottom: 26px;
            .name {
              display: flex;
              align-items: center;
              height: 60px;
              line-height: 60px;
              width: 116px;
              img{
                width: 19px;
                height: 29px;
                margin-right:20px;
              }
            }
            .value {
              height: 100%;
              flex: 1;
              display: flex;
              input {
                padding: 0 20px;
                width: 100%;
                border: none;
                background: none;
                height: 100%;
                color: #fff;
              }
            }
          }
        }
      }
    }
  }
</style>
