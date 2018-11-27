<template>
  <div ref="cont">
    <slot></slot>
    <load-more v-if="!isOver&&loadShow" class="loadMore" tip="正在加载"></load-more>
    <div v-if="isOver" class="noMore">
      <div></div>
    </div>
  </div>
</template>

<script>
  import { LoadMore } from 'vux'

  export default {
    name: "scroll-load",
    data(){
      return{
      }
    },
    props:{
      isOver:{
        type:Boolean,
        default:false
      },
      loadShow:{
        type:Boolean,
        default:false
      }
    },
    components: {
      LoadMore
    },
    mounted(){
      window.addEventListener('scroll', this.handleScroll)
    },
    methods:{
      handleScroll(e){
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        let height = this.$refs.cont.offsetHeight;
        if(height-scrollTop-window.innerHeight <=50){
          this.$emit("load");
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .loadMore{
    line-height: 80px;
    margin:0 auto;
    height: 80px;
    color:#a3a3a3;
  }
  .noMore{
    background: #ffffff;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding:0 50px;
    padding-top:50px;
    &:before,&:after{
      content: '';
      display: inline-block;
      height: 1PX;
      background: #e3e3e3;
      flex: 1;
    }
    >div{
      margin:0 20px;
      height:4PX;
      width: 4PX;
      border-radius: 100px 100px;
      background: #e3e3e3;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
  }
</style>
