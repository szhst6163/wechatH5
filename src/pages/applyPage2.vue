<template>
  <div class="m-cont">
    <div class="m-head">
      <span @click="$router.go(-1)">返回</span>
    </div>
    <div class="m-applyPage1">
      <div v-for="(item,i) in formList" class="form">
        <div class="user">用户{{i+1}}</div>
        <ul>
          <li>
            <div class="name">姓名</div>
            <div class="value"><input v-model="item.name" type="text"></div>
          </li>
          <li>
            <div class="name">电话</div>
            <div class="value"><input v-model="item.mobile" type="tel"></div>
          </li>
          <li>
            <div class="name">身份证号码</div>
            <div class="value"><input v-model="item.identitynum" type="text"></div>
          </li>
        </ul>
      </div>
      <div @click="submit" class="submit">
        <span>提交</span>
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
        formList: []
      }
    },
    computed: {},
    methods: {
      init() {
        let num = this.$route.params.num;
        for (let i = 0;i <num; i++) {
          this.formList.push({
            name:'',
            mobile:'',
            identitynum:''
          })
        }

//        this.$vux.loading.show();
//        this.$axios.post(this.$api.tvList.tvDetail,{id:this.$route.query.id})
//          .then(res=>{
//            this.tv = res.data.tv;
//            this.$vux.loading.hide();
//          })
//          .catch(err=>{
//            this.$vux.loading.hide();
//          })
      },
      submit() {
        this.$vux.loading.show();
        this.$axios.post(this.$api.getTicket2,{info:this.formList,sign_id:this.$route.params.sign_id})
          .then(res=>{
            this.$vux.toast.show(res.msg);
            this.$vux.loading.hide();
            this.$router.replace({name: "index"})
          })
          .catch(err=>{
            this.$vux.loading.hide();
          })
      },
      href(data) {
        this.$router.push({name: '/tvDetail', params: {data}})
      }
    },
    mounted() {
      this.init()
    },
  }

</script>

<style scoped lang="less">
  @import "../assets/common";

  .m-cont {
    color: #fff;
    font-size: 24px;
    padding-bottom: 150px;
    .submit {
      position: fixed;
      bottom: 30px;
      width: 100%;
      margin: 0 auto;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      span {
        display: block;
        width: 500px;
        background: @c1;
        border-radius: 20px;
        height: 80px;
        line-height: 80px;
      }
    }
    .m-head {
      color: #fff;
      padding: 30px;
      font-size: 32px;
    }
    .m-applyPage1 {
      color: #fff;
      font-size: 30px;
      background: @c5;
      .user {
        padding: 10px 30px;
      }
      .form {
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
              height: 100%;
              margin-right: 20px;
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
