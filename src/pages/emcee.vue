<template>
  <div class="m-cont">
    <div class="m-head">
      <span @click="$router.go(-1)">返回</span>
    </div>
    <div class="m-emcee">
      <div class="infoDesc">
        <div class="emcess-info">
          <div class="item">
            <div class="img">
              <img src="../images/tv.jpg" alt="">
            </div>
            <span>主持人：AAA</span>
          </div>
        </div>
        <div class="main" :class="{showAll:showAll}">
          <p>
            《国家宝藏》是由中央电视台、央视纪录国际传媒有限公司承制的文博探索节目，由张国立担任001号讲解员，李晨、王凯、梁家辉、王刚、段奕宏、刘涛等担任国宝守护人。
            《国家宝藏》是由中央电视台、央视纪录国际传媒有限公司承制的文博探索节目，由张国立担任001号讲解员，李晨、王凯、梁家辉、王刚、段奕宏、刘涛等担任国宝守护人。
            《国家宝藏》是由中央电视台、央视纪录国际传媒有限公司承制的文博探索节目，由张国立担任001号讲解员，李晨、王凯、梁家辉、王刚、段奕宏、刘涛等担任国宝守护人。
            《国家宝藏》是由中央电视台、央视纪录国际传媒有限公司承制的文博探索节目，由张国立担任001号讲解员，李晨、王凯、梁家辉、王刚、段奕宏、刘涛等担任国宝守护人。
            《国家宝藏》是由中央电视台、央视纪录国际传媒有限公司承制的文博探索节目，由张国立担任001号讲解员，李晨、王凯、梁家辉、王刚、段奕宏、刘涛等担任国宝守护人。
            《国家宝藏》是由中央电视台、央视纪录国际传媒有限公司承制的文博探索节目，由张国立担任001号讲解员，李晨、王凯、梁家辉、王刚、段奕宏、刘涛等担任国宝守护人。
          </p>
        </div>
        <div class="footer"><img @click="showAll = !showAll" :class="{showAll:showAll}" src="../images/icon/arrowRight.png" alt=""></div>
      </div>
      <tv-list-components :title="'相关推荐'" class="m-tvList"></tv-list-components>
    </div>
  </div>
</template>

<script>
  import {mapMutations, mapActions, mapGetters} from 'vuex'
  import TvListComponents from "../components/tvListComponents.vue";
  import defImg from '../images/icon/baoming.png'
  import SwiperBanner from "../components/swiperBanner";

  export default {
    name: 'tv-list',
    components: {
      SwiperBanner,
      TvListComponents,
    },
    data() {
      return {
        showAll:false,
      }
    },
    watch: {},
    computed: {},
    methods: {
      init() {
        this.$vux.loading.show();
        this.$axios.post(this.$api.tvList.index, {code: this.code})
          .then(res => {
            this.tv = res.data.tv;
            this.$vux.loading.hide();
          })
          .catch(err => {
            this.$vux.loading.hide();
          })
      },
    },
    mounted() {
      this.init()
    },
  }

</script>

<style scoped lang="less">
  @import "../assets/common";

  .m-cont {
    .m-head {
      color: #fff;
      padding: 30px;
      font-size: 32px;
    }
    .m-emcee {
      .infoDesc{
        padding:40px 0 20px;
        font-size: 24px;
        background: @c5;
        .emcess-info{
          .item{
            color:#fff;
            display: flex;
            flex-direction: column;
            justify-content: center;
            text-align: center;
            font-size: 28px;
            margin-bottom:20px;
            .img{
              margin:0 auto;
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
        .head{
          padding-left:30px;
          color:@c1;
        }
        .main{
          color:@c6;
          max-height: 200px;
          overflow: hidden;
          transition:all .5s;
          padding:0 40px;
          >p{
            text-indent:25px
          }
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
      .m-tvList{
        margin-top:20px;
        padding:30px 10px;
        background: @c5;
      }
    }

  }
</style>
