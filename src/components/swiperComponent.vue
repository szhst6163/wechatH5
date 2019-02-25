<template>
  <div class="m-swiper-comp">
    <!--<swiper loop auto dots-position="right" height="100%" :show-dots="false" :show-desc-mask="false" class="m-swiper" :list="list"></swiper>-->
    <swiper :options="swiperOption" ref="mySwiper">
      <!-- slides -->
      <swiper-slide v-for="item in list"><img class="swiper-img" :src="item.img" alt=""></swiper-slide>
    </swiper>

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
  import 'swiper/dist/css/swiper.css'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default {
    name: 'swiper-component',
    data(){
      return {
        list:[],
        swiperOption:{
          autoplay:true
        }
      }
    },
    components: {
      swiper,
      swiperSlide
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
    border-radius:30px;
    position: relative;
    margin:0 auto;
    width: 650px;
    height: 260px;
    overflow: hidden;
    .swiper-img{
      width: 100%;
      border-radius: 30px;
      height:260px;
    }
    .m-swiper{
      box-sizing: border-box;
      overflow: hidden;
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
      background: @c8;
      &.gonggao{
        font-size: 26px;
        border-radius:0 0 30px 30px;
        z-index: 2;
        .gonggaoBd{
          width: 100%;
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
