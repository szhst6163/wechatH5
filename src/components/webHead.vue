<template>
  <div class="m-head">
    <div class="head-logo">
      <img src="../images/icon/userIndex-head.png" alt="">
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
    computed: {},
    methods: {
      href(url){
        this.$router.push(url)
      }
    },
    mounted() {
    }
  }
</script>

<style lang="less" scoped>
  @import "../assets/common";

  .m-head {
    font-size: 28px;
    background: @c5;
    padding:0;
    color: #fff;
    /*background: url("../images/icon/titlePic.png");*/
    /*background-size: cover;*/
    .head-logo{
      height: 180px;
      background: url('../images/icon/head-top.jpg') no-repeat;
      background-size: 100% 100%;
      overflow: hidden;
      img{
        height: 200px;
      }
    }
    .m-head-contain {
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
