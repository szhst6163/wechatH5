<template>
  <div class="m-cont">
    <web-head :active="0"></web-head>
    <div class="m-swiper">
      <swiper loop auto dots-position="right" height="100%" :show-desc-mask="false" class="m-swiper" :list="bannerList"></swiper>
    </div>
    <div class="m-classify">
      <search-bar></search-bar>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex'
import WebHead from '../components/webHead';
import { Swiper } from 'vux'
import SearchBar from "../components/searchBar";

export default {
  name: 'index',
  components: {
    SearchBar,
    WebHead,
    Swiper
  },
  data() {
    return {
      bannerList:[{
        url: 'javascript:',
        img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg',
        title: '送你一朵fua'
      }, {
        url: 'javascript:',
        img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg',
        title: '送你一辆车'
      }]
    }
  },
  watch: {
  },
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
  methods:{}
}

</script>

<style scoped lang="less">
  @import "../assets/common";
  .m-cont{
    .m-swiper{
      height:410px;
    }
    .m-classify{
      padding:30px 0;
      background: @c5;
    }
  }
</style>
