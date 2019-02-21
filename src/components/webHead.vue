<template>
  <div class="m-head">
    <div class="index-header">
      <img src="../images/icon/index-top.jpg" alt="">
    </div>
    <div class="m-head-contain">
      <div @click="href('/index')" class="head-item" :class="{active:active === 0}">
        <div>
          <img src="../images/icon/index-head1.png" alt="">
        </div>
        <div>热门推荐</div>
      </div>
      <div @click="href('/tvList')" class="head-item" :class="{active:active === 1}">
        <div>
          <img src="../images/icon/index-head2.png" alt="">
        </div>
        <div>栏目分类</div>
      </div>
      <div @click="href('/noice')" class="head-item" :class="{active:active === 2}">
        <div>
          <img src="../images/icon/index-head3.png" alt="">
        </div>
        <div>报名须知</div>
      </div>
      <div @click="href('/my')" class="head-item" :class="{active:active === 3}">
        <div>
          <img src="../images/icon/index-head4.png" alt="">
        </div>
        <div>
          个人中心
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapMutations, mapActions, mapGetters} from 'vuex'

  export default {
    name: "webHead",
    props: {
      active: {
        type: [Number],
        default() {
          return 0
        }
      }
    },
    computed: {
      ...mapGetters(['getHeaderImg'])
    },
    methods: {
      ...mapMutations(['setHeaderImg']),
      href(url){
        this.$router.push(url)
      },
      initHead(){
        if(this.getHeaderImg) return;
        this.$axios.post(this.$api.index.getList, {code:'header'})
          .then(res => {
            this.setHeaderImg(res.data[0].img);
          })
          .catch(err => {
            this.$vux.loading.hide();
          })
      }
    },
    mounted() {
      this.initHead()
    }
  }
</script>

<style lang="less" scoped>
  @import "../assets/common";

  .m-head {
    padding:0;
    color: #fff;
      .index-header{
        img{
          width: 100%;
        }
      }
    .head-logo-nodata{
      min-height: 240px;
      img{
        width: 100%;
      }
    }
    .m-head-contain {
      margin:0 auto;
      margin-top:-100px;
      width: 562px;
      font-size: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      text-align: center;
      .head-item {
        img{
          width: 110px;
          height: 110px;
          margin-bottom:10px;
        }
        &.active {
        }
      }
    }
  }

</style>
