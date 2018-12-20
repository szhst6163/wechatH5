<template>
  <div class="m-cont">
    <div class="m-applySuc">
      <div class="suc">
        <span>报名成功！请携带个人身份证准时参加！详细信息请在“我的报名”查看。</span>
      </div>
      <div class="formInfo">
        <div class="infoTitle">您的报名信息</div>
        <p>
          节目名称：快乐大本营
          参加时间：2019年5月20号14:00整，（请提前15分钟到达现场准备入场）
          参加地址：湖南广电演播厅（长沙星沙XXX路XXX号）
          取票流程：请于2019年5月20日13:00整，携带本人身份证，在星沙XXX地址取票，取票、咨询电话：13510013007
        </p>
      </div>
      <div @click="submit" class="submit">
        <span>确定</span>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapMutations, mapActions, mapGetters} from 'vuex'

  export default {
    name: 'tv-detail',
    components: {},
    data() {
      return {
        formList: []
      }
    },
    computed: {},
    methods: {
      submit() {
        this.$router.replace({name: "index"})
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
    padding-bottom: 150px;
    .m-applySuc{
      padding:40px 0;
      font-size: 28px;
      .suc{
        padding:30px;
      }
      .formInfo{
        padding:30px;
        .infoTitle{
          margin:20px;
        }
        >p{
          margin-bottom:20px;
        }
      }
    }
    .submit {
      margin: 0 auto;
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
