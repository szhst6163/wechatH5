<template>
  <div class="m-cont m-index">
    <index-head class="header">维修工单</index-head>
    <div class="m-index-tag">
      <div class="item-cont">
        <div class="line" v-bind:style="{left:activeNo*33.3+'%'}">
          <div></div>
        </div>
        <div @click="selectTag(0)" class="item">
          <span class="text">新单</span>
          <span v-if="tagCount[0]" class="budget newBudget">{{tagCount[0]>99?'99+':tagCount[0]}}</span>
        </div>
        <div @click="selectTag(1)" class="item">
          <span class="text">处理中</span>
          <span v-if="tagCount[1]" class="budget">{{tagCount[1]>99?'99+':tagCount[1]}}</span>
        </div>
        <div @click="selectTag(2)" class="item">
          <span class="text">已完结</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex'
import IndexHead from '../components/indexHead'
import storage from '../lib/storage'
export default {
  name: 'index',
  components: {
    IndexHead,
  },
  data() {
    return {
      isLock: false,
      tagCount: [],
      dialogOpts: {
        show: false,
        data: {}
      },
      dataList: {
        list0: [],
        list1: [],
        list2: [],
      },
      params: {
        param0: { page: 0, pageSize: 10 },
        param1: { page: 0, pageSize: 10 },
        param2: { page: 0, pageSize: 10 },
      },
      activeNo: 0,
      mescroll: null, // mescroll实例对象
      mescrollUp: {
        callback: this.upCallback,
        auto: false,
        htmlNodata: '<div class="noMore"><div></div></p>',
      },

      mescrollDown: {
        lazyLoad: {
          use: true, // 是否开启懒加载,默认false
        },
        offset: 38
      }
    }
  },
  watch: {
    '$route'(to, from) {
      return to
    }
  },
  created() {
  },
  computed: {
    ...mapGetters([]),
  },
  mounted() {
    this.$axios.get('geocoding',{a:'深圳市'})
  },
  methods: {
    ...mapActions([]),
    ...mapMutations([
      'changeStartDate',
      'changeMonth',
      'getChannelId',
      'setRepairInfo',
      'clearRepairInfo'
    ]),
    upCallback(page, mescroll) {//下拉加载
      let index = this.activeNo + ''
      if (page.num === 1) this.dataList[`list${index}`] = []
      // 联网请求
      this.getList(page, mescroll)
    },
    getList(page = { size: 10, num: 1 }, mescroll) {
      let textMap = {
        0: 'new',
        1: 'doing',
        2: 'done'
      }
      this.$vux.loading.show()
      this.postAjax(this.$api.index.getList, {
        page_size: page.size,
        page: page.num,
        type: textMap[this.activeNo]
      }).then(res => {
        this.$vux.loading.hide()
        let arr = res.data.data
        this.dataList[`list${this.activeNo}`] = this.dataList[`list${this.activeNo}`].concat(arr)
        this.tagCount[0] = res.data.totalCount.newTotalCount
        this.tagCount[1] = res.data.totalCount.doingTotalCount
        this.tagCount[2] = res.data.totalCount.doneTotalCount
        //    数据渲染成功后,隐藏下拉刷新的状态
        this.$nextTick(() => {
          this.mescroll.endSuccess(arr.length)
        })
      }).catch(err => {
        this.$vux.loading.hide()
        this.mescroll.endErr()
      })
    }
  }
}

</script>

<style scoped lang="less">
.m-cont {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  .header {
    position: fixed;
  }
  .mescroll {
    position: fixed;
    top: 88px;
    bottom: 0;
    height: auto;
    background: #f9f9f9;
    .m-index-list-cont {
      .noMoreData {
        box-sizing: border-box;
        text-align: center;
        padding-top: 25%;
        color: #666666;
        font-size: 32px;
        > img {
          width: 248px;
          height: 220px;
        }
      }
      .m-index-list {
        padding-top: 23px;
        .list-items {
          background: #fff;
          padding-top: 23px;
          margin-bottom: 23px;
          font-size: 32px;
          .order-item {
            .info {
              padding-bottom: 15px;
              margin: 0 23px;
              border-bottom: 1px solid #eaeaea;
              .info-item {
                line-height: 60px;
                display: flex;
                justify-content: space-between;
                .bord {
                  font-weight: 500;
                }
                .text {
                  color: #ababab;
                }
                .value {
                  word-break: break-all;
                  text-align: right;
                  width: 75%;
                  color: #000;
                }
              }
            }
            .order-btns {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 34px 51px 43px;
              .order-btns-icon {
                margin-bottom: 10px;
              }
              .btn {
                display: flex;
                flex-direction: column;
                align-items: center;
                font-size: 28px;
                color: #666;
                > img {
                  width: 75px;
                  height: 75px;
                }
              }
              .circleBtn {
                text-align: center;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 34px;
                color: #fff;
                line-height: 44px;
                width: 130px;
                height: 130px;
                background: #16d1a4;
                border-radius: 100% 100%;
              }
            }
          }
          &.overList {
            .info {
              border-bottom: none;
            }
          }
        }
      }
    }
  }
  .m-index-tag {
    background: #fff;
    position: fixed;
    top: 87px;
    z-index: 2;
    width: 100%;
    .item-cont {
      position: relative;
      display: flex;
      justify-content: space-around;
      align-items: center;
      font-size: 32px;
      .line {
        position: absolute;
        width: 33.3%;
        bottom: 0;
        transition: all 0.5s;
        > div {
          width: 180px;
          margin: 0 auto;
          height: 2px;
          background: #19c280;
        }
      }
      .item {
        height: 90px;
        line-height: 90px;
        position: relative;
        flex: 1;
        text-align: center;
        .budget {
          box-sizing: border-box;
          display: block;
          background: red;
          border-radius: 200px 200px;
          padding: 0 8px;
          min-width: 30px;
          height: 28px;
          line-height: 32px;
          text-align: center;
          font-size: 20px;
          position: absolute;
          top: 27px;
          right: 35px;
          color: #fff;
        }
        .newBudget {
          right: 50px;
        }
      }
    }
  }

  .info-cont {
    height: 694px;
    overflow-y: auto;
    .item {
      height: auto !important;
      line-height: 55px;
    }
    .special {
      align-items: normal !important;
      .value {
        line-height: normal;
        white-space: normal !important;
        p {
          text-align: left;
          display: inline-block;
        }
      }
    }
  }
}
</style>
