<template>
  <div class="m-cont">
    <Head :headData="1">工单明细</Head>
    <div class="detail-wrap">
      <div class="title">
        <img src="../images/icon/dialog-info.png" alt="">
        <div>工单信息</div>
      </div>
      <div class="info-cont">
        <div class="item">
          <div class="text">工单号</div>
          <div class="value">{{baseInfo.order_id}}</div>
        </div>
        <div class="item">
          <div class="text">报障时间</div>
          <div class="value">{{ transformTime(baseInfo.created_time) }}</div>
        </div>
        <div class="item">
          <div class="text">车牌号</div>
          <div class="value">{{baseInfo.plate_number}}</div>
        </div>
        <div class="item">
          <div class="text">车型</div>
          <div class="value">{{baseInfo.car_type}}</div>
        </div>
        <div class="item">
          <div class="text">故障地点</div>
          <div class="value">{{baseInfo.fault_address}}</div>
        </div>
        <div class="item">
          <div class="text">报修人</div>
          <div class="value">{{baseInfo.submitter}}</div>
        </div>
        <div class="item">
          <div class="text">联系电话</div>
          <div class="value">{{baseInfo.submitter_tel}}</div>
        </div>
        <div class="item">
          <div class="text">所属公司</div>
          <div class="value">{{baseInfo.operator_name}}</div>
        </div>
        <div class="item">
          <div class="text">服务类型</div>
          <div class="value">{{baseInfo.agreement}}</div>
        </div>
        <div class="item">
          <div class="text">故障类型</div>
          <div class="value">{{baseInfo.failure_types}}</div>
        </div>
        <div class="item">
          <div class="text">是否替换车</div>
          <div class="value">{{ baseInfo.is_change_car }}</div>
        </div>
        <div v-if="baseInfo.is_change_car === '是'" class="item">
          <div class="text">替换车牌号</div>
          <div class="value">{{ baseInfo.change_plate_number }}</div>
        </div>
        <div class="item">
          <div class="text">故障描述</div>
          <div class="value">
            <p>{{baseInfo.fault_description}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="model-area detail-wrap">
      <div class="title">
        <img src="../images/icon/tel.png" alt="">
        <div>电话沟通</div>
      </div>
      <div class="info-cont">
        <div class="item">
          <div class="text">故障描述</div>
          <div class="value">
            <p>{{PhoneInfo.description}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="model-area detail-wrap spot" v-if="!Array.isArray(OutsideInfo)">
      <div class="title">
        <img src="../images/icon/car.png" alt="">
        <div>现场处理</div>
      </div>
      <div class="info-cont">
        <div class="item">
          <div class="text">车辆行驶里程</div>
          <div class="value">{{OutsideInfo.mileage}}KM</div>
        </div>
        <div class="item">
          <div class="text">4位确认码</div>
          <div class="value">{{OutsideInfo.confirm_code}}</div>
        </div>
        <div class="item">
          <div class="text">车辆现场勘查描述</div>
          <div class="value">
            <p>{{OutsideInfo.locale_describe}}</p>
          </div>
        </div>
        <div class="item">
          <div class="text">更换配件记录</div>
          <div class="value check" @click="checkDetail('changeEcord')">查看</div>
        </div>
        <div class="repairPhotos" v-if="OutsideInfo.fault_images && OutsideInfo.fault_images.length">
          <p>维修照片</p>
          <div class="pic-wrap">
            <div class="pic-content" v-for="(item,index) in OutsideInfo.fault_images">
              <div class="pic-border">
                <img @click="previewPhoto(item.display_url)" :src="item.display_url" alt="">
              </div>
              <p class="pic-illustrate">故障图片{{index + 1}}</p>
            </div>
            <div class="pic-content" v-if="OutsideInfo.vicode_images && OutsideInfo.vicode_images.length">
              <div class="pic-border">
                <img @click="previewPhoto(OutsideInfo.vicode_images[0].display_url)" :src="OutsideInfo.vicode_images[0].display_url" alt="">
              </div>
              <p class="pic-illustrate">车架号</p>
            </div>
            <div class="pic-content" v-if="OutsideInfo.dashboard_images && OutsideInfo.dashboard_images.length">
              <div class="pic-border">
                <img  @click="previewPhoto(OutsideInfo.dashboard_images[0].display_url)" :src="OutsideInfo.dashboard_images[0].display_url" alt="">
              </div>
              <p class="pic-illustrate">仪表盘</p>
            </div>
            <div class="pic-content" v-if="OutsideInfo.post_images && OutsideInfo.post_images.length">
              <div class="pic-border">
                <img @click="previewPhoto(OutsideInfo.post_images[0].display_url)" :src="OutsideInfo.post_images[0].display_url" alt="">
              </div>
              <p class="pic-illustrate">维修单</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="model-area detail-wrap" v-if="!Array.isArray(MaintainInfo)">
      <div class="title">
        <img src="../images/icon/list.png" alt="">
        <div>维修厂登记</div>
      </div>
      <div class="info-cont">
        <div class="item">
          <div class="text">维修工单</div>
          <div class="value">{{MaintainInfo.car_mtc_code}}</div>
        </div>
        <div class="item">
          <div class="text">维修站</div>
          <div class="value">{{MaintainInfo.site_name}}</div>
        </div>
        <div class="item">
          <div class="text">工时</div>
          <div class="value check" @click="checkDetail('workTime')">查看</div>
        </div>
        <div class="item">
          <div class="text">配件</div>
          <div class="value check" @click="checkDetail('parts')">查看</div>
        </div>
        <div class="item">
          <div class="text">附加费</div>
          <div class="value check" @click="checkDetail('surcharge')">查看</div>
        </div>
        <div class="repairPhotos" v-if="(MaintainInfo.entry_site_images && MaintainInfo.entry_site_images.length) ||
                                        (MaintainInfo.settlement_images && MaintainInfo.settlement_images.length) ||
                                        (MaintainInfo.leave_site_images && MaintainInfo.leave_site_images.length)">
          <p>维修照片</p>
          <div class="pic-wrap">
            <div class="pic-content" v-if="MaintainInfo.entry_site_images && MaintainInfo.entry_site_images.length">
              <div class="pic-border">
                <img @click="previewPhoto(MaintainInfo.entry_site_images[0].display_url)" :src="MaintainInfo.entry_site_images[0].display_url" alt="">
              </div>
              <p class="pic-illustrate">进场单</p>
            </div>
            <div class="pic-content" v-if="MaintainInfo.settlement_images && MaintainInfo.settlement_images.length">
              <div class="pic-border">
                <img @click="previewPhoto(MaintainInfo.settlement_images[0].display_url)" :src="MaintainInfo.settlement_images[0].display_url" alt="">
              </div>
              <p class="pic-illustrate">结算单</p>
            </div>
            <div class="pic-content" v-if="MaintainInfo.leave_site_images&&MaintainInfo.leave_site_images.length">
              <div class="pic-border">
                <img @click="previewPhoto(MaintainInfo.leave_site_images[0].display_url)" :src="MaintainInfo.leave_site_images[0].display_url" alt="">
              </div>
              <p class="pic-illustrate">交车单</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import formatDate from "../lib/formatDate"
export default {
  data() {
    return {
      prams: {
        mtc_a10_order_id: ''
      },
      baseInfo: {},
      PhoneInfo: {},
      MaintainInfo: {},
      OutsideInfo: {},
      changeDetail: {
        changeEcord: {}, // 更换配件记录
        workTime: {}, // 工时信息
        parts: {}, // 零配件信息
        surcharge: {} // 附加费用
      },
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.prams.mtc_a10_order_id = vm.$route.query.orderId
      vm.postAjax(vm.$api.detail, vm.prams)
        .then(res => {
          vm.baseInfo = res.data.baseInfo
          vm.PhoneInfo = res.data.PhoneInfo
          vm.MaintainInfo = res.data.MaintainInfo
          vm.OutsideInfo = res.data.OutsideInfo
          vm.changeDetail.changeEcord = res.data.OutsideInfo.maintenance_parts
          vm.changeDetail.workTime = res.data.MaintainInfo.working_info
          vm.changeDetail.parts = res.data.MaintainInfo.parts_info
          vm.changeDetail.surcharge = res.data.MaintainInfo.additional_cost
        })
    })
  },
  methods: {
    previewPhoto(url) {
      webBridge.previewPhoto(url)
    },
    checkDetail(type) {
      this.$router.push({ name: 'detailTable', params: { query: type, changeDetail: this.changeDetail } })
    },
    postAjax(url, data) {
      return new Promise((resolve, reject) => {
        this.$axios.post(url, data).then(res => {
          if (res.code === 0) {
            resolve(res)
          } else {
            this.$vux.toast.show(res.Msg)
            reject(res)
          }
        }).catch(err => {
          this.$message.error(err)
        })
      })
    },
    transformTime(data) {
      return formatDate(data * 1000)
    },
  }
}
</script>

<style lang="scss" scoped>
.detail-wrap {
  color: #252525;
  padding: 0 24px;
  background-color: #fff;
  .title {
    border-bottom: 1px solid #eaeaea;
    height: 90px;
    display: flex;
    align-items: center;
    font-size: 32px;
    > img {
      width: 32px;
      height: 32px;
      margin-right: 24px;
    }
  }
  .info-cont {
    padding: 32px 0;
    .item {
      font-size: 28px;
      display: flex;
      line-height: 40px;
      color: #666666;
      padding-top: 16px;
      &:first-child {
        padding-top: 0;
      }
      .text {
        width: 30%;
        padding-right: 10px;
      }
      .value {
        width: 70%;
        text-align: right;
        word-wrap: break-word;
        word-break: break-all;
        p {
          text-align: left;
          display: inline-block;
        }
      }
      .check {
        color: #20b96d;
      }
    }
  }
  .repairPhotos {
    font-size: 28px;
    padding-top: 24px;
    color: #252525;
    p {
      line-height: 40px;
      padding-bottom: 22px;
      font-size: 28px;
    }
    .pic-wrap {
      display: flex;
      flex-wrap: wrap;
      .pic-content {
        text-align: center;
        width: 33.3%;
        .pic-border {
          display: inline-block;
          height: 28vw;
          width: 28vw;
          border-radius: 16px;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .pic-illustrate {
          padding-top: 12px;
        }
      }
    }
  }
}
.model-area {
  margin-top: 20px;
}
.spot .info-cont .item {
  .text {
    width: 35%;
    padding-right: 60px;
  }
  .value {
    width: 60%;
  }
}
</style>
