<template>
  <div class="m-cont">
    <web-head :active="1"></web-head>
    <div class="m-classify">
      <div class="gonggao">
        <div class="gonggaoBd">
          <div class="gonggaoText">
            综艺通行证为企业（官方）专属定制，不得出售
          </div>
        </div>
      </div>
      <search-bar></search-bar>
      <div class="tvType">
        <div @click="tvcloums(item)" v-for="item in tv" class="tvItem" :style="{backgroundImage:`url(${item.img})`}">
          <div class="name1">{{item.name}}</div>
          <div class="name2">{{item.introduce}}</div>
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
  export default {
    name: 'tv-list',
    components: {
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
      padding:20px 10px;
      padding-bottom:0;
      margin-top:20px;
      background: @c5;
      .funList{
        display: flex;
        flex-wrap: wrap;
        margin-top:40px;
        .item{
          margin-bottom:20px;
          color:#fff;
          display: flex;
          align-items: center;
          flex-direction: column;
          width: 25%;
          .img{
            width: 180px;
            height:160px;
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
      .gonggao{
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        background: @c7;
        width: 85%;
        height: 60px;
        line-height: 60px;
        margin:0 auto 30px;
        color: #fff;
        box-sizing: border-box;
        border-radius: 100px;
        font-size: 26px;
        .gonggaoBd{
          width: 90%;
          overflow: hidden;
          .gonggaoText{
            animation: roll 6s linear infinite;
          }
        }
        img{
          width: 30px;
          height:30px;
          margin-right:10px;
          margin-left:-10px;
        }
      }
      .tvType{
        color:#fff;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding:20px 20px;
        padding-bottom:0;
        .tvItem{
          background: @c1;
          background-size: 100% 100%;
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
