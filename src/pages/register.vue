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
            <div class="value"><input v-model="form.code" type="text"></div>
          </li>
        </ul>
        <div @click="submit" class="submit">
          <span>注册</span>
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
        if(this.isDown) return;
        this.$axios.post(this.$api.sendSms,{mobile:this.form.username,type:1})
          .then(res=>{
            that.codeTime = 60;
            this.isDown = true;
            countDown()
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
                this.$router.replace({path:"/login"})
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
    background: url('../images/icon/pic2.png');
    background-size: 100%;
    background-position-y: center;
    background-repeat: no-repeat;
    .submit{
      width: 100%;
      margin:0 auto;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      span{
        display: block;
        width: 500px;
        background: @c1;
        border-radius: 20px;
        height:80px;
        line-height: 80px;
      }
    }
    .m-login {
      color: #fff;
      height: 100vh;
      font-size: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      .user{
        padding:10px 30px;
      }
      .form{
        background: @c5;
        padding:50px 0;
        border-radius: 20px;
        margin:30px;
        background: @c8;
        .formHead{
          text-align: center;
        }
        ul {
          padding: 20px 40px;
          li {
            padding: 0 40px;
            background: @c7;
            height: 80px;
            line-height: 80px;
            display: flex;
            align-items: center;
            margin-bottom: 20px;
            border-radius: 20px;
            &.smsCode{
              justify-content: space-around;
              position: relative;
              .getCode{
                position: absolute;
                right:20px;
                top:20%;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 160px;
                border:1px solid @c1;
                color:@c1;
                padding:10px;
                text-align: center;
                font-size: 20px;
                line-height: 30px;
              }
            }
            .name {
              width: 200px;
              height: 60px;
              line-height: 60px;
              padding-right: 20px;
              border-right: 1px solid #fff;
            }
            .value {
              height: 100%;
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
