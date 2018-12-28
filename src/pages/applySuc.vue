<template>
  <div class="m-cont">
    <div class="m-applySuc">
      <div class="cont">
        <div class="suc">
          <span>报名成功！请携带个人身份证准时参加！详细信息请在“我的报名”查看。</span>
        </div>
        <div class="formInfo">
          <div class="infoTitle">您的报名信息</div>
          <p>
            节目名称：{{info.column_title}}<br>
            参加时间：{{translateTime(info.starttime*1000)}}，（请提前15分钟到达现场准备入场）<br>
            参加地址：{{info.address}}<br>
            取票流程：请于{{translateTime(info.getTime*1000)}}，携带本人身份证，在{{info.getaddr}}取票，取票咨询电话：<a :href="`tel:${info.getmobile}`">{{info.getmobile}}</a><br>
          </p>
        </div>
        <div @click="submit" class="submit">
          <span>确定</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapMutations, mapActions, mapGetters} from 'vuex'
  import formatDate from "../lib/formatDate";

  export default {
    name: 'tv-detail',
    components: {},
    data() {
      return {
        info:{}
      }
    },
    computed: {
      ...mapGetters(['getTvInfo'])
    },
    methods: {
      translateTime(date){
        return formatDate(date)
      },
      submit() {
        this.$router.replace({path: "index"})
      },
      init(){
        this.$vux.loading.show();
        this.$axios.post(this.$api.tvList.tvDetail,{id:this.getTvInfo.info.id||this.$route.query.id})
          .then(res=>{
            this.info = res.data.detail;
            this.$vux.loading.hide();
          })
          .catch(err=>{
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
    color: #fff;
    font-size: 24px;
    .m-applySuc {
      background-image: url('../images/icon/pic1.png');
      background-size: 100%;
      background-repeat: no-repeat;
      font-size: 28px;
      .cont {
        height: 100vh;
        box-sizing: border-box;
        background: rgba(0, 0, 0, 0.5);
        padding:30px;
      }
      .suc {
        padding: 30px;
      }
      .formInfo {
        padding: 30px;
        .infoTitle {
          margin: 20px;
        }
        > p {
          margin-bottom: 20px;
          a{
            color: @c1;
          }
        }
      }
    }
    .submit {
      margin: 50px auto;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      span {
        display: block;
        width: 500px;
        background: @c1;
        border-radius: 20px;
        height: 80px;
        line-height: 80px;
      }
    }
  }
</style>
