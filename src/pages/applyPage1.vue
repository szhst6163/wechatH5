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
              1、报名成功后，我方可能会以电话的方式进行再次确认，请注意接听电话。<br/>
              2、参加活动者请提前30分钟到场准备，迟到者将不予入场，入场前务必带好身份证等相关证件方可入场。<br/>
              3、节目录制现场切勿大声喧哗、乱窜、中途离场等，听从现场工作人员安排。若不听从安排且情节恶劣者以后将失去报名机会，并依法依规处理。<br/>
              4、请配合现场主持人和嘉宾进行互动，但不要随意走动。节目录制时间可能会偶尔出现延长，属于正常现象，请您配合工作人员的安排，听从现场工作人员管理。<br/>
              5、部分活动偶尔会因为嘉宾时间等各种原因出现录制时间调整，这属于正常现象，若出现此类情况，我方会及时通知。<br/>
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
        this.$router.push({path: '/applyPage2',query:{num:this.form.num,sign_id:this.$route.query.sign_id,id:this.$route.query.id}})
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
