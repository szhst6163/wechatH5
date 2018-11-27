<template>
  <div @touchmove.prevent class="m-picker">
    <popup @on-show="onShow" @on-hide="hide" v-model="showPicker">
      <div class="m-timer">
        <picker :data='options' v-model='val'></picker>
      </div>
      <div @click="confirm" class="m-button">确定</div>
    </popup>
  </div>
</template>

<script>
  import getDate from "../lib/getDate";
  import PickerModule from "./pickerMoudle";
  import {XButton, Popup,Picker} from 'vux'
  import formatDate from "../lib/formatDate";

  export default {
    components: {
      PickerModule,
      Picker,
      Popup
    },
    name: "filter-picker",
    model:{
      prop:"fData",
      event:"change",
    },
    props: {
      options: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
    computed: {
    },
    mounted() {
    },
    data() {
      return {
        step: 0,
        showPicker: false,
        val:[{}],
      }
    },
    methods: {
      hide() {
        this.$emit("hide");
      },
      show() {
        this.showPicker = true
      },
      onShow() {
        this.step = 0;
      },
      confirm() {
        this.showPicker = false;
        this.fData = this.val[0];
        this.$emit("change",this.fData)
      }
    }
  }
</script>

<style lang="less" scoped>
  .m-picker {
    text-align: center;
  }

  .vux-popup-dialog {
    background: #fff;
  }

  .dataView {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 108px;
    background: #f7f7f7;
    padding: 0 80px;
    > div {
      flex: 1;
      color: #19C280;
      font-size: 30px;
      > p {
        color: #fff;
        margin: 0 auto;
        background: #FEA625;
        border-radius: 100px;
        font-size: 26px;
        width: 100px;
        height: 46px;
        line-height: 48px;
      }
    }
  }

  .viewer {
    display: flex;
    padding:0 24px;
    >p{
      width: 100%;
      text-align: left;
      display: flex;
      align-items: center;
      border-bottom:1px solid #ddd;
    }
    > div {
      flex: 1;
      height: 88px;
      line-height: 88px;
      color: #666;
      font-size: 32px;
      display: flex;
      justify-content: center;
      align-items: center;
      > img {
        width: 30px;
        height: 30px;
        margin-right: 10px;
      }
      &.active {
        background: linear-gradient(90deg, rgba(32, 222, 148, 1) 0%, rgba(13, 183, 156, 1) 100%);
        background-position-x: center;
        color: #fff;
      }
    }
  }

  .m-timer {
    padding: 50px 0;
    min-height: 320px;
    box-sizing: border-box;
  }

  .m-button {
    font-size: 30px;
    width: 586px;
    height: 80px;
    line-height: 80px;
    background: linear-gradient(90deg, rgba(32, 222, 148, 1) 0%, rgba(13, 183, 156, 1) 100%);
    box-shadow: 0px 7px 9px 0px rgba(217, 245, 237, 1);
    border-radius: 80px;
    margin: 0 auto;
    margin-bottom: 24px;
    color: #fff;
  }
</style>
