<template>
  <div class="m-cont">
    <div class="m-login">
      <div class="form">
        <div class="formHead">
          用户注册
        </div>
        <ul>
          <li>
            <div class="name">手机号</div>
            <div class="value"><input v-model="form.username" type="tel" maxlength="11"></div>
          </li>
          <li class="smsCode">
            <div class="name">短信验证码</div>
            <div class="value">
              <input v-model="form.smscode" type="text">
              <div @click="getCode" class="getCode"><span v-if="codeTime <= 0">获取验证码</span><span v-if="codeTime > 0">({{codeTime}}s)</span></div>
            </div>
          </li>
          <li>
            <div class="name">密码</div>
            <div class="value"><input v-model="form.password" type="password"></div>
          </li>
          <li>
            <div class="name">确认密码</div>
            <div class="value"><input v-model="rePassword" type="password"></div>
          </li>
          <li>
            <div class="name">通行证密码</div>
            <div class="value"><input placeholder="请区分英文字母大小写" v-model="form.code" type="text"></div>
          </li>
        </ul>
        <div @click="submit" class="submit">
          <span>注册</span>
        </div>
        <div class="to-login">
          <span @click="toLogin">已有账号？</span>
        </div>
      </div>
      <common-dialog @close="close" class="dialog-cont" v-if="warnShow">
        <div class="dialogWarn">
          <div>{{msg}}</div>
        </div>
        <div slot="btn" class="bottom" @click="warnShow = false">
          确定
        </div>
      </common-dialog>
    </div>
  </div>
</template>

<script>
  import {mapMutations, mapActions, mapGetters} from 'vuex'
  import regular from "../lib/regular";
  import CommonDialog from "../components/commonDialog.vue";

  export default {
    name: 'tv-detail',
    components: {CommonDialog},
    data() {
      return {
        codeTime:0,
        isDown:false,
        warnShow:false,
        isLock:false,
        Timmer:null,
        rePassword:'',
        msg:"",
        form:{
          username:'',
          password:'',
          code:''
        }
      }
    },
    computed: {},
    methods: {
      toLogin(){
        this.$router.push({path:'/',query:{noreg:this.$route.query.noreg}})
      },
      close(){
        this.warnShow = false
      },
      showToast(msg){
        this.warnShow = true
        this.msg = msg;
      },
      very(){
        return new Promise((resolve,reject)=>{
          if(!this.form.username||this.form.username.length<11){
            this.showToast('手机号不正确');
            reject()
          }else if(!this.form.smscode){
            this.showToast('短信验证码不能为空');
            reject()
          }else if(!this.form.password){
            this.showToast('密码不能为空');
            reject()
          }else if(this.form.password !== this.rePassword){
            this.showToast('两次密码输入不一致');
            reject()
          }else if(!this.form.code){
            this.showToast('综艺通行证不能为空');
            reject()
          }else{
            resolve()
          }
        })
      },
      getCode(){
        if(!this.form.username||!regular.mobile(this.form.username)){
          this.showToast("请输入正确的手机号码！");
          return;
        }
        let that = this;
        if(this.isDown||this.isLock) return;
        this.isLock = true;
        this.$axios.post(this.$api.sendSms,{mobile:this.form.username,type:1})
          .then(res=>{
            that.codeTime = 60;
            this.isDown = true;
            this.isLock = false;
            countDown()
          })
          .catch(e=>{
            this.isLock = false;
          });
        function countDown(){
          setTimeout(()=>{
            if(that.codeTime > 0){
              that.codeTime--;
              countDown();
            }else{
              that.isDown = false;
              return;
            }
          },1000)
        }
      },
      submit(){
        this.very()
          .then(()=>{
            this.$vux.loading.show();
            this.$axios.post(this.$api.register,this.form)
              .then(res=>{
                this.$vux.loading.hide();
                this.$vux.toast.show(res.msg)
                this.$router.replace({path:"/"})
              })
              .catch(err=>{
                this.$vux.loading.hide();
              })
          })
      },
      href(data) {
        this.$router.push({path: '/tvDetail', query: {data}})
      }
    },
    mounted() {
    },
  }

</script>

<style scoped lang="less">
  @import "../assets/common";
  .dialog-cont{
    .bottom{
      color:#fff;
      justify-content: center;
    }
    .dialogWarn{
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #111;
    }
  }
  .m-cont {
    color: #fff;
    font-size: 24px;
    background-size: 100%;
    background-position-y: center;
    background-repeat: no-repeat;
    .to-login{
      width: 100%;
      margin:0 auto;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      text-decoration:underline;
      span{
        display: block;
        border-radius: 20px;
        margin-right:30px;
        margin-top:30px;
      }
    }
    .submit{
      width: 450px;
      margin:0 auto;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      color: @c1;
      font-size: 28px;
      font-weight: 600;
      span{
        display: block;
        width: 500px;
        background: @c6;
        border-radius: 100px;
        height:80px;
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
      .user{
        padding:10px 30px;
      }
      .form{
        padding:50px 0;
        border-radius: 30px;
        margin:30px;
        background: @c7;
        .formHead{
          font-size: 32px;
          text-align: center;
        }
        ul {
          padding: 20px 70px;
          width: 580px;
          box-sizing: border-box;
          li {
            box-sizing: border-box;
            padding: 0 40px;
            background: @c7;
            height: 80px;
            line-height: 80px;
            display: flex;
            align-items: center;
            margin-bottom: 20px;
            border-radius: 100px;
            width: 450px;
            &.smsCode{
              justify-content: space-around;
              position: relative;
              .getCode{
                position: absolute;
                right:20px;
                top:26%;
                display: flex;
                align-items: center;
                justify-content: center;
                border:1px solid @c6;
                color:@c6;
                padding:5px;
                text-align: center;
                font-size: 20px;
                line-height: 30px;
              }
            }
            .name {
              width: 200px;
              height: 40px;
              line-height: 40px;
              padding-right: 10px;
              border-right: 1px solid #fff;
            }
            .value {
              font-size: 24px;
              height: 100%;
              display: flex;
              input {
                padding: 0 20px;
                width: 100%;
                border: none;
                background: none;
                height: 100%;
                line-height: 40px;
                color: #fff;
                &::-webkit-input-placeholder { /* WebKit browsers */
                  font-size: 16px;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
