<template>
  <div class="m-cont">
    <Head :headData="1">{{ title }}</Head>
    <div class="explain-wrap">
      <div class="header" v-if="type === 'workTime'">
        <div class="theader">
          <img src="../images/icon/project.png">
          <span>维修项目</span>
        </div>
        <div class="theader">
          <img src="../images/icon/workTime.png">
          <span>工时</span>
        </div>
      </div>
      <div class="header" v-else-if="type === 'surcharge'">
        <div class="theader">
          <img src="../images/icon/cash.png">
          <span>费用名称</span>
        </div>
        <div class="theader">
          <img src="../images/icon/des.png">
          <span>说明</span>
        </div>
      </div>
      <div class="header" v-else>
        <div class="theader">
          <img src="../images/icon/parts.png">
          <span>配件名称</span>
        </div>
        <div class="theader">
          <img src="../images/icon/count.png">
          <span>数量</span>
        </div>
      </div>
      <div class="content-wrap">
        <div class="no-result" v-if="data && !data.length">暂无数据</div>
        <div class="content" v-for="(item, index) in data" v-else>
          <div class="name">{{ item.name }}</div>
          <div v-if="type === 'workTime'">{{ item.time }}</div>
          <div v-else-if="type === 'surcharge'">{{ item.describe }}</div>
          <div v-else>{{ item.number }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      titleType: {
        changeEcord: '配件列表',
        workTime: '工时列表',
        parts: '配件列表',
        surcharge: '附加费',
      },
      data: [],
      type: ''
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.type = vm.$route.params.query
      vm.title = vm.titleType[vm.type]
      vm.data = vm.$route.params.changeDetail[vm.type]
    })
  },
}
</script>
<style lang="scss" scoped>
.explain-wrap {
  background-color: #fff;
  padding: 0 24px;
  .header {
    display: flex;
    color: #19c280;
    position: relative;
    align-items: center;
    height: 78px;
    .theader {
      width: 50%;
      text-align: center;
      font-size: 32px;
      align-items: center;
      display: flex;
      justify-content: center;
      img {
        width: 32px;
        height: 32px;
        margin-right: 15px;
      }
    }
    &::before {
      content: " ";
      position: absolute;
      left: 20px;
      bottom: 0;
      right: 20px;
      height: 1px;
      border-top: 1px solid #eaeaea;
      color: #eaeaea;
      -webkit-transform-origin: 0 0;
      transform-origin: 0 0;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
    }
  }
  .content-wrap {
    .content {
      display: flex;
      font-size: 28px;
      color: rgba(102, 102, 102, 1);
      line-height: 40px;
      &:first-child > div {
        padding-top: 32px;
      }
      &:last-child > div {
        padding-bottom: 32px;
      }
      div {
        text-align: center;
        flex: 1;
        padding-top: 16px;
      }
      .name {
        position: relative;
        &::before {
          content: " ";
          position: absolute;
          right: 0;
          top: 0;
          width: 1px;
          bottom: 0;
          border-right: 1px solid #eaeaea;
          color: #eaeaea;
          -webkit-transform-origin: 100% 0;
          transform-origin: 100% 0;
          -webkit-transform: scaleX(0.5);
          transform: scaleX(0.5);
        }
      }
    }
  }
}
.no-result {
  text-align: center;
  padding: 20px 0;
  font-size: 28px;
}
</style>
