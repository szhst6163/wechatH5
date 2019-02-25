<template>
  <div class="m-cont">
    <web-head :active="1"></web-head>
    <div class="m-classify">
      <swiper-component class="m-classify-swiper"></swiper-component>
      <search-bar></search-bar>
      <div class="tvType">
        <div @click="tvcloums(item)" v-for="item in tv" class="tvItem" :style="{backgroundImage:`url(${item.img})`}">
          <div class="name1">{{item.name}}</div>
        </div>
      </div>
    </div>
    <div class="m-hot-tv">
      <div class="m-line-title">热门栏目</div>
      <div class="funList">
        <div @click="tvDetail(item)" v-for="item in hotcolumn" class="item">
          <div class="img"><img :src="item.column_img||defImg" alt=""></div>
          <div>{{item.column_title}}</div>
        </div>
      </div>
    </div>
    <tv-list-components class="m-tvList"></tv-list-components>
    <div class="index-footer">
      报名咨询热线：400－833－8283，业务联络QQ：330175679
      <div>© xxzyztc.com 版权所有 &nbsp;<a href="http://www.miibeian.gov.cn"> ICP证：粤ICP备19006959</a></div>
    </div>
  </div>
</template>

<script>
  import { mapMutations, mapActions, mapGetters } from 'vuex'
  import WebHead from '../components/webHead';
  import SearchBar from "../components/searchBar";
  import TvListComponents from "../components/tvListComponents.vue";
  import defImg from '../images/icon/baoming.png'
  import SwiperComponent from "../components/swiperComponent.vue";
  export default {
    name: 'tv-list',
    components: {
      SwiperComponent,
      TvListComponents,
      SearchBar,
      WebHead,
    },
    data() {
      return {
        tv:[],
        defImg,
        hotcolumn:[]
      }
    },
    watch: {
    },
    computed: {
    },
    methods: {
      tvDetail(item){
        this.$router.push({path:'/tvDetail',query:{id:item.id,t:new Date().getTime()}})
      },
      init(){
        this.$vux.loading.show();
        Promise.all([this.$axios.post(this.$api.tvList.index,{code:this.code}),this.$axios.post(this.$api.tvList.componentList,{ishot:2})])
          .then(res=>{
            this.tv = res[0].data.recommend;
            this.hotcolumn = res[1].data;
            this.$vux.loading.hide();
          })
          .catch(err=>{
            this.$vux.loading.hide();
          })
      },
      tvcloums(data){
        this.$router.push({path:"/tvcloums",query:{column_cat_id:data.id}})
      }
    },
    mounted() {
      this.init()
    },
  }

</script>

<style scoped lang="less">
  @import "../assets/common";
  .m-cont{
    .m-swiper{
      height:410px;
    }
    .m-hot-tv{
      padding:20px 50px;
      padding-bottom:0;
      margin-top:20px;
      .funList{
        display: flex;
        flex-wrap: wrap;
        margin-top:40px;
        text-align: center;
        .item{
          margin-bottom:20px;
          color:#fff;
          display: flex;
          align-items: center;
          flex-direction: column;
          width: 25%;
          >div{
            width: 100%;
            overflow:hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
          }
          .img{
            width: 100%;
            height: 100%;
            overflow: hidden;
            border-radius: 10px;
            padding:10px;
            margin-bottom:10px;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: center;
            >img{
              width: 100%;
            }
          }
        }
      }
    }

    .m-classify{
      padding:30px 0;
      .m-classify-swiper{
        margin-bottom:50px;
      }
      .tvType{
        color:#fff;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding:0 60px;
        .tvItem{
          background-size: 100% 100%;
          box-sizing: border-box;
          padding:30px 20px;
          margin-top:30px;
          width: 300px;
          height:174px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          border-radius: 30px;
          position: relative;
          overflow: hidden;
          .name1{
            border-radius:0 0 30px 30px;
            font-size: 32px;
            position: absolute;
            bottom: 0;
            left:0;
            width: 100%;
            color:#000;
            background: @c7;
            text-align: center;
          }
          .name2{
            font-size: 24px;
          }
        }
      }
    }
  }
  @keyframes roll
  {
    0% {
      transform: translateX(110%);
    }
    /*30%{*/
      /*transform: translateX(0);*/
    /*}*/
    /*60%{*/
      /*transform: translateX(0);*/
    /*}*/
    100%{
      transform: translateX(-110%);
    }
  }

</style>
