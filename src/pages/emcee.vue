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
              <img :src="data.img" alt="">
            </div>
            <span>主持人：{{data.name}}</span>
          </div>
        </div>
        <div class="main" :class="{showAll:showAll}">
          <p v-html="data.introduce">
          </p>
        </div>
        <div class="footer"><img @click="showAll = !showAll" :class="{showAll:showAll}" src="../images/icon/arrowRight.png" alt=""></div>
      </div>
      <tv-list-components :params="{compere_id:this.$route.query.id}" :type="'index'" :title="'相关推荐'" class="m-tvList"></tv-list-components>
    </div>
  </div>
</template>

<script>
  import {mapMutations, mapActions, mapGetters} from 'vuex'
  import TvListComponents from "../components/tvListComponents.vue";
  import defImg from '../images/icon/baoming.png'

  export default {
    name: 'tv-list',
    components: {
      TvListComponents,
    },
    data() {
      return {
        showAll:false,
        data:{}
      }
    },
    watch: {},
    computed: {},
    methods: {
      init() {
        this.$vux.loading.show();
        this.$axios.post(this.$api.emcee, {id: this.$route.query.id})
          .then(res => {
            this.data = res.data;
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
    }

  }
</style>
