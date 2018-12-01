<template>
  <swiper loop auto dots-position="right" height="100%" :show-desc-mask="false" class="m-swiper" :list="bannerList"></swiper>
</template>

<script>
  export default {
    name: 'swiper-banner',
    data(){
      return {
        bannerList:[{
          url: 'javascript:',
          img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg',
          title: '送你一朵fua'
        }, {
          url: 'javascript:',
          img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg',
          title: '送你一辆车'
        }]
      }
    },
    props: {
    },
    methods: {
    }
  }
</script>

<style lang="less" scoped>
</style>
