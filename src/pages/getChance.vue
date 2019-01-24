<template>
  <div class="m-cont">
    <div class="m-head">
      <span @click="$router.go(-1)">返回</span>
    </div>
    <div class="m-login">
      <img src="../images/icon/pic3.png" alt="">
      <div class="form">
        <div class="formHead">
          兑换报名机会
        </div>
        <ul>
          <li>
            <div class="name">通行证密码</div>
            <div class="value"><input v-model="form.code" placeholder="请区分英文字母大小写" type="text"></div>
          </li>
        </ul>
        <div @click="submit" class="submit">
          <span>兑换</span>
        </div>
      </div>
      <div class="formTips">
        Tips: <br>
        请输入《综艺通行证》密码兑换报名机会，一个密码可兑换一个机会，注册时使用的密码已自动兑换。
      </div>
    </div>
  </div>
</template>

<script>
  import {mapMutations, mapActions, mapGetters} from 'vuex'
  import regular from "../lib/regular";

  export default {
    name: 'tv-detail',
    components: {},
    data() {
      return {
        form:{
          code:''
        }
      }
    },
    computed: {},
    methods: {
      very(){
        return new Promise((resolve,reject)=>{
          if(!this.form.code){
            this.$vux.toast.show('综艺通行证不能为空');
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
            this.$axios.post(this.$api.getchance,this.form)
              .then(res=>{
                this.$vux.loading.hide();
                this.$vux.toast.show(res.msg)
                this.$router.replace({path:"/my"})
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
    .m-head{
      padding:30px;
    }
    .submit{
      width: 100%;
      margin:0 auto;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      span{
        display: block;
        width: 550px;
        background: @c1;
        border-radius: 20px;
        height:80px;
        line-height: 80px;
      }
    }
    .m-login {
      height: 80vh;
      font-size: 30px;
      display: flex;
      flex-direction: column;
      align-items: center;
      img{
        width: 560px;
        height: 187px;
        margin:100px 0;
      }
      .user{
        padding:10px 30px;
      }
      .formTips{
        border-top:1PX dashed @c5;
        font-size: 18px;
        box-sizing: border-box;
        background: @c8;
        padding:50px;
        border-radius: 20px;
        width: 80%;
      }
      .form{
        background: @c8;
        padding:50px 0;
        border-radius: 20px;
        width: 80%;
        .formHead{
          text-align: center;
        }
        ul {
          padding: 20px;
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
                font-size: 24px;
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
