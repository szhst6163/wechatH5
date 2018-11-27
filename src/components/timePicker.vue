<template>
  <div class="m-picker">
    <popup  @on-hide="hide" v-model="showPicker">
      <div  @touchmove.prevent class="m-timer">
        <picker-module class="m-datePick" :showData="showData" :date="timeDate.date"></picker-module>
      </div>
      <div @touchmove.prevent @click="nextStep" class="m-button">确定</div>
    </popup>
  </div>
</template>

<script>
import getDate from "../lib/getDate";
import PickerModule from "./pickerMoudle";
import { XButton, Popup } from 'vux'
import formatDate from "../lib/formatDate";

export default {
  components: {
    PickerModule,
    XButton,
    Popup
  },
  name: "time-picker",
  props: {
    timeDate: {
      type: Object,
      default: function () {
        return {
          date: []
        }
      }
    }
  },
  computed: {
    selectDay() {
      return `${formatDate(this.timeDate.date[0], 'MM-dd')}`
    }
  },
  mounted() {
  },
  data() {
    return {
      showPicker: false,
      date: [],
      showData: [getDate.dateArr, getDate.timeArr],
      default: []
    }
  },
  methods: {
    nextStep() {
      this.confirm();
    },
    hide() {
      this.$emit("hide");
    },
    show() {
      this.showPicker = true
    },
    confirm() {
      this.showPicker = false;
      this.$emit("dateChange", { date: `${this.timeDate.date[0]} ${this.timeDate.date[1]}` })
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
    color: #19c280;
    font-size: 30px;
    > p {
      color: #fff;
      margin: 0 auto;
      background: #fea625;
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
      background: linear-gradient(
        90deg,
        rgba(32, 222, 148, 1) 0%,
        rgba(13, 183, 156, 1) 100%
      );
      background-position-x: center;
      color: #fff;
    }
  }
}

.m-timer {
  padding: 50px 0;
}

.m-button {
  font-size: 30px;
  width: 586px;
  height: 80px;
  line-height: 80px;
  background: linear-gradient(
    90deg,
    rgba(32, 222, 148, 1) 0%,
    rgba(13, 183, 156, 1) 100%
  );
  box-shadow: 0px 7px 9px 0px rgba(217, 245, 237, 1);
  border-radius: 80px;
  margin: 0 auto;
  margin-bottom: 24px;
  color: #fff;
}
</style>
