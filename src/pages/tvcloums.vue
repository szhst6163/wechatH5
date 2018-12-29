<template>
  <div class="m-cont">
    <div class="m-head">
      <span @click="$router.go(-1)">返回</span>
    </div>
    <div class="m-tv-cloums">
      <tv-list-components :params="this.$route.query" :title="'录制栏目'" class="m-tvList"></tv-list-components>
    </div>
  </div>
</template>

<script>
  import {mapMutations, mapActions, mapGetters} from 'vuex'
  import TvListComponents from "../components/tvListComponents.vue";
  import defImg from '../images/icon/baoming.png'

  export default {
    name: 'tv-list',
    components: {
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
    }

  }
</style>
