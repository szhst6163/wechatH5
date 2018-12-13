<template>
  <div class="m-cont">
    <div class="m-head">
      <span @click="$router.go(-1)">返回</span>
    </div>
    <div class="m-emcee">
      <div v-if="data.id" class="infoDesc">
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
      <div v-if="!data.id" class="noData">
        无主持人信息...
      </div>
    </div>
    <div v-if="list.length" class="m-tvList-comp">
      <div class="m-line-title">
        录制栏目
      </div>
      <div class="list">
        <div @click="tvDetail(item)" v-for="item in list" class="item">
          <img :src="`${item.column_img}`" alt="">
          <div class="title">{{item.column_title}}</div>
          <div class="date">{{item.number}}</div>
          <div v-if="item.status == 1" class="tag">报 名</div>
          <div v-if="item.status == 0" class="tag end">截 止</div>
        </div>
      </div>
    </div>
    <tv-list-components v-if="!list.length"></tv-list-components>
  </div>
</template>

<script>
  import {mapMutations, mapActions, mapGetters} from 'vuex'
  import defImg from '../images/icon/baoming.png'
  import TvListComponents from "../components/tvListComponents.vue";

  export default {
    name: 'tv-list',
    components: {
      TvListComponents
    },
    data() {
      return {
        showAll:false,
        data:{},
        list:[]
      }
    },
    watch: {},
    computed: {},
    methods: {
      tvDetail(item){
        this.$router.push({name:'/tvDetail',query:{id:item.id}})
      },
      init() {
        this.$vux.loading.show();
        this.$axios.post(this.$api.search, {keywords: this.$route.query.keywords})
          .then(res => {
            this.data = res.data.compere[0]||{};
            this.list = res.data.column;
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
      margin-bottom:20px;
      .noData{
        padding:30px;
        text-align: center;
        color:#fff;
        background: @c5;
      }
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
  .m-tvList-comp{
    padding:30px 0;
    background: @c5;
    .list{
      padding-top:10px;
      display: flex;
      flex-wrap: wrap;
      .item{
        margin-left:2.5%;
        margin-top:20px;
        color:#fff;
        width: 30%;
        height:410px;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .tag{
          position: absolute;
          top:0;
          right:0;
          background: @c1;
          padding:5px;
          width: 100px;
          border-radius: 0 0 0 10px;
          text-align: center;
          &.end{
            background: #666;
          }
        }
        .title{
          margin-left:10px;
        }
        .date{
          margin-left: 10px;
        }
        img{
          width: 100%;
        }
      }
    }
    .noData{
      padding:30px;
      text-align: center;
      color:#fff;
    }
  }

</style>
