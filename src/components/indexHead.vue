<template>
  <div class="m-head-contain">
    <div class="m-Head">
      <div @click="mine" class="mine">
        <img src="../images/icon/mine.png" alt="">
      </div>
      <div class="title">
        <slot></slot>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "index-head",
  methods: {
    mine() {
      this.$router.push('/my');
    }
  },
}
</script>

<style lang="less" scoped>
@height: 44PX;
.m-head-contain {
  height: @height;
  .m-Head {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 30px;
    position: fixed;
    z-index: 999;
    box-sizing: border-box;
    height: @height;
    line-height: @height;
    width: 100%;
    font-size: 32px;
    color: #fff;
    background: #16d1a4;
    .title {
      font-size: 36px;
    }
    .mine {
      position: absolute;
      right: 0;
      padding-right: 10px;
      > img {
        position: relative;
        top: 10px;
        width: 58px;
        height: 46px;
      }
    }
  }
}
</style>
