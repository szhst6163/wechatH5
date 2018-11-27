<template>
  <div class="m-cont">
    <Head :headData="1">维修厂登记</Head>
    <div class="form">
      <group class="maintenanceRegistration">
        <x-input title="维修工单号" placeholder="请输入" text-align="right" class="require" v-model="prams.car_mtc_code"></x-input>
        <cell title="维修站" is-link class="require" @click.native="showRepairStation()" :value="repairStaion"></cell>
        <cell title="维修站负责人" :value="prams.site_manager"></cell>
        <cell title="联系电话" @click.native="callTel(`tel:${prams.site_tel}`)">
          <div class="cell-wrap">
            <span>{{ prams.site_tel }}</span>
            <img src="../images/icon/tel.png" class="img-ico">
          </div>
        </cell>
        <cell title="维修站地址" @click.native="goToMap(prams)">
          <div class="cell-wrap">
            <p>{{ prams.mtc_a3_fault_address }}</p>
            <img src="../images/icon/location.png" class="img-ico">
          </div>
        </cell>
        <cell title="零配件" is-link class="require" @click.native="link('/installationKit')"></cell>
        <cell title="附加费" is-link class="require" @click.native="link('/extraCharge')"></cell>
        <cell title="进维修厂时间" class="require" :value="enterTime" @click.native="showStartPicker()"></cell>
        <cell title="出维修厂时间" class="require" :value="outTime" @click.native="showEndPicker()"></cell>
        <cell title="项目工时分类" is-link  @click.native="link('/workTime')"></cell>
        <x-switch title="是否替换车" :value-map="[0,1]" v-model="prams.is_change_car"></x-switch>
        <x-input max="8" title="替换车牌号" v-if="prams.is_change_car === 1" v-model="prams.change_plate_number"
                 placeholder="请输入"
                 text-align="right"></x-input>
      </group>
      <div class="repairPhotos">
        <p>维修照片</p>
        <div class="pic-wrap">
          <div v-for="(item,index) in showImg.entry_site_images" class="pic-content">
            <div class="pic-border">
              <div v-if="item" class="itemImg">
                <img @click="delPic(index,'entry_site_images')" class="delPic" src="../images/icon/delPic.png" alt="">
                <img @click="previewPhoto(item)" :src="item" alt="">
              </div>
              <img v-if="!item" @click="startPhotoForResult({type:1,params:`entry_site_images-${index}`})" :src="defImg" alt="">
            </div>
            <p class="pic-illustrate">进场单</p>
          </div>
          <div v-for="(item,index) in showImg.settlement_images" class="pic-content">
            <div class="pic-border">
              <div v-if="item" class="itemImg">
                <img @click="delPic(index,'settlement_images')" class="delPic" src="../images/icon/delPic.png" alt="">
                <img @click="previewPhoto(item)" :src="item" alt="">
              </div>
              <img v-if="!item" @click="startPhotoForResult({type:1,params:`settlement_images-${index}`})" :src="defImg" alt="">
            </div>
            <p class="pic-illustrate">结算单</p>
          </div>
          <div v-for="(item,index) in showImg.leave_site_images" class="pic-content">
            <div class="pic-border">
              <div v-if="item" class="itemImg">
                <img @click="delPic(index,'leave_site_images')" class="delPic" src="../images/icon/delPic.png" alt="">
                <img @click="previewPhoto(item)" :src="item" alt="">
              </div>
              <img v-if="!item" @click="startPhotoForResult({type:1,params:`leave_site_images-${index}`})" :src="defImg" alt="">
            </div>
            <p class="pic-illustrate">交车单</p>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-wrap">
      <div class="btn-footer btn-flex save" @click="submit('sava')">保存</div>
      <div class="btn-footer btn-flex solve" @click="submit('done')">已解决</div>
    </div>
    <time-picker @dateChange="dateChangeStart" ref="startPicker" :timeDate="StartTimeDate"></time-picker>
    <time-picker @dateChange="dateChangeEnd" ref="endPicker" :timeDate="EndTimeDate"></time-picker>
    <div class="m-picker">
    <popup v-model="showPicker">
      <picker :data='pickData'  :columns=2 v-model='pickValue' ref="cityPick"></picker>
      <div class="m-button" @click="confirm">确定</div>
    </popup>
  </div>
  </div>
</template>

<script>
import { Cell, Group, XInput, Picker, Popup, XSwitch } from 'vux'
import TimePicker from "../components/timePicker"
import formatDate from "../lib/formatDate"
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import clone from '../lib/json/clone'
import merge from '../lib/json/merge'
const defImg = require('../images/picAdd.png')
let u = navigator.userAgent
let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 //android终端
export default {
  components: {
    Cell,
    Group,
    XInput,
    Picker,
    Popup,
    XSwitch,
    TimePicker
  },
  data() {
    return {
      enterTime: '请选择',
      outTime: '请选择',
      repairStaion: '',
      defImg,
      StartTimeDate: {
        date: []
      },
      EndTimeDate: {
        date: []
      },
      showPicker: false,
      pickData: [],
      pickValue: [],
      prams: {
        is_change_car: 0,
        result: '',
        order_id: '',
        car_mtc_code: '',
        site_city: '',
        site_name: '',
        site_manager: '', // 维修站负责人
        site_tel: '', // 联系电话
        mtc_a3_fault_address: '',
        site: {
          name: '',
          city_name: ''
        },
        entry_site_time: '',
        out_site_time: '',
        entry_site_images: [null],
        settlement_images: [null],
        leave_site_images: [null],
      },
      showImg: {
        entry_site_images: [null],
        settlement_images: [null],
        leave_site_images: [null]
      }
    }
  },
  computed: {
    ...mapGetters(['repairInfo'])
  },
  mounted() {
    // this.StartTimeDate.date = [formatDate(new Date(), "yyyy/MM/dd"), '00:00']
    // this.EndTimeDate.date = [formatDate(new Date(), "yyyy/MM/dd"), '00:00']
    this.getSites()
    window.webBridge.onPhotoResult = this.onPhotoResult
    this.init()
  },
  methods: {
    ...mapMutations([
      'setRepairInfo'
    ]),
    // 获取数据
    init() {
      this.postAjax(this.$api.getMaintain, { order_id: this.repairInfo.baseInfo.mtc_a10_order_id }).then(res => {
        if (res.code === 0) {
          this.prams = res.data
          this.prams.order_id = this.$route.query.data.mtc_a10_order_id
          this.prams.entry_site_time += ''
          this.prams.out_site_time += ''
          if (this.repairInfo.detailPrams) {
            this.prams = this.repairInfo.detailPrams;
          }
          this.initShowImg(this.prams)
          this.setRepairInfo({ name: "workTimeItem", data: res.data.working_info })
          this.setRepairInfo({ name: "partsInfo", data: res.data.parts_info })
          this.setRepairInfo({ name: "extraCharge", data: res.data.additional_cost })
          this.timeInit('StartTimeDate', this.prams.entry_site_time)
          this.timeInit('EndTimeDate', this.prams.out_site_time)
          this.repairStaion = this.prams.site_city + ' ' + this.prams.site_name
          this.pickValue = [this.prams.site_city, this.prams.site_name]
        }
      })
    },
    previewPhoto(url) {
      webBridge.previewPhoto(url)
    },
    initShowImg(evt) {
      if (this.repairInfo.detailPramsImg) { //状态管理器中有数据则不使用请求数据
        this.showImg = this.repairInfo.detailPramsImg
      } else {
        let arr = ['entry_site_images', 'settlement_images', 'leave_site_images']
        arr.forEach(res => {
          evt[res].forEach((rs, i) => {
            this.showImg[res][i] = rs.display_url
          })
        })
      }
    },
    delPic(index, name) {
      let obj = clone(this.showImg);
      this.prams[name][index] = null;
      obj[name][index] = null;
      this.showImg = obj;
    },
    onPhotoResult(data, params) {
      let obj = this.showImg[params.split('-')[0]]
      let formImg = this.prams[params.split('-')[0]]
      let arr = clone(obj)
      let img = `data:image/png;base64,${data.image}`
      arr[params.split('-')[1]] = img;
      this.postAjax(this.$api.upDatePhoto, { image: img })
        .then(res => {
          formImg[params.split('-')[1]] = res.data.save_url;
          arr[params.split('-')[1]] = img;
          this.showImg[params.split('-')[0]] = arr;
        })
    },
    startPhotoForResult({ type, params }) {
      webBridge.startPhotoForResult(type, params)
    },
    timeInit(name, value) {
      if (value > 0) {
        if (name === 'StartTimeDate') {
          this.StartTimeDate.date = [formatDate(value, "yyyy/MM/dd"), '00:00']
          this.enterTime = formatDate(value, "yyyy年MM月dd日HH:mm")
        } else {
          this.EndTimeDate.date = [formatDate(value, "yyyy/MM/dd"), '00:00']
          this.outTime = formatDate(value, "yyyy年MM月dd日HH:mm")
        }
      } else {
        if (name === 'StartTimeDate') {
          this.StartTimeDate.date = [formatDate(new Date(), "yyyy/MM/dd"), '00:00']
          this.enterTime = "请选择"
        } else {
          this.EndTimeDate.date = [formatDate(new Date(), "yyyy/MM/dd"), '00:00']
          this.outTime = "请选择"
        }
      }
    },
    showStartPicker() {
      this.$refs.startPicker.show()
    },
    showEndPicker() {
      this.$refs.endPicker.show()
    },
    dateChangeStart(e) {
      let date = new Date(e.date)
      this.prams.entry_site_time = date.getTime() / 1000 + ''
      this.enterTime = formatDate(date, "yyyy年MM月dd日HH:mm")
    },
    dateChangeEnd(e) {
      let date = new Date(e.date)
      this.prams.out_site_time = date.getTime() / 1000 + ''
      this.outTime = formatDate(date, "yyyy年MM月dd日HH:mm")
    },
    showRepairStation() {
      this.showPicker = true
    },
    confirm() {
      this.repairStaion = this.$refs.cityPick.getNameValues()
      this.prams.site.city_name = this.pickValue[0]
      this.prams.site.name = this.pickValue[1]
      this.prams.site_city = this.pickValue[0]
      this.prams.site_name = this.pickValue[1]
      this.showPicker = false
    },
    // 获取维修站信息
    getSites() {
      this.postAjax(this.$api.sites, {}).then(res => {
        this.pickData = res.data
      })
    },
    submit(type) {
      this.prams.result = type
      delete this.prams.working_info
      delete this.prams.additional_cost
      delete this.prams.parts_info
      this.prams.entry_site_images = this.prams.entry_site_images[0] === null ? [] : this.prams.entry_site_images
      this.prams.leave_site_images = this.prams.leave_site_images[0] === null ? [] : this.prams.leave_site_images
      this.prams.settlement_images = this.prams.settlement_images[0] === null ? [] : this.prams.settlement_images
      this.verify().then(res => {
        if (this.prams.out_site_time <= this.prams.entry_site_time) {
          this.$vux.toast.show('出维修厂时间需大于进维修厂时间')
          return
        }
        this.postAjax(this.$api.saveMaintain, this.prams).then(res => {
          this.$vux.toast.show(res.msg)
          this.$router.push('/')
        })
      })
    },
    verify() {
      let hash = {
        car_mtc_code: '维修工单',
        site_city: '维修站',
        entry_site_time: '进维修厂时间',
        out_site_time: '出维修厂时间',
      }
      return new Promise((resolve, reject) => {
        for (let k in hash) {
          if (!this.prams[k].length && hash[k]) {
            this.$vux.toast.show(hash[k] + '不能为空')
            reject('fail')
            return false
          }
        }
        resolve()
      })
    },
    postAjax(url, data) {
      this.$vux.loading.show()
      return new Promise((resolve, reject) => {
        this.$axios.post(url, data).then(res => {
          this.$vux.loading.hide()
          if (res.code === 0) {
            resolve(res)
          } else {
            this.$vux.toast.show(res.msg)
            reject(res)
          }
        }).catch(err => {
          this.$vux.loading.hide()
          reject(err)
        })
      })

    },
    savePrams() {
      this.setRepairInfo({ name: "detailPrams", data: this.prams })
      this.setRepairInfo({ name: "detailPramsImg", data: this.showImg })
    },
    link(url) {
      this.savePrams()
      this.$router.push(url)
    },
    goToMap(item) {
      this.$router.push({ name: 'mapPage', params: { data: item } })
    },
    callTel(tel) {
      location.href = tel
    }
  }
}
</script>

<style scoped lang="scss">
.m-cont {
  min-height: 100vh;
}
.repairPhotos {
  background-color: #fff;
  padding: 24px;
  font-size: 28px;
  p {
    padding: 0 10px 22px;
    line-height: 40px;
    font-size: 28px;
  }
  .pic-wrap {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .pic-content {
      text-align: center;
      &:last-child {
        margin-right: 0px;
      }
      .pic-border {
        height: 28vw;
        width: 28vw;
        border-radius: 16px;
        .itemImg {
          width: 100%;
          height: 100%;
          position: relative;
          .delPic {
            position: absolute;
            right: -15px;
            top: -15px;
            width: 32px;
            height: 32px;
            z-index: 99;
          }
          > img {
            border-radius: 10px;
          }
        }
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

.form {
  padding-bottom: 98px;
}
.footer-wrap {
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  z-index: 100;
  .btn-footer {
    text-align: center;
    flex: 1;
    color: #fff;
    height: 98px;
    line-height: 98px;
    z-index: 999;
    font-size: 30px;
  }
  .save {
    background: linear-gradient(
      90deg,
      rgba(254, 197, 35, 1) 0%,
      rgba(254, 165, 36, 1) 100%
    );
  }
  .solve {
    background: linear-gradient(
      90deg,
      rgba(32, 222, 148, 1) 0%,
      rgba(13, 184, 156, 1) 100%
    );
  }
}
.m-picker {
  text-align: center;
}

.vux-popup-dialog {
  background: #fff;
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
.cell-wrap {
  color: #999;
  display: flex;
  align-items: center;
  .img-ico {
    display: inline-block;
    width: 36px;
    height: 36px;
    margin-left: 8px;
  }
}
</style>
