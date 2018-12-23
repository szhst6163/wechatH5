<template>
  <div class="m-cont">
    <web-head :active="0"></web-head>
    <div class="m-swiper">
      <swiper :code="'index'"></swiper>
    </div>
    <div class="m-classify">
      <search-bar></search-bar>
      <div class="funList">
        <div @click="href('/tvList')" class="item">
          <div class="img"><img src="../images/icon/baoming.png" alt=""></div>
          <div>报名</div>
        </div>
        <div @click="href('/shop')" class="item">
          <div class="img"><img src="../images/icon/shop.png" alt=""></div>
          <div>商品</div>
        </div>
      </div>
    </div>
    <tv-list-components class="m-tvList"></tv-list-components>
  </div>
</template>

<script>
  import {mapMutations, mapActions, mapGetters} from 'vuex'
  import WebHead from '../components/webHead';
  import Swiper from '../components/swiperBanner.vue'
  import SearchBar from "../components/searchBar";
  import TvListComponents from "../components/tvListComponents.vue";

  export default {
    name: 'index',
    components: {
      TvListComponents,
      SearchBar,
      WebHead,
      Swiper
    },
    data() {
      return {
        bannerList: []
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
      href(url) {
        this.$router.push({name: url})
      }
    }
  }

</script>

<style scoped lang="less">
  @import "../assets/common";

  .m-cont {
    .m-swiper {
      height: 410px;
    }
    .m-classify {
      padding: 30px 0;
      background: @c5;
      .funList {
        display: flex;
        justify-content: space-around;
        margin-top: 40px;
        .item {
          color: #fff;
          display: flex;
          align-items: center;
          flex-direction: column;
          .img {
            width: 90px;
            height: 90px;
            border-radius: 10px;
            padding: 10px;
            margin-bottom: 10px;
            box-sizing: border-box;
            > img {
              width: 100%;
              height: 100%;
            }
          }
          &:nth-child(1) {
            > .img {
              background: @c1;
            }
          }
          &:nth-child(2) {
            > .img {
              background: @c2;
            }
          }
        }
      }
    }
    .m-tvList {
      margin-top: 20px;
      padding: 30px 10px;
      background: @c5;
    }
  }
</style>
