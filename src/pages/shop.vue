<template>
  <div class="m-cont">
    <web-head :active="2"></web-head>
    <div class="m-head">
      <search-bar></search-bar>
    </div>
    <div class="m-shop">
      <div class="shopList">
        <div class="m-line-title">商品推荐</div>
        <div class="list">
          <div @click="detail" v-for="item in shopList" class="item">
            <div class="img">
              <img src="../images/tv.jpg" alt="">
            </div>
            <div class="title">{{item.title}}</div>
            <div class="price">
              <div>￥{{item.price}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapMutations, mapActions, mapGetters} from 'vuex'
  import WebHead from '../components/webHead';
  import SearchBar from "../components/searchBar";
  import TvListComponents from "../components/tvListComponents.vue";
  import defImg from '../images/icon/baoming.png'

  export default {
    name: 'shop',
    components: {
      TvListComponents,
      SearchBar,
      WebHead,
    },
    data() {
      return {
        shopList:[{title:"XXXXX",price:2100},{title:"XXXXX",price:2100},{title:"XXXXX",price:2100},]
      }
    },
    watch: {},
    created() {
      // this.$wechat.config({
      //   debug: true, // 开启调试模式,
      //   appId: 'wx5c35248abe6d8824', // 必填，企业号的唯一标识，此处填写企业号corpid,
      //   jsApiList: [
      //     "onMenuShareTimeline",//分享朋友圈接口
      //     "onMenuShareAppMessage"//分享给朋友接口
      //   ]
      // });
    },
    computed: {},
    mounted() {
    },
    methods: {
      detail(item){
        this.$router.push({name: '/shopDetail',params:item})
      }
    }
  }

</script>

<style scoped lang="less">
  @import "../assets/common";

  .m-cont {
    .m-head {
      padding-bottom: 30px;
      background: @c5;
    }
    .m-shop {
      margin-top: 20px;
      background: @c5;
      .shopList {
        color: #fff;
        padding: 20px;
        .list {
          padding-top:30px;
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          .item {
            width: 48.5%;
            margin-bottom:20px;
            .img {
              width: 100%;
              img {
                width: 100%;
                height: 100%;
              }
            }
            .title {
              margin-bottom: 5px;
            }
            .price {
              color: @c1;
              display: flex;
              justify-content: space-between;
            }
          }
        }
      }
    }
  }
</style>
