<template>
  <div class="m-cont">
    <div class="m-head">
      <span @click="$router.go(-1)">返回</span>
    </div>
    <div class="m-tv-cloums">
      <div class="m-swiper">
        <swiper-banner></swiper-banner>
      </div>
      <tv-list-components :title="'录制栏目'" class="m-tvList"></tv-list-components>
    </div>
  </div>
</template>

<script>
  import {mapMutations, mapActions, mapGetters} from 'vuex'
  import TvListComponents from "../components/tvListComponents.vue";
  import defImg from '../images/icon/baoming.png'
  import SwiperBanner from "../components/swiperBanner";

  export default {
    name: 'tv-list',
    components: {
      SwiperBanner,
      TvListComponents,
    },
    data() {
      return {
      }
    },
    watch: {},
    computed: {},
    methods: {
      init() {
        this.$vux.loading.show();
        this.$axios.post(this.$api.tvList.index, {code: this.code})
          .then(res => {
            this.tv = res.data.tv;
            this.$vux.loading.hide();
          })
          .catch(err => {
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
    .m-head {
      color: #fff;
      padding: 30px;
      font-size: 32px;
    }
    .m-tv-cloums {
      .m-swiper {
        height: 410px;
        background: @c5;
      }
      .m-tvList{
        margin-top:20px;
        padding:30px 10px;
        background: @c5;
      }
    }

  }
</style>
