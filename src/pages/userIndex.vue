<template>
  <div class="m-cont">
    <div class="m-userIndex">
      <div class="btns">
        <span @click="href('/login')">登陆</span>
        <span @click="href('/register')">注册</span>
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
      }
    },
    computed: {},
    methods: {
      href(url) {
        this.$router.push({name: url})
      }
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
    .m-userIndex{
      height:100vh;
      display: flex;
      align-items: center;
      background: @c5;
      .btns{
        width: 100%;
        display: flex;
        justify-content: space-around;
        span{
          width: 200px;
          height: 80px;
          line-height: 80px;
          text-align: center;
          background: @c6;
          border-radius: 21px;
        }
      }

    }
  }
</style>
