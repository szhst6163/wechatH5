<template>
  <div class="m-cont">
    <div class="m-head">
      <span @click="$router.push({name:'/tvList'})">返回</span>
    </div>
    <div class="m-video">
      <iframe :src="tv.detail.videourl+'&height=100%&width=100%'" frameborder=0 allowfullscreen></iframe>
    </div>
    <div class="fnBtn">
      <div @click="apply(tv.is_signup_over)"><img src="../images/icon/baoming.png" alt="">{{tv.is_signup_over == 1?'截止':'报名'}}</div>
      <div @click="collect" v-if="!tv.is_collect"><img src="../images/icon/baoming.png" alt="">收藏</div>
      <div @click="collect" v-if="tv.is_collect"><img src="../images/icon/baoming.png" alt="">取消收藏</div>
      <div><img src="../images/icon/baoming.png" alt="">导航</div>
    </div>
    <div class="tv-info">
      <div class="title">
        《{{tv.detail.column_title}}》
      </div>
      <div class="infoItem">
        <div><img src="../images/icon/baoming.png" alt=""><span>录制时间</span><span>{{translateTime(tv.detail.videotime*1000)}}</span></div>
        <div><img src="../images/icon/baoming.png" alt=""><span>观众要求</span><span>18—45周岁可参加</span></div>
      </div>
      <div class="infoDesc">
        <div class="head">录制地点：{{tv.detail.address}}</div>
        <div class="main" :class="{showAll:showAll}" v-html="tv.detail.introduce">
        </div>
        <div class="footer"><img @click="showAll = !showAll" :class="{showAll:showAll}" src="../images/icon/arrowRight.png" alt=""></div>
      </div>
      <div class="emcee">
        <div class="m-line-title">
          主持人
        </div>
        <div v-if="tv.compere" class="emceeList">
          <div v-for="item in tv.compere" @click="emcee(item)" class="item">
            <div class="img">
              <img :src="item.img" alt="">
            </div>
            <span>{{item.name}}</span>
          </div>
        </div>
      </div>
    </div>
    <tv-list-components :title="'相关推荐'" class="m-tvList"></tv-list-components>
    <common-dialog @close="dialogShow = false" v-if="dialogShow">
      <slot>确定人数后锁座，10分钟内填写完资料 否则报名资格失效</slot>
      <div slot="btn" class="bottom" @click="nextPage">
        <div class="btns">
          <div class="okBtn" :class="{disable:confirmTime > 0}">确定 <span v-if="confirmTime>0">({{confirmTime}}s)</span></div>
        </div>
      </div>
    </common-dialog>
  </div>
</template>

<script>
  import { mapMutations, mapActions, mapGetters } from 'vuex'
  import WebHead from '../components/webHead';
  import SearchBar from "../components/searchBar";
  import TvListComponents from "../components/tvListComponents.vue";
  import defImg from '../images/icon/baoming.png'
  import CommonDialog from "../components/commonDialog.vue";
  import formatDate from "../lib/formatDate";
  export default {
    name: 'tv-detail',
    components: {
      CommonDialog,
      TvListComponents,
      SearchBar,
      WebHead,
    },
    data() {
      return {
        confirmTime:3,
        showAll:false,
        dialogShow:false,
        Timmer:null,
        tv:{
          detail:{}
        },
      }
    },
    watch: {
      '$route' (to, from) {
        this.init()
      }
    },
    computed: {
    },
    methods: {
      translateTime(date){
        return formatDate(date)
      },
      nextPage(){
        if(this.confirmTime <= 0){
          this.dialogShow = false;
          this.$router.push({name:"/applyPage1",params:{column_item_id:this.$route.query.id}})
        }
      },
      collect(){
        let url = ''
        if(this.tv.is_collect){
          url = this.$api.unCollect;
        }else{
          url = this.$api.collect;
        }
        this.$axios.post(url,{id:this.$route.query.id})
          .then(res=>{
            this.$vux.toast.show(res.msg);
            this.tv.is_collect = +!this.tv.is_collect;
          })
      },
      confirm(){

      },
      apply(isOver){
        if(isOver == 1){
          this.$vux.toast.show("报名已截止");
          return;
        }
        let _this = this;
        this.dialogShow = true;
        function countDown(){
          _this.confirmTime--;
          _this.Timmer = setTimeout(()=>{
            if(_this.confirmTime<=0){
              _this.Timmer = null;
              return
            }else{
              countDown()
            }
          },1000)
        }
        if(!this.Timmer){
          countDown()
        }
      },
      init(){
        this.$vux.loading.show();
        this.$axios.post(this.$api.tvList.tvDetail,{id:this.$route.query.id})
          .then(res=>{
            this.tv = res.data;
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
        display: flex;
        align-items: center;
        margin-right:10px;
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
