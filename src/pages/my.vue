<template>
  <div class="m-cont">
    <web-head :active="3"></web-head>
    <div class="m-my">
      <div class="my-head">
        <div class="pic">
          <img src="../images/picAdd.png" alt="">
          <div class="name">XXXX</div>
        </div>
        <img class="m-arrowRight" src="../images/icon/arrowRight.png" alt=""/>
      </div>
      <div class="myHistory">
        <div class="m-line-title">
          <span>我的浏览记录</span>
          <div class="img"><span>{{history.length}}</span><img class="m-arrowRight" src="../images/icon/arrowRight.png" alt=""/></div>
        </div>
        <div class="m-historyList">
          <div v-for="item in history" class="item">
            <div class="pic"><img src="../images/tv.jpg" alt=""></div>
            <div class="text">
              <div>{{item.title}}</div>
              <div>{{item.time}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="m-func-list">
        <ul>
          <li @click="href('/myApply')" class="item">
            <div class="name">
              <img src="../images/icon/shopPrice.png" alt="">
              <div>我的报名</div>
            </div>
            <div class="right">
              <span>10</span>
              <img class="m-arrowRight" src="../images/icon/arrowRight.png" alt=""/>
            </div>
          </li>
          <li @click="href('/myOrder')" class="item">
            <div class="name">
              <img src="../images/icon/shopPrice.png" alt="">
              <div>我的订单</div>
            </div>
            <div class="right">
              <span>10</span>
              <img class="m-arrowRight" src="../images/icon/arrowRight.png" alt=""/>
            </div>
          </li>
          <li @click="href('/myCollect')" class="item">
            <div class="name">
              <img src="../images/icon/shopPrice.png" alt="">
              <div>我的收藏</div>
            </div>
            <div class="right">
              <span>10</span>
              <img class="m-arrowRight" src="../images/icon/arrowRight.png" alt=""/>
            </div>
          </li>
          <li class="item">
            <div class="name">
              <img src="../images/icon/shopPrice.png" alt="">
              <div>关于</div>
            </div>
            <div class="right">
              <span>10</span>
              <img class="m-arrowRight" src="../images/icon/arrowRight.png" alt=""/>
            </div>
          </li>
        </ul>
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
        history:[{title:"《超级星光大道》",time:"2010-10-10"},{title:"超级星光大道",time:"2010-10-10"},{title:"超级星光大道",time:"2010-10-10"},{title:"超级星光大道",time:"2010-10-10"},{title:"超级星光大道",time:"2010-10-10"},{title:"超级星光大道",time:"2010-10-10"},{title:"超级星光大道",time:"2010-10-10"}]
      }
    },
    watch: {
    },
    created() {
    },
    computed: {
    },
    mounted() {
    },
    methods:{
      href(url){
        this.$router.push({name:url})
      }
    }
  }

</script>

<style scoped lang="less">
  @import "../assets/common";
  .m-cont{
    font-size: 30px;
    color:#fff;
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
              margin-right:20px;
            }
          }
        }
      }
    }
  }
</style>
