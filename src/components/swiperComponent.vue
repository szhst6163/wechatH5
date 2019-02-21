<template>
  <div class="m-swiper-comp">
    <swiper loop auto dots-position="right" height="100%" :show-dots="false" :show-desc-mask="false" class="m-swiper" :list="list"></swiper>
    <div class="swiper-text gonggao">
      <div class="gonggaoBd">
        <div class="gonggaoText">
          综艺通行证为企业（官方）专属定制，不得出售
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'swiper-component',
    data(){
      return {
        list:[]
      }
    },
    props:{
      code:{
        type:String,
        default(){
          return 'index'
        }
      }
    },
    methods: {
      init(){
        this.$vux.loading.show();
        this.$axios.post(this.$api.index.getList,{code:this.code})
          .then(res=>{
            this.$vux.loading.hide();
            this.list = res.data;
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

<style lang="less" scoped>
  @import "../assets/common";
  .m-swiper-comp{
    position: relative;
    margin:0 auto;
    width: 650px;
    height: 260px;
    overflow: hidden;
    .m-swiper{
      width: 100%;
      height: 100%;
      border-radius:30px;
    }
    .swiper-text{
      box-sizing: border-box;
      position: absolute;
      bottom: 0;
      width: 650px;
      height: 56px;
      line-height: 56px;
      padding:0 35px;
      background: @c7;
      &.gonggao{
        font-size: 26px;
        border-radius:0 0 30px 30px;
        .gonggaoBd{
          width: 90%;
          overflow: hidden;
          .gonggaoText{
            animation: roll 6s linear infinite;
          }
        }
      }
    }
  }
  @keyframes roll
  {
    0% {
      transform: translateX(110%);
    }
    100%{
      transform: translateX(-110%);
    }
  }

</style>
