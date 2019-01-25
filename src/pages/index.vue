<template>
  <div class="m-cont">
    <web-head :active="0"></web-head>
    <div class="m-swiper">
      <swiper :code="'index'"></swiper>
    </div>
    <!--<div class="m-classify">
      <div class="funList">
        <div @click="href('/tvList')" class="item">
          <div class="img"><img src="../images/icon/baomingIcon.png" alt=""></div>
          <div class="text"><img src="../images/icon/baomingText.png" alt=""></div>
        </div>
        <div @click="href('/shop')" class="item">
          <div class="img"><img src="../images/icon/shop.png" alt=""></div>
          <div>商品</div>
        </div>
      </div>
    </div>-->
    <tv-list-components :type="'index'" class="m-tvList"></tv-list-components>
    <div class="index-footer">
      <div>
        <img src="../images/icon/text1.png" alt="">
        <img src="../images/icon/pic1.png" alt="">
      </div>
      <div>报名咨询热线：400－833－8283，合作洽谈QQ：330175679</div>
      <div>© xxzyztc.com 版权所有 &nbsp;<a href="http://www.miibeian.gov.cn"> ICP证：粤ICP备19006959</a></div>
    </div>
  </div>
</template>

<script>
  import {mapMutations, mapActions, mapGetters} from 'vuex'
  import WebHead from '../components/webHead';
  import Swiper from '../components/swiperComponent.vue'
  import SearchBar from "../components/searchBar";
  import TvListComponents from "../components/tvListComponents.vue";
  import storage from "../lib/storage";

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
    computed: {
    },
    mounted() {
    },
    methods: {
      href(url) {
        this.$router.push({path: url})
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
        .item {
          color: #fff;
          display: flex;
          align-items: center;
          flex-direction: column;
          width: 200px;
          padding:0 50px 20px;
          border:5px solid #fff;
          border-radius: 10px;
          .text{
            width: 100px;
            img{
              width: 100%;
            }
          }
          .img {
            width: 100px;
            height: 100px;
            > img {
              width: 100%;
              height: 100%;
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
  }
</style>
