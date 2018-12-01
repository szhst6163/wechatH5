<template>
  <div class="m-cont">
    <web-head :active="1"></web-head>
    <div class="m-classify">
      <search-bar></search-bar>
      <div class="tvType">
        <div v-for="item in list" class="tvItem">
          <div class="name1">{{item.name1}}</div>
          <div class="name2">{{item.name2}}</div>
        </div>
      </div>
    </div>
    <div class="m-hot-tv">
      <div class="m-title">热门栏目</div>
      <div class="funList">
        <div v-for="item in hotList" class="item">
          <div  :style="{background:item.color}" class="img"><img :src="item.img" alt=""></div>
          <div>{{item.title}}</div>
        </div>
      </div>
    </div>
    <tv-list-components class="m-tvList"></tv-list-components>
  </div>
</template>

<script>
  import { mapMutations, mapActions, mapGetters } from 'vuex'
  import WebHead from '../components/webHead';
  import SearchBar from "../components/searchBar";
  import TvListComponents from "../components/tvListComponents.vue";
  import defImg from '../images/icon/baoming.png'
  export default {
    name: 'tv-list',
    components: {
      TvListComponents,
      SearchBar,
      WebHead,
    },
    data() {
      return {
        list:[{name1:"CCTV",name2:"中央电视台"},{name1:"CCTV",name2:"中央电视台"},{name1:"CCTV",name2:"中央电视台"},{name1:"CCTV",name2:"中央电视台"}],
        hotList:[{img:defImg,title:"星光大道1",color:"#07c29a"},{img:defImg,title:"星光大道2",color:"#e3c75f"},{img:defImg,title:"星光大道3",color:"#e93c58"},{img:defImg,title:"星光大道4",color:"#9f74c8"}]
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
    .m-hot-tv{
      padding:20px;
      margin-top:20px;
      background: @c5;
      .m-title{
        height:38px;
        line-height: 38px;
        display: flex;
        align-items: center;
        font-size: 36px;
        color:#fff;
        &:before{
          content: '';
          display: inline-block;
          height: 100%;
          width: 4px;
          margin-right:20px;
          background: @c1;
        }
      }
      .funList{
        display: flex;
        justify-content: space-around;
        margin-top:40px;
        .item{
          color:#fff;
          display: flex;
          align-items: center;
          flex-direction: column;
          .img{
            width: 90px;
            height:90px;
            border-radius: 10px;
            padding:10px;
            margin-bottom:10px;
            box-sizing: border-box;
            >img{
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }

    .m-classify{
      padding:30px 0;
      background: @c5;
      .tvType{
        color:#fff;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding:20px 20px;
        padding-bottom:0;
        .tvItem{
          background: @c1;
          box-sizing: border-box;
          padding:30px 20px;
          margin-top:20px;
          width: 344px;
          height:200px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          border-radius: 10px;
          .name1{
            font-size: 32px;
          }
          .name2{
            font-size: 24px;
          }
        }
      }
    }
    .m-tvList{
      margin-top:20px;
      padding:30px 10px;
      background: @c5;
    }
  }
</style>
