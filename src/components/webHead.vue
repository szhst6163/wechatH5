<template>
  <div class="m-head">
    <div class="m-head-contain">
      <div class="head-item" :class="{active:active === 0}">
        <div>推荐</div>
      </div>
      <div class="head-item" :class="{active:active === 1}">
        <div>栏目</div>
      </div>
      <div class="head-item" :class="{active:active === 2}">
        <div>商品</div>
      </div>
      <div class="head-item" :class="{active:active === 3}">
        <div>我的</div>
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
    methods: {},
    mounted() {
    }
  }
</script>

<style lang="less" scoped>
  @import "../assets/common";

  .m-head {
    font-size: 32px;
    background: #000;
    color: #fff;
    .m-head-contain {
      display: flex;
      justify-content: space-around;
      align-items: center;
      .head-item {
        &.active {
          &:nth-child(1) > div:before {
            background: @c1;
          }
          &:nth-child(1) > div:after {
            background: @c1;
          }
          &:nth-child(2) > div:before {
            background: @c2;
          }
          &:nth-child(2) > div:after {
            background: @c2;
          }
          &:nth-child(3) > div:before {
            background: @c3;
          }
          &:nth-child(3) > div:after {
            background: @c3;
          }
          &:nth-child(4) > div:before {
            background: @c4;
          }
          &:nth-child(4) > div:after {
            background: @c4;
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
          height: 100px;
          display: flex;
          align-items: center;
          position: relative;
          &:before {
            content: '';
            display: block;
            width: 18px;
            height: 18px;
            border: 2PX solid;
            border-radius: 50%;
            margin-right: 10px;
          }
          &:after{
            content: '';
            display: block;
            width: 105%;
            height: 2PX;
            position: absolute;
            bottom:2px;
          }
        }
      }
    }
  }

</style>
