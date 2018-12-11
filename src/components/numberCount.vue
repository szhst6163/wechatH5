<template>
  <div class="m-number-cont">
    <div @click="reduce" class="reduce count_icons"><img src="../images/icon/numberReduce.png" alt=""></div>
    <div class="input">{{num}}</div>
    <div @click="add" class="add count_icons"><img src="../images/icon/numberAdd.png" alt=""></div>
  </div>
</template>

<script>
  export default {
    name: 'number-count',
    props: {
      num: {
        type: Number,
        default () {
          return 1
        }
      }
    },
    methods: {
      reduce () {
        if (this.num > 1){
          this.$emit("input",--this.num)
        }
      },
      add () {
        if (this.num < 1) {
          this.$emit("input",++this.num)
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .m-number-cont {
    display: flex;
    height: 50px;
    line-height: 50px;
    text-align: center;
    align-items: center;
    border: 1PX solid #fff;
    border-radius: 1000px;
    overflow: hidden;
    img {
      width: 20px;
      height: 20px;
    }

    .input {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
        font-size: 36px;
        color: #fff;
        text-align: center;
        width: 60px;
        border: none;
    }
    .count_icons{
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      &.reduce {
        width: 50px;
        border-right: 1PX solid #fff;
      }
      &.add {
        width: 50px;
        border-left: 1PX solid #fff;
      }
    }

  }
</style>
