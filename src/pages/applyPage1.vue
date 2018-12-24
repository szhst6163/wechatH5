<template>
  <div class="m-cont">
    <div class="m-head">
      <span @click="$router.go(-1)">返回</span>
    </div>
    <div class="applyPage-cont">
      <div class="m-applyPage1">
        <div class="form">
          <div class="waringIcon">
            <img src="../images/icon/warning.png" alt="">
          </div>
          <div class="formInfo">
            <div class="infoTitle">活动声明</div>
            <p>
              1、报名审核通过后，我们会以短信、电话的方式进行确认，请注意接听电话，及时回复。<br/>
              2、参加活动人员请大家准时到场，迟到者将不予入场，入场前务必带好身份证等相关证件方可入场，门票不得转让他人，仅限本人使用。<br/>
              3、录制过程中手机调制静音、震动或关闭状态。节目录制现场切勿大声喧哗、乱窜、中途离场等，听从现场工作人员安排，情节恶劣者以后将失去报名机会，并依法依规处理。<br/>
              4、请配合现场主持人和嘉宾进行互动，但不要随意走动，节目录制时间可能会偶尔出现延长，属于正常现象，请您配合工作人员的安排，听从现场工作人员管理。<br/>
              5、我们会在活动开始的前一天进行审核，以短信或者是电话的方式进行通知。请您耐心等待。<br/>
              6、若您不能即时参加本次活动，请提前短信回复或致电工作人员。如果发现已通过审核却因个人原因不能到现场且未提前沟通者、活动未结束擅自离场者，将纳入星星综艺黑名单，后续不能参加本平台任何活动的报名。<br/>
            </p>
          </div>
          <!--<div class="number"><span>参加人数</span><number-count :max="1" v-model="form.num"></number-count></div>-->
        </div>
        <div @click="next" class="submit">
          <span>提交</span>
        </div>
        <div class="clickBtn">
          <img src="../images/icon/clickBtn.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapMutations, mapActions, mapGetters} from 'vuex'
  import NumberCount from "../components/numberCount.vue";

  export default {
    name: 'tv-detail',
    components: {NumberCount},
    data() {
      return {
        selectedItem:'',
        options:[{name:"2010-10-10",value:123},{name:"2010-10-11",value:1234},{name:"2010-10-12",value:1243}],
        form:{
          num:1,
        }

      }
    },
    computed: {

    },
    methods: {
      selectedName(evt){
        if(this.options.filter(res=>res.value == this.selectedItem)[0]){
          return this.options.filter(res=>res.value == this.selectedItem)[0].name
        }else{
          return ''
        }
      },
      init() {
//        this.$vux.loading.show();
//        this.$axios.post(this.$api.tvList.tvDetail,{id:this.$route.query.id})
//          .then(res=>{
//            this.tv = res.data.tv;
//            this.$vux.loading.hide();
//          })
//          .catch(err=>{
//            this.$vux.loading.hide();
//          })
      },
      next(){
        this.$router.replace({path: '/applyPage2',query:{num:this.form.num,sign_id:this.$route.query.sign_id}})
      },
    },
    mounted() {
    },
  }

</script>

<style scoped lang="less">
  @import "../assets/common";

  .m-cont {
    color: #fff;
    font-size: 24px;
    .waringIcon{
      >img{
        width: 325px;
        height:159px;
      }
    }
    .clickBtn{
      text-align: right;
      >img{
        width: 325px;
        height:159px;
      }
    }
    .submit{
      width: 100%;
      margin:0 auto;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      padding-bottom:30px;
      span{
        display: block;
        width: 500px;
        background: @c1;
        border-radius: 20px;
        height:80px;
        line-height: 80px;
      }
    }
    .m-head {
      color: #fff;
      padding: 30px;
      font-size: 32px;
    }
    .m-applyPage1 {
      color: #fff;
      font-size: 30px;
      background: @c5;
      width: 100%;
      .user{
        padding:10px 30px;
      }
      .form{
        padding: 20px 40px;
        font-size: 28px;
        .formInfo{
          .infoTitle{
            margin:30px;
          }
          >p{
            margin-bottom:20px;
          }
        }

        .number{
          display: flex;
          align-items: center;
          height: 100px;
          line-height: 100px;
          span{
            margin:0 40px;
          }
          .selectedName{
            text-align: center;
            position: relative;
            min-width: 50%;
            border-bottom:1PX solid #fff;
            height: 70px;
            line-height: 70px;
            select{
              opacity: 0;
              left:0;
              top:10%;
              position: absolute;
              width: 100%;
              height: 80%;
            }
          }

        }
      }
    }
  }
</style>
