<template>
  <div class="m-cont">
    <div class="m-head">
      <span @click="$router.go(-1)">返回</span>
    </div>
    <div class="m-login">
      <div class="form">
        <div class="formHead">
          兑换报名名额
        </div>
        <ul>
          <li>
            <div class="name">兑换码</div>
            <div class="value"><input v-model="form.code" type="text"></div>
          </li>
        </ul>
        <div @click="submit" class="submit">
          <span>兑换</span>
        </div>
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
            this.$vux.toast.show('兑换码不能为空');
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
      background: url('../images/icon/bg2.png');
      background-size: 100%;
      background-repeat: no-repeat;
      color: #fff;
      height: 80vh;
      font-size: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      .user{
        padding:10px 30px;
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
