<template>
  <swiper loop auto dots-position="right" height="100%" :show-desc-mask="false" class="m-swiper" :list="list"></swiper>
</template>

<script>
  export default {
    name: 'swiper-banner',
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
</style>
