<template>
  <div class="m-head">
   <!-- <div v-if="!getHeaderImg" class="head-logo">
      <img src="../images/icon/userIndex-head.png" alt="">
    </div>-->
    <div class="head-logo-nodata">
      <img :src="getHeaderImg" alt="">
    </div>
    <div class="m-head-contain">
      <div @click="href('/index')" class="head-item" :class="{active:active === 0}">
        <div>
          <img src="../images/icon/index-head1.png" alt="">
          热门推荐
        </div>
      </div>
      <div @click="href('/tvList')" class="head-item" :class="{active:active === 1}">
        <div>
          <img src="../images/icon/index-head2.png" alt="">
          栏目分类
        </div>
      </div>
      <div @click="href('/noice')" class="head-item" :class="{active:active === 2}">
        <div>
          <img src="../images/icon/index-head3.png" alt="">
          报名须知
        </div>
      </div>
      <div @click="href('/my')" class="head-item" :class="{active:active === 3}">
        <div>
          <img src="../images/icon/index-head4.png" alt="">
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
    background: @c5;
    padding:0;
    color: #fff;
    /*background: url("../images/icon/titlePic.png");*/
    /*background-size: cover;*/
    /*.head-logo{
      height: 180px;
      background: url('../images/icon/head-top.jpg') no-repeat;
      background-size: 100% 100%;
      overflow: hidden;
      img{
        height: 200px;
      }
    }*/
    .head-logo-nodata{
      min-height: 180px;
      img{
        width: 100%;
      }
    }
    .m-head-contain {
      font-size: 26px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      height: 100px;
      .head-item {
        display: flex;
        align-items: center;
        img{
          width: 40px;
          height: 40px;
          margin-right:10px;
        }
        &.active {
          &:nth-child(1) > div {
            border-color: @c1;
            &:before {
              background: @c1;
            }
          }
          &:nth-child(2) > div {
            border-color: @c2;
            &:before {
              background: @c2;
            }
          }
          &:nth-child(3) > div {
            border-color: @c3;
            &:before {
              background: @c3;
            }
          }
          &:nth-child(4) > div {
            border-color: @c4;
            &:before {
              background: @c4;
            }
          }
        }
        &:nth-child(1) > div:before {
          border-color: @c1;
        }
        &:nth-child(2) > div:before {
          border-color: @c2;
        }
        &:nth-child(3) > div:before {
          border-color: @c3;
        }
        &:nth-child(4) > div:before {
          border-color: @c4;
        }
        > div {
          box-sizing: border-box;
          height: 100px;
          display: flex;
          align-items: center;
          position: relative;
          padding: 0 10px;
          border-bottom: 2PX solid transparent;
          /*&:before {*/
            /*content: '';*/
            /*display: block;*/
            /*width: 18px;*/
            /*height: 18px;*/
            /*border: 2PX solid;*/
            /*border-radius: 50%;*/
            /*margin-right: 10px;*/
          /*}*/
        }
      }
    }
  }

</style>
