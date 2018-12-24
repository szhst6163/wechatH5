<template>
  <div class="m-cont">
    <div class="m-login">
      <div class="form">
        <div class="formHead">
          用户登陆
        </div>
        <ul>
          <li>
            <div class="name">手机号</div>
            <div class="value"><input v-model="form.username" type="tel" maxlength="11"></div>
          </li>
          <li>
            <div class="name">密码</div>
            <div class="value"><input v-model="form.password" type="password"></div>
          </li>
        </ul>
        <div @click="submit" class="submit">
          <span>登陆</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapMutations, mapActions, mapGetters} from 'vuex'

  export default {
    name: 'tv-detail',
    components: {},
    data() {
      return {
        veryForm:[{name:'username',text:"手机号"},{name:'password',text:"密码"}],
        form:{
          username:'18675521031',
          password:'123456'
        }
      }
    },
    computed: {},
    methods: {
      very(){
        return new Promise((resolve,reject)=>{
          if(!this.form.username){
            this.$vux.toast.show('手机号不能为空');
            reject()
          }else if(!this.form.password){
            this.$vux.toast.show('密码不能为空');
            reject()
          }else{
            resolve()
          }
        })
      },
      submit(){
        this.very()
          .then(()=>{
            this.$vux.loading.show();
            this.$axios.post(this.$api.login,this.form)
              .then(res=>{
                this.$vux.loading.hide();
                this.$vux.toast.show(res.msg);
                this.$router.replace({path:"index"})
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

  .m-cont {
    color: #fff;
    font-size: 24px;
    background: url('../images/icon/pic2.png');
    background-size: 100%;
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
            .name {
              height: 60px;
              line-height: 60px;
              padding-right: 20px;
              width: 100px;
              border-right: 1px solid #fff;
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
