<template>
  <div class="m-cont">
    <div class="m-head">
      <span @click="$router.go(-1)">返回</span>
    </div>
    <div v-if="tv.detail.videourl&&showVideo" class="m-video">
      <iframe :src="tv.detail.videourl+'&height=100%&width=100%'" frameborder="0" allowfullscreen></iframe>
    </div>
    <div class="tv-info">
      <div class="info-content">
        <div @click="showVideo = true" class="img">
          <div class="playIcon">
            <img src="../images/icon/play.png" alt="">
          </div>
          <img :src="tv.detail.column_img" alt="">
        </div>
        <div class="infoItem">
          <div class="title">
            <div>《{{tv.detail.column_title}}》</div>
          </div>
          <div class="infoItem-i">
            <div class="text"><img src="../images/icon/detailNav.png" alt=""><span>录制地点</span></div>
            <div class="locationText"><span>{{tv.detail.address}}</span></div>
          </div>
          <div class="infoItem-i">
            <div class="text"><img src="../images/icon/detailTime.png" alt=""><span>录制时间</span></div>
            <div><span>{{translateTime(tv.detail.videotime*1000)}}</span></div>
          </div>
          <div class="infoItem-i"><div class="text"><img src="../images/icon/detailRequired.png" alt=""><span>观众要求</span></div><div><span>18—45周岁可参加</span></div></div>
        </div>
      </div>
      <div class="infoDesc">
        <div class="head">栏 目 简 介</div>
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
      <div class="fnBtn">
        <div @click="collect" v-if="!tv.is_collect"><img src="../images/icon/detail-collect.png" alt=""><div>收藏</div></div>
        <div @click="collect" v-if="tv.is_collect"><img src="../images/icon/detail-collected.png" alt=""><div>取消收藏</div></div>
        <div v-if="tv.detail.latlon" @click="toMap(tv)"><img src="../images/icon/detailNav.png" alt=""><div>导航</div></div>
      </div>
      <div class="submitBtn">
        <div @click="apply(tv.is_signup_over)">{{tv.is_signup_over == 1?'截止':'报名'}}</div>
      </div>
    </div>
    <common-dialog @close="dialogShow = false" v-if="dialogShow">
      <slot>
        <div class="dialogText">
          <p><b>重要提示：</b></p>
          <p>1、报名前请确定好参加时间和地点，以免因为误报而影响活动体验。报名成功后不可以换场。</p>
          <p>2、报名时须在<b>15分钟</b>内填写参加活动者个人信息(<b>姓名、手机号、身份证号</b>)，超时本次报名将自动作废且仍会消耗一次报名机会，请知晓。</p>
          <p>3、所有活动仅限报名时填写的观看人参与。</p>
          <p>4、报名成功后可在个人中心“我的报名”中查看报名情况及活动详情。</p>
        </div>
      </slot>
      <div slot="btn" class="bottom" @click="nextPage">
        <div class="btns">
          <div class="okBtn" :class="{disable:confirmTime > 0}">确认报名 <span v-if="confirmTime>0">({{confirmTime}}s)</span></div>
        </div>
      </div>
    </common-dialog>
  </div>
</template>

<script>
  var signId = '';
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
        confirmTime:5,
        showAll:false,
        dialogShow:false,
        showVideo:false,
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
      toMap(data){
        let loc = data.detail.latlon.split(',');
        location.href = `http://api.map.baidu.com/marker?location=${loc[1]},${loc[0]}&title=录制地点&content=${data.detail.address}&output=html`
      },
      translateTime(date){
        return formatDate(date,'yyyy-MM-dd hh:mm')
      },
      nextPage(){
        if(this.confirmTime <= 0){
          this.dialogShow = false;
          this.$axios.post(this.$api.getTicket1,{column_item_id:this.$route.query.id,num:1})
            .then(res=>{
              signId = res.data.sign_id;
              this.dialogShow = true;
              this.$vux.loading.hide();
              this.$vux.toast.show(res.msg);
              this.$router.push({path:"/applyPage1",query:{id:this.$route.query.id,sign_id:signId}})
            })
            .catch(err=>{
              this.$vux.loading.hide();
            })
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
        }else if(isOver == 2){
          this.$vux.toast.show("还没到报名时间哦");
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
        this.showVideo = false;
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
        this.$router.push({path:'/emcee',query:data})
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
    .dialogText{
      font-size: 26px;
      color:@c5;
      b{
        color:@c4;
      }
    }
    .m-video{
      width: 100%;
      overflow: auto;
      >iframe{
        width: 100%;
        height: 400px;
        overflow: auto;
      }
    }
    .m-head {
      color: #fff;
      padding: 30px;
      font-size: 32px;
    }
    .submitBtn{
      background: @c6;
      height: 80px;
      line-height: 80px;
      text-align: center;
      width: 440px;
      font-size: 28px;
      font-weight: 600;
      color:@c10;
      border-radius: 100px;
      margin:30px auto;
    }
    .fnBtn{
      display: flex;
      padding:0 40px;
      justify-content: space-between;
      >div{
        flex:1;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        margin-right:10px;
        font-size: 28px;
        img{
          width:100px;
          height: 100px;
          margin-top:20px;
        }
      }
    }
    .tv-info{
      margin-top:20px;
      padding:0 50px;
      .info-content{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom:40px;
        .img{
          position: relative;
          width: 280px;
          height: 180px;
          overflow: hidden;
          border-radius: 20px;
          .playIcon{
            background: rgba(0,0,0,0.3);
            width: 100%;
            height: 100%;
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: center;
            img{
              width: 50px;
              height: 50px;
            }
          }
          img{
            border-radius: 20px;
            width: 100%;
            height: 100%;
          }
        }
      }
      .title{
        height: 90px;
        line-height: 90px;
        font-size: 36px;
        margin-bottom:20px;
      }
      .infoItem{
        >div{
          height: 50px;
          display: flex;
          align-items: center;
          overflow:hidden;
          width: 350px;
          text-overflow:ellipsis;
          white-space: nowrap;
          &.title{
            >div{
              overflow:hidden;
              width: 350px;
              text-overflow:ellipsis;
              white-space: nowrap;
            }
          }
          &.infoItem-i{
            display: flex;
            align-items: center;
            .locationText{
              max-width: 200px;
              overflow:hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
            }
            .text{
              display: flex;
              margin-right:10px;
            }
            img{
              margin-right:10px;
              width: 32px;
              height:32px;
            }
            >span{
              margin-right: 30px;
            }

          }

        }
      }
      .infoDesc{
        padding:30px 0;
        font-size: 24px;
        .head{
          font-size: 32px;
          color:@c6;
          margin-bottom:30px;
        }
        .main{
          max-height: 200px;
          overflow: hidden;
          transition:all .5s;
          word-wrap: break-word;
          word-break: break-all;
          img{
            width: 100%;
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
      .emceeList{
        display: flex;
        padding-top:10px;
        overflow: auto;
        margin-bottom:0px;
        .item{
          color:#fff;
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: center;
          margin-right:20px;
          .img{
            border:2PX solid #b23ae9;
            width: 120px;
            height: 120px;
            margin-bottom:14px;
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
  }
</style>
