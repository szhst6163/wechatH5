<template>
  <swiper loop auto dots-position="right" height="100%" :show-desc-mask="false" class="m-swiper" :list="list"></swiper>
</template>

<script>
  export default {
    name: 'swiper-banner',
    data(){
      return {
      }
    },
    props: {
      list:Array
    },
    methods: {
    }
  }
</script>

<style lang="less" scoped>
</style>
