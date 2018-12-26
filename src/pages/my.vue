<template>
  <div class="m-cont">
    <web-head :active="3"></web-head>
    <div class="m-my">
      <div class="my-head">
        <div class="pic">
          <img :src="my.headimg" alt="">
          <div class="name">{{my.name}}</div>
        </div>
        <img class="m-arrowRight" src="../images/icon/arrowRight.png" alt=""/>
      </div>
      <div class="myHistory">
        <div class="m-line-title">
          <span>我的浏览记录</span>
          <div class="img"><span>{{history.length}}</span><img class="m-arrowRight" src="../images/icon/arrowRight.png" alt=""/></div>
        </div>
        <div class="m-historyList">
          <div @click="tvDetail(item)" v-for="item in history" class="item">
            <div class="pic"><img :src="item.column_image" alt=""></div>
            <div class="text">
              <div>{{item.title}}</div>
              <div>{{item.time}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="m-func-list">
        <ul>
          <li @click="href('/getChance')" class="item">
            <div class="name">
              <img src="../images/icon/flag.png" alt="">
              <div>我的报名机会</div>
            </div>
            <div class="right">
              <span>{{my.numchance}}</span>
              <img class="m-arrowRight" src="../images/icon/arrowRight.png" alt=""/>
            </div>
          </li>
          <li @click="href('/myApply')" class="item">
            <div class="name">
              <img src="../images/icon/coupons.png" alt="">
              <div>我的报名</div>
            </div>
            <div class="right">
              <span>{{my.count_signup}}</span>
              <img class="m-arrowRight" src="../images/icon/arrowRight.png" alt=""/>
            </div>
          </li>
          <li @click="href('/myOrder')" class="item">
            <div class="name">
              <img src="../images/icon/activity.png" alt="">
              <div>我的订单</div>
            </div>
            <div class="right">
              <span>{{my.count_order}}</span>
              <img class="m-arrowRight" src="../images/icon/arrowRight.png" alt=""/>
            </div>
          </li>
          <li @click="href('/myCollect')" class="item">
            <div class="name">
              <img src="../images/icon/like.png" alt="">
              <div>我的收藏</div>
            </div>
            <div class="right">
              <span>{{my.count_collect}}</span>
              <img class="m-arrowRight" src="../images/icon/arrowRight.png" alt=""/>
            </div>
          </li>
        </ul>
      </div>
      <div @click="logout" class="logout">
        退出登录
      </div>
    </div>
  </div>
</template>

<script>
  import { mapMutations, mapActions, mapGetters } from 'vuex'
  import WebHead from "../components/webHead.vue";

  export default {
    name: 'my',
    components: {
      WebHead
    },
    data() {
      return {
        my:{},
        history:[]
      }
    },
    watch: {
    },
    created() {
    },
    computed: {
    },
    mounted() {
      this.init()
    },
    methods:{
      tvDetail(data){
        this.$router.push({path:'/tvDetail',query:{id:data.column_item_id}})
      },
      href(url){
        this.$router.push({path:url})
      },
      logout(){
        var keys=document.cookie.match(/[^ =;]+(?=\=)/g);
        if (keys) {
          for (var i = keys.length; i--;)
            document.cookie=keys[i]+'=0;expires=' + new Date( 0).toUTCString()
        }
        this.$router.replace({path:'/'})
      },
      init(){
        this.$vux.loading.show();
        Promise.all([this.$axios.post(this.$api.myview),this.$axios.post(this.$api.myhistory),])
          .then(res=>{
            this.my = res[0].data;
            this.history = res[1].data;
            this.$vux.loading.hide();
          })
          .catch(err=>{
            this.$vux.loading.hide();
          })
      }
    }
  }

</script>

<style scoped lang="less">
  @import "../assets/common";
  .m-cont{
    font-size: 30px;
    color:#fff;
    .logout{
      margin:100px auto;
      width: 80%;
      height:80px;
      line-height: 80px;
      border-radius: 20px;
      text-align: center;
      background: @c4;
    }
    .my-head{
      margin-bottom:20px;
      background: @c5;
      display: flex;
      justify-content: space-between;
      padding:30px;
      align-items: center;
      .pic{
        display: flex;
        align-items: center;
        img{
          margin-right:30px;
          overflow: hidden;
          border-radius: 100% 100%;
          width: 120px;
          height: 120px;
        }
      }
    }
    .myHistory{
      background: @c5;
      .m-line-title{
        padding:30px;
        position: relative;
        .img{
          display: flex;
          position: absolute;
          right: 30px;
        }
      }
      .m-historyList{
        box-sizing: border-box;
        padding-left:30px;
        padding-bottom:30px;
        width: 100vw;
        overflow-x: auto;
        white-space: nowrap;
        -webkit-overflow-scrolling: touch;
        .item{
          display: inline-block;
          text-align: center;
          .text{
            font-size: 22px;
            >div{
              width: 200px;
              overflow:hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
            }
          }
          .pic{
            margin:0 auto;
            width: 180px;
            height: 240px;
            img{
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
    .m-func-list{
      background: @c5;
      padding:0 30px 40px;
      ul{
        .item{
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom:1px solid #212b4d;
          .right{
            display: flex;
            align-items: center;
          }
          .name{
            height: 80px;
            line-height: 80px;
            display: flex;
            align-items: center;
            img{
              width: 30px;
              height:30px;
              margin-right:10px;
            }
          }
        }
      }
    }
  }
</style>
