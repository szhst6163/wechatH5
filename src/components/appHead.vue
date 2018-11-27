<template>
  <div v-if="headData" class="m-head-contain">
    <div class="m-Head" :class="className">
      <div v-if="headData == 1" @click="back" class="black">
        <img src="../images/icon/backIcon.png" alt="">
      </div>
      <div v-if="headData == 2" @click="back" class="black">
        <img src="../images/icon/backIcon-black.png" alt="">
      </div>
      <div class="title"><slot></slot></div>
      <slot class="right" name="right"></slot>
    </div>
  </div>

</template>

<script>
export default {
  name: "appHead",
  props: {
    headData: {
      type: [Number],
      default() {
        return null
      }
    }
  },
  computed: {
    className() {
      if (this.headData) {
        return `type${this.headData}`
      } else {
        return ''
      }
    }
  },
  methods: {
    back() {
      this.$router.go(-1, { params: { a: 1 } })
    }
  },
  mounted() {
  }
}
</script>

<style lang="less" scoped>
@height: 88px;
.m-head-contain {
  height: 88px;
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
    &.type1 {
      background-color: #16d1a4;
      /*background-image: url("../images/icon/nav-bg.png");*/
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
    &.type2 {
      background: #f9f9f9;
      color: #444;
    }
    .black {
      position: absolute;
      left: 30px;
      padding-right: 15px;
      > img {
        position: relative;
        top: 10px;
        width: 40px;
      }
    }
    .right{
      position: absolute;
      right: 30px;
    }
    .title {
      font-size: 36px;
    }
  }
}
</style>
