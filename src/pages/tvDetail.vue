<template>
  <div class="m-cont">
    <div class="m-head">
      <span @click="$router.go(-1)">返回</span>
    </div>
    <div class="m-video">
      <iframe src="http://open.iqiyi.com/developer/player_js/coopPlayerIndex.html?vid=13c4a0dd5845af892fe5100715792e50&tvId=242541007&accessToken=2.f22860a2479ad60d8da7697274de9346&appKey=3955c3425820435e86d0f4cdfe56f5e7&appId=1368&height=100%&width=100%" frameborder=0 allowfullscreen></iframe>
    </div>
    <div class="fnBtn">
      <div><img src="../images/icon/baoming.png" alt="">报名</div>
      <div><img src="../images/icon/baoming.png" alt="">收藏</div>
      <div><img src="../images/icon/baoming.png" alt="">导航</div>
    </div>
    <div class="tv-info">
      <div class="title">
        《国家宝藏》
      </div>
      <div class="infoItem">
        <div><img src="../images/icon/baoming.png" alt=""><span>录制时间</span><span>2018-10-19</span></div>
        <div><img src="../images/icon/baoming.png" alt=""><span>观众要求</span><span>18—45周岁可参加</span></div>
      </div>
      <div class="infoDesc">
        <div class="head">录制地点：XXXXXXXX</div>
        <div class="main" :class="{showAll:showAll}">
          <p>《国家宝藏》是由中央电视台、央视纪录国际传媒有限公司承制的文博探索节目，由张国立担任001号讲解员，李晨、王凯、梁家辉、王刚、段奕宏、刘涛等担任国宝守护人。</p>
          <p>《国家宝藏》是由中央电视台、央视纪录国际传媒有限公司承制的文博探索节目，由张国立担任001号讲解员，李晨、王凯、梁家辉、王刚、段奕宏、刘涛等担任国宝守护人。</p>
        </div>
        <div class="footer"><img @click="showAll = !showAll" :class="{showAll:showAll}" src="../images/icon/arrowRight.png" alt=""></div>
      </div>
      <div class="emcee">
        <div class="m-line-title">
          主持人
        </div>
        <div class="emceeList">
          <div @click="emcee" class="item">
            <div class="img">
              <img src="../images/tv.jpg" alt="">
            </div>
            <span>AAA</span>
          </div>
          <div class="item">
            <div class="img">
              <img src="../images/tv.jpg" alt="">
            </div>
            <span>AAA</span>
          </div>
        </div>
      </div>
    </div>
    <tv-list-components :title="'相关推荐'" class="m-tvList"></tv-list-components>
  </div>
</template>

<script>
  import { mapMutations, mapActions, mapGetters } from 'vuex'
  import WebHead from '../components/webHead';
  import SearchBar from "../components/searchBar";
  import TvListComponents from "../components/tvListComponents.vue";
  import defImg from '../images/icon/baoming.png'
  export default {
    name: 'tv-detail',
    components: {
      TvListComponents,
      SearchBar,
      WebHead,
    },
    data() {
      return {
        showAll:false,
        tv:[],
        hotcolumn:[{img:defImg,title:"星光大道1",color:"#07c29a"},{img:defImg,title:"星光大道1",color:"#07c29a"},{img:defImg,title:"星光大道2",color:"#e3c75f"},{img:defImg,title:"星光大道3",color:"#e93c58"},{img:defImg,title:"星光大道4",color:"#9f74c8"}]
      }
    },
    watch: {
    },
    computed: {
    },
    methods: {
      init(){
        this.$vux.loading.show();
        this.$axios.post(this.$api.tvList.tvDetail,{id:this.$route.params.id})
          .then(res=>{
            this.tv = res.data.tv;
            this.$vux.loading.hide();
          })
          .catch(err=>{
            this.$vux.loading.hide();
          })
      },
      emcee(data){
        this.$router.push({name:'/emcee',params:{data}})
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
    color:#fff;
    font-size: 24px;
    .m-video{
      >iframe{
        height: 400px;
        width: 100%;
      }
    }
    .m-head {
      color: #fff;
      padding: 30px;
      font-size: 32px;
    }
    .fnBtn{
      display: flex;
      padding:5px 20px;
      background: @c5;
      >div{
        width: 100px;
        display: flex;
        align-items: center;
        img{
          width:32px;
          height: 80px;
          margin-right:10px;
        }
      }
    }
    .tv-info{
      margin-top:20px;
      background: @c5;
      padding:0 20px;
      .title{
        height: 90px;
        line-height: 90px;
        font-size: 36px;
        border-bottom:1px solid #262a40;
      }
      .infoItem{
        padding:30px 0;
        border-bottom:1px solid #262a40;
        >div{
          height: 50px;
          display: flex;
          align-items: center;
          >span{
            margin-right: 30px;
          }
          >img{
            margin-right:10px;
            width: 32px;
            height:32px;
          }
        }
      }
      .infoDesc{
        padding:20px 0;
        font-size: 24px;
        .head{
          padding-left:30px;
          color:@c1;
        }
        .main{
          color:#7a7c8c;
          max-height: 200px;
          overflow: hidden;
          transition:all .5s;
          &.showAll{
            max-height: none;
          }
        }
        .footer{
          padding-top:10px;
          text-align: center;
          img{
            width: 30px;
            height:30px;
            transform: rotate(90deg);
            transition:all .5s;
            &.showAll{
              transform: rotate(270deg);
            }
          }
        }
      }
      .emceeList{
        display: flex;
        padding:20px 0 10px;
        .item{
          color:#fff;
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: center;
          margin-right:20px;
          .img{
            width: 140px;
            height: 140px;
            margin-bottom:10px;
            border-radius: 1000px;
            overflow: hidden;
            img{
              width: 100%;
              height: 100%;
            }
          }

        }
      }
    }
    .m-tvList{
      padding:20px 0;
      background: @c5;
      margin-top:20px;
    }
  }
</style>
