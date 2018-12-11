<template>
  <div class="m-head">
    <div class="m-head-contain">
      <div @click="href('/index')" class="head-item" :class="{active:active === 0}">
        <div>推荐
          <div class="line"></div>
        </div>
      </div>
      <div @click="href('/tvList')" class="head-item" :class="{active:active === 1}">
        <div>栏目</div>
      </div>
      <div @click="href('/shop')" class="head-item" :class="{active:active === 2}">
        <div>商品</div>
      </div>
      <div @click="href('/my')" class="head-item" :class="{active:active === 3}">
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
    font-size: 32px;
    background: #000;
    color: #fff;
    .m-head-contain {
      display: flex;
      justify-content: space-around;
      align-items: center;
      height: 100px;
      .head-item {
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
          &:before {
            content: '';
            display: block;
            width: 18px;
            height: 18px;
            border: 2PX solid;
            border-radius: 50%;
            margin-right: 10px;
          }
        }
      }
    }
  }

</style>
